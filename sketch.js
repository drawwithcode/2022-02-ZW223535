let starColor = ["#FDE9A5", "#FFFFFF", "#FFF4F4", "#FFFFF4"];
let skyColor = ["#EF9B81", "#7EB5D6", "#919AE1", "#856DD0"];
let skyGradient = ["#BC96D3", "#98D4CD", "#FFD5A7"];
let bg = "#EF9B81";
let gr = "#BC96D3";
let myStars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  //Generazione di Stelle
  for (let i = 0; i < 150; i++) {
    const newStar = new Star(
      random(width),
      random(height),
      random(0.3, 3),
      random(TWO_PI)
    );
    myStars.push(newStar);
  }
}

function draw() {
  background(bg);
  //Gradiente sfondo
  push();
  translate(width / 2, height / 2);
  noStroke();
  rotate(45);
  fill(gr);
  drawingContext.filter = "blur(300px)";
  rect(width / 3, height / 3, 1000, 1000);
  pop();

  //Generazione di stelle
  push();
  for (let i = 0; i < myStars.length; i++) {
    myStars[i].display();
  }
  pop();

  //Nuvole
  push();
  drawClouds();
  pop();

  //Rettangolo del testo
  push();
  noFill();
  stroke("white");
  strokeWeight(2);
  rect(width / 2, height / 2 - 5, 230, 70);
  pop();

  //Scritta
  push();
  let myText = "Click to chage the SKY.";
  textFont("Roboto Mono");
  textStyle(ITALIC);
  fill("White");
  textSize(15);
  textAlign(CENTER);
  text(myText, width / 2, height / 2);
  pop();
}

//Click per cambiare sfondo e gradiente
function mouseClicked() {
  push();
  bg = random(skyColor);
  gr = random(skyGradient);
  pop();
}

// Classe - STELLE
class Star {
  constructor(starX, starY, starR, starM) {
    this.x = starX;
    this.y = starY;
    this.r = starR;
    this.m = starM;
  }

  display() {
    this.m += 0.03; //velocità di scala e di cambio colore
    let scale = this.r + sin(this.m) * 3;
    noStroke();
    fill(random(starColor));
    ellipse(this.x, this.y, scale, scale);
  }
}

//NUVOLE
const inc = 0.01;
let start = 0;

function drawClouds() {
  var off = start;

  yPoints = []; //variabili punti Y
  for (let i = 0; i < width; i++) {
    yPoints.push(noise(off) * height * 0.6);
    off += inc;
  }

  drawingContext.filter = "blur(15px)";
  push();
  stroke("white");
  fill(255, 255, 255, 60);
  beginShape();
  vertex(0, height);
  for (let i = 0; i < width; i++) {
    let x = i * (width / 350);
    let y = yPoints[i] + height / 3.5;
    vertex(x, y);
  }
  vertex(width, height);
  endShape();
  pop();

  push();
  stroke("white");
  fill(255, 255, 255, 70);
  beginShape();
  vertex(0, height);
  for (let i = 0; i < width; i++) {
    let x = i * (width / 200);
    let y = yPoints[i] + height / 3;
    vertex(x, y);
  }
  vertex(width, height);
  endShape();
  pop();

  push();
  stroke("white");
  fill(255, 255, 255, 50);
  beginShape();
  vertex(0, height);
  for (let i = 0; i < width; i++) {
    let x = i * (width / 300);
    let y = yPoints[i] + height / 2;
    vertex(x, y);
  }
  vertex(width, height);
  endShape();
  pop();

  start += inc; //per il movimento
}

//RESIZE
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
