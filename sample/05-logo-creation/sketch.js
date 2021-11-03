const sqSize = 600;
const canvasSize = 720;

function setup() {
  createCanvas(canvasSize, canvasSize);
  strokeWeight(2);
  textSize(24);
  textFont('Noto Sans JP');
  textAlign(CENTER, CENTER);
  frameRate(0.5);
}

function draw() {
  background('#f0f0f0');

  // --- p5.pattern settings
  const ColsURLs = [
    'https://coolors.co/40037d-0041cd-cac600-009b17-e1036b-b96301',
    'https://coolors.co/eb300f-fe7688-fff566-212121-306e42-0d3b66',
  ];

  const colsURL = ColsURLs[1];
  const COLS = createCols(colsURL);
  let PALETTE = shuffle(COLS, true);

  // Decide top layer color, 1st.
  const bgcolor = PALETTE[3];
  background(bgcolor);

  // Save other 3 colors in PALATTE.
  PALETTE = PALETTE.slice(0, 3);
  patternColors(shuffle(PALETTE));
  pattern(randPattern(width * 0.08));

  // Centering
  const tlValue = (canvasSize - sqSize) / 2;
  translate(tlValue, tlValue);

  const mpss = new mPSS(sqSize);
  const squares = mpss.getSquares();

  squares.forEach((sq) => {
    pattern(randPattern(width * 0.08));
    squarePattern(sq.x, sq.y, sq.size);
  });

  // stroke(255,255,255);
  stroke(bgcolor);
  strokeWeight(3);
  squares.forEach((sq) => {
    square(sq.x, sq.y, sq.size);
  });
}

// Take some Colors from coolors URL
function createCols(url) {
  let slaIndex = url.lastIndexOf('/');
  let colStr = url.slice(slaIndex + 1);
  let colArr = colStr.split('-');
  for (let i = 0; i < colArr.length; i++) colArr[i] = '#' + colArr[i];
  return colArr;
}

// p5.pattern randam pattern function
function randPattern(t) {
  const ptArr = [
    PTN.noise(0.5),
    PTN.noiseGrad(0.4),
    PTN.stripe(t / int(random(6, 12))),
    PTN.stripeCircle(t / int(random(6, 12))),
    PTN.stripePolygon(int(random(3, 7)), int(random(6, 12))),
    PTN.stripeRadial(TAU / int(random(6, 30))),
    PTN.wave(t / int(random(1, 3)), t / int(random(10, 20)), t / 5, t / 10),
    PTN.dot(t / 10, (t / 10) * random(0.2, 1)),
    PTN.checked(t / int(random(5, 20)), t / int(random(5, 20))),
    PTN.cross(t / int(random(10, 20)), t / int(random(20, 40))),
    PTN.triangle(t / int(random(5, 20)), t / int(random(5, 20))),
  ];
  return random(ptArr);
}

function keyTyped() {
  if (key === 's') {
    saveImage();
  } 
}

// Save generated image
const saveImage = () => {
  const name = getYYYYMMDD_hhmmss(true) + '.png';
  saveCanvas(name, 'png');
};

// get Timestamp string
const getYYYYMMDD_hhmmss = (isNeedUS) => {
  const now = new Date();
  let retVal = '';

  // YYMMDD
  retVal += now.getFullYear();
  retVal += padZero2Digit(now.getMonth() + 1);
  retVal += padZero2Digit(now.getDate());

  if (isNeedUS) {
    retVal += '_';
  }

  // hhmmss
  retVal += padZero2Digit(now.getHours());
  retVal += padZero2Digit(now.getMinutes());
  retVal += padZero2Digit(now.getSeconds());

  return retVal;
};

// padding function
const padZero2Digit = (num) => {
  return (num < 10 ? '0' : '') + num;
};
