
function setup() {
  createCanvas(720, 720);
}

function draw() {
  background(220);
  translate(60, 60);

  // Create mpss instance
  const sqSize = 600;
  const mpss = new mPSS(sqSize);

  // Get squares Array
  const squares = mpss.getSquares();

  // Draw each squares
  squares.forEach((sq) => {
    square(sq.x, sq.y, sq.size);
  });
}
