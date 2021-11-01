
const size = 720;
function setup() {
  createCanvas(size, size);
  strokeWeight(2);
}

function draw() {
  background(220);

  const mpss = new mPSS(size);
  const squares = mpss.getSquares();
  squares.forEach((sq) => {
    square(sq.x, sq.y, sq.size);
  });
}
