const sqSize = 250;
const marginSize = 50;
const canvasSizeX = 4 * sqSize + 5 * marginSize;
const canvasSizeY = 2 * sqSize + 3 * marginSize;

tfTypeIds = [
  {id:mPSS.tfTypeIdOriginal, desc:'mPSS.tfTypeIdOriginal'},
  {id:mPSS.tfTypeIdRotate90, desc:'mPSS.tfTypeIdRotate90'},
  {id:mPSS.tfTypeIdRotate180, desc:'mPSS.tfTypeIdRotate180'},
  {id:mPSS.tfTypeIdRotate270, desc:'mPSS.tfTypeIdRotate270'},
  {id:mPSS.tfTypeIdMirror, desc:'mPSS.tfTypeIdMirror'},
  {id:mPSS.tfTypeIdMirrorRotate90, desc:'mPSS.tfTypeIdMirrorRotate90'},
  {id:mPSS.tfTypeIdMirrorRotate180, desc:'mPSS.tfTypeIdMirrorRotate180'},
  {id:mPSS.tfTypeIdMirrorRotate270, desc:'mPSS.tfTypeIdMirrorRotate270'},
]

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

  for(let i = 0; i < tfTypeIds.length; i++){
    const squares = mpss.getSquares(tfTypeIds[i].id);
    const offsetX = marginSize + (sqSize + marginSize) * (i%4);
    const offsetY = marginSize + (sqSize + marginSize) * (floor(i/4));

    squares.forEach((sq) => {
      square(offsetX + sq.x, offsetY + sq.y, sq.size);
    });
    text(tfTypeIds[i].desc, offsetX + sqSize/2, offsetY - 15);
  }  
  
}
