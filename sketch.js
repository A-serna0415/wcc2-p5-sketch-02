/* 
Sketch01: NoisyClock
Andrés Serna
20 October 2025

Instructions: depending on how long the sketch has been running in your machine,
the noise in each circle will appear more or less intense. 
- Press 'F12' to keep a more accurate track of the time in console.
- Press 'SPACE' to reset time.

Blurb: The central circle reflects the passing seconds—becoming increasingly 
erratic as time advances. After one minute, the middle circle begins to slightly shift,
and with each hour, the outer circle follows.

Acknowledgements:
I used the Noisy Circle activity as a starting point.
I extended the code using this web resource about Perlin Noise: 
https://genekogan.com/code/p5js-perlin-noise/
and Daniel Shiffman's tutorials on The Coding Train about the same subject: 
https://www.youtube.com/watch?v=Qf4dIN99e2w&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD
*/

// Variables to reset time
let startMillis;

// Store elapsed time since the sketch start running
let elapsedSeconds;
let elapsedMinutes;
let elapsedHours;

//SECONDS CIRCLE
// Circle that changes with the passing seconds
let vertNum1 = 50; // Number of vertices in the circle
let radius1 = 50; // Size of the circle
let noiseAmplitude1 = 1; // Starting value for the noise amplitude

//MINUTES CIRCLE
// Circle that changes with the passing minutes
let vertNum2 = 200;
let radius2 = 130;
let noiseAmplitude2 = 1;

//HOURS CIRCLE
// Circle that changes with the passing hours
let vertNum3 = 500;
let radius3 = 200;
let noiseAmplitude3 = 1;

function setup() {
  startMillis = millis(); // Store time since the sketch start running

  createCanvas(windowWidth, windowHeight); // Canvas in fullscreen
}

function draw() {
  background(0, 10);

  let elapsed = millis() - startMillis; // Calculate how much time has passed since the sketch start running

  // This block of code converts the milliseconds store inside 'elapsed' to seconds, minutes and hours
  // So I can use them to control the noise amplitute in each circle
  elapsedSeconds = floor(elapsed / 1000) % 60; // I use 'floor' to remove any decimal left from the ecuasion
  elapsedMinutes = floor(elapsed / (1000 * 60)) % 60; // the module '% 60' keeps the value between 0 - 59, like a clock
  elapsedHours = floor(elapsed / (1000 * 60 * 60));

  console.log('seconds: ', elapsedSeconds, ',', 'minutes: ', elapsedMinutes, 'hours: ', elapsedHours);
  
  // CENTRAL CIRCLE: SECONDS.
  // Angle between each point that makes up our circle
  let angleStep1 = 360.0/vertNum1;

  push();
  
  translate(width/2,height/2);
  
  stroke(255);
  strokeWeight(1)
  noFill();
  beginShape();
  for (let vn = 0; vn <= vertNum1; vn++) {
    
    //get points along a circle
    let radian = radians(angleStep1*vn); // Working with radians
    let vX = cos(radian) * radius1;
    let vY = sin(radian) * radius1;

    let noiseStep = frameCount*0.05+vn;
    if(vn == vertNum1){
       noiseStep=frameCount*0.01; // Don't want to add vn at 360 degrees
    }

    let noiseValue = noise(noiseStep);

    vX += (noiseValue*vX)*noiseAmplitude1;
    vY += (noiseValue*vY)*noiseAmplitude1;

    noiseAmplitude1 = sin(elapsedSeconds * 0.03);

    //vertex in shape
    circle(vX,vY,3);
    vertex(vX,vY);
  }
  endShape();
  
  pop();
  
  //MIDDLE CIRCLE: MINUTES.
  push();
  
  let angleStep2 = 360.0/vertNum2;
  translate(width/2,height/2);
  
  stroke(255);
  noFill();
  beginShape();
  for (let vn = 0; vn <= vertNum2; vn++) {
    let radian = radians(angleStep1*vn);
    let vX = cos(radian) * radius2;
    let vY = sin(radian) * radius2;

    let noiseStep = frameCount*0.05+vn;
    if(vn == vertNum1){
       noiseStep=frameCount*0.01;
    }

    let noiseValue = noise(noiseStep);

    vX += (noiseValue*vX)*noiseAmplitude2;
    vY += (noiseValue*vY)*noiseAmplitude2;

    noiseAmplitude2 = sin(elapsedMinutes * 0.05);

    circle(vX,vY,3);
    vertex(vX,vY);
  }
  endShape();
  
  pop();
  
  //OUTER CIRCLE: HOURS.
  push();
  
  let angleStep3 = 360.0/vertNum3;
  translate(width/2,height/2);
  
  stroke(255);
  noFill();
  beginShape();
  for (let vn = 0; vn <= vertNum3; vn++) {
    let radian = radians(angleStep1*vn);
    let vX = cos(radian) * radius3;
    let vY = sin(radian) * radius3;

    let noiseStep = frameCount*0.05+vn;
    if(vn == vertNum3){
       noiseStep=frameCount*0.01;
    }

    let noiseValue = noise(noiseStep);

    vX += (noiseValue*vX)*noiseAmplitude3;
    vY += (noiseValue*vY)*noiseAmplitude3;

    noiseAmplitude3 = sin(elapsedHours * 0.1);

    circle(vX,vY,3);
    vertex(vX,vY);
  }
  endShape();
  
  pop();
}

// Function to reset time pressing the 'SPACE' key
function keyPressed() {
  if (key === ' ') {
    startMillis = millis();
    console.log("Time reset!");
  }
}

// Function to run the sketch in fullscreen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
