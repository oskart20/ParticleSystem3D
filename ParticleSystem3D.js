let eps;
let gam;

let particles = [];
const bounds = 600;  // default value: 500

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(24);
  background(55);
  
  eps = pow(10, 18);
  gam = pow(10, -18);
    
  // creates {num} particles, num should be appropriate to value of bounds
  let numP = 50;
  let numE = 60;
  let numN = 10;
  
  for (let i = 0; i < numP; i += 1) {
    particles.push(new Proton(random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), 0, 0, 0));
  }
  for (let j = 0; j < numE; j += 1) {
    particles.push(new Electron(random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), 0, 0, 0));
  }
  for (let k = 0; k < numN; k += 1) {
    particles.push(new Neutron(random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), random(-2, 2), random(-2, 2), random(-2, 2)));
  }
}

function draw() {
  background(200);
  orbitControl();
  
  ambientLight(255);
  
  noFill();
  stroke(0);
  translate(0, 0, 0);
  
  push();
  box(bounds, bounds, bounds);
  pop();
  
  for (let part of particles) {
    part.accelerate();
    part.move();
    part.detection();
    part.display();
    let sum = createVector(0, 0, 0);
    for (let other of particles) {
      if (part != other) {
        sum.add(force(part, other));
      }
    }
    part.setAcceleration(sum);
  }
}

function force(a, b) {
  let d = a.P.dist(b.P);
  if (d == 0) {
    d = 0.0001;
  }
  let F = createVector(b.P.x - a.P.x, b.P.y - a.P.y, b.P.z - a.P.z);
  let elF = -(eps * a.q * b.q)/sq(d);  // electro-magnetic force
  let gF = (gam * a.m * b.m)/sq(d);    // gravitational force
  let sF = 0;                          // strong force
  if(a.q != -1 && b.q != -1 && d < 15){
    sF = (137*eps)/sq(d);
  }
  F.setMag(elF + gF + sF);
  return F;
}
