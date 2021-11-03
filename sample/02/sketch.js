const sqSize = 600;
const canvasSize = 720;

function setup() {
  createCanvas(canvasSize, canvasSize);
  strokeWeight(2);
  textSize(24);
  textFont('Noto Sans JP');
  textAlign(CENTER, CENTER);
}

function draw() {
  background('#f0f0f0');

  // Centering
  const tlValue = (canvasSize - sqSize) / 2;
  translate(tlValue, tlValue);

  const mpss = new mPSS(sqSize);
  const squares = mpss.getSquares();
  // const squares = mpss.getSmallestSizeSquares(0);

  squares.forEach((sq) => {
    square(sq.x, sq.y, sq.size);
    drawLengthText(sq.originalSize, sq.centerX, sq.centerY);
  });
}

// Drwa square length text in the center of square
const drawLengthText = (length, x, y) => {
  let offsetX = 0;
  let offsetY = 0;
  if (length === 2) {
    offsetX = 18;
    offsetY = -10;
  } else if (length === 4) {
    offsetX = 2;
    offsetY = -25;
  }
  text(length, x + offsetX, y + offsetY);
};
