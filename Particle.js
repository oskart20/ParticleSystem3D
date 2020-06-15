class Particle {
  
  constructor(x, y, z, r, mass, c, vx, vy, vz) {
    this.P = createVector(constrain(x, -(bounds/2) + r, (bounds/2) - r), constrain(y, -(bounds/2) + r, (bounds/2) - r), constrain(z, -(bounds/2) + r, (bounds/2) - r));
    this.r = r;
    this.m = mass;
    this.c = c;
    this.V = createVector(vx, vy, vz);
    this.A = createVector(0, 0, 0);
  }
  
  display() {
    fill(color(this.c));
    noStroke();
    push();
    translate(this.P.x, this.P.y, this.P.z);
    sphere(this.r);
    pop();
  }
  
  move() {
    this.P.set(constrain(this.P.x, -(bounds/2) + this.r, (bounds/2) - this.r), constrain(this.P.y, -(bounds/2) + this.r, (bounds/2) - this.r), constrain(this.P.z, -(bounds/2) + this.r, (bounds/2) - this.r));
    this.P.add(this.V);
  }
  
  accelerate() {
    this.V.add(this.A);
    this.V.limit((bounds/50)+2);
  }
  
  detection() {
    if (this.P.x > (bounds/2) - this.r || this.P.x < (-(bounds/2) + this.r)) {
      this.V.x *= -1;
      this.P.set(constrain(this.P.x, -(bounds/2) + this.r, (bounds/2) - this.r), constrain(this.P.y, -(bounds/2) + this.r, (bounds/2) - this.r), constrain(this.P.z, -(bounds/2) + this.r, (bounds/2) - this.r));
    }
    if (this.P.y > (bounds/2) - this.r || this.P.y < (-(bounds/2) + this.r)) {
      this.V.y *= -1;
      this.P.set(constrain(this.P.x, -(bounds/2) + this.r, (bounds/2) - this.r), constrain(this.P.y, -(bounds/2) + this.r, (bounds/2) - this.r), constrain(this.P.z, -(bounds/2) + this.r, (bounds/2) - this.r));
    }
    if (this.P.z > (bounds/2) - this.r || this.P.z < (-(bounds/2) + this.r)) {
      this.V.z *= -1;
      this.P.set(constrain(this.P.x, -(bounds/2) + this.r, (bounds/2) - this.r), constrain(this.P.y, -(bounds/2) + this.r, (bounds/2) - this.r), constrain(this.P.z, -(bounds/2) + this.r, (bounds/2) - this.r));
    }
  }
  
  setAcceleration(F) {
    this.A.set(F.div(this.m));
  }
}

class Electron extends Particle {
  constructor(x, y, z, vx, vy, vz) {
    super(x, y, z, 2, 0.0005, 'rgb(0, 0, 255)', vx, vy, vz);
    this.q = -1;
  }
}
  
class Neutron extends Particle {
  constructor(x, y, z, vx, vy, vz) {
    super(x, y, z, 5, 1.0072, 'rgb(0, 255, 0)', vx, vy, vz);
    this.q = 0;
  }
}

class Proton extends Particle {
  constructor(x, y, z, vx, vy, vz) {
    super(x, y, z, 5, 1.0087, 'rgb(255, 0, 0)', vx, vy, vz);
    this.q = 1;
  }
}
