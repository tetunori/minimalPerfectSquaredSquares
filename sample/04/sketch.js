const sqSize = 250;
const marginSize = 50;
const canvasSizeX = 3 * sqSize + 4 * marginSize;
const canvasSizeY = 1 * sqSize + 2 * marginSize;

function setup() {
  createCanvas(canvasSizeX, canvasSizeY);
  strokeWeight(2);
  textSize(18);
  textFont('Noto Sans JP');
  textAlign(CENTER, CENTER);
}

function draw() {
  background('#f0f0f0');

  const mpss = new mPSS(sqSize);

  for (let i = 0; i < 3; i++) {
    const squares = mpss.getSmallestSizeSquares(i);
    const offsetX = marginSize + (sqSize + marginSize) * i;
    const offsetY = marginSize;

    squares.forEach((sq) => {
      square(offsetX + sq.x, offsetY + sq.y, sq.size);
    });
    text('index '+i, offsetX + sqSize/2, offsetY-15);
  }
}
