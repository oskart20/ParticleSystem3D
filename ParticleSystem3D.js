var eps = 100;
var gam = 100;
let particles = [];
var bounds = 500;  // default value: 500

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60);
  background(55);
  
  //let p = new Proton(0, 20, 0, 0, 0);
  //let e = new Electron(0, 0, 240, 0, 0);
  //let n = new Neutron(0, -20, -240, 0, 0);
  //particles = [p, e, n];
  
  // creates {num} particles; if num mod 3 = 0, number of Protons, Electrons and Neutrons is equal
  let num = 60;  // num should be appropriate to value of bounds
  for (var i = 0; i < num; i += 3) {
    particles[i] = new Proton(random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), random(-2, 2), random(-2, 2), random(-2, 2));
    particles[i+1] = new Electron(random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), random(-2, 2), random(-2, 2), random(-2, 2));
    particles[i+2] = new Neutron(random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), random(-(bounds/2) + 15, (bounds/2) -15), random(-2, 2), random(-2, 2), random(-2, 2));
  }
}

function draw() {
  background(55);
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
    for (let other of particles){
      if (part != other) {
        part.setAcceleration(force(part, other));
      }
    }
  }
}

function force(a, b) {
  let d = a.P.dist(b.P);
  if (d == 0) {
    d = 0.01;
  }
  let F = createVector(b.P.x - a.P.x, b.P.y - a.P.y, b.P.z - a.P.z);
  F.setMag((eps * a.q * b.q)/sq(d) + (gam * a.m * b.m)/sq(d));
  return F;
}
