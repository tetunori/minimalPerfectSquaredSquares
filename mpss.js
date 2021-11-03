class mPSS {
  // Static members
  // transform type Ids
  static tfTypeIdStart = 0;
  static tfTypeIdOriginal = 0;
  static tfTypeIdRotate90 = 1;
  static tfTypeIdRotate180 = 2;
  static tfTypeIdRotate270 = 3;
  static tfTypeIdMirror = 4;
  static tfTypeIdMirrorRotate90 = 5;
  static tfTypeIdMirrorRotate180 = 6;
  static tfTypeIdMirrorRotate270 = 7;
  static tfTypeIdEnd = 7;

  // Constructor
  constructor(sideLength = undefined) {
    this.sideLength = sideLength;
  }

  // API: get squares consisting of minimal(number of squares) squared square
  getSquares(transformTypeIndex = mPSS.tfTypeIdOriginal) {
    const sqData = this.minSqData;
    return this.getSquaresData(sqData, transformTypeIndex);
  }

  // API: get squares consisting of minimal(length of square) squared square
  getSmallestSizeSquares(squareTypeIndex = 0, transformTypeIndex = mPSS.tfTypeIdOriginal) {
    // Clamp index 0, 1 or 2
    const sqTypeId = Math.max(0, Math.min(2, squareTypeIndex));
    const sqData = this.minLenSqDataArray[sqTypeId];
    return this.getSquaresData(sqData, transformTypeIndex);
  }

  // Get Squares Data
  getSquaresData(baseData, transformTypeIndex) {
    // Clamp the tfTypeId argument
    const index = Math.max(mPSS.tfTypeIdStart, Math.min(mPSS.tfTypeIdEnd, transformTypeIndex));

    // Transform(mirror and/or rotate)
    const transformedData = {
      baseSideLength: baseData.baseSideLength,
      data: this.transformData(baseData, index),
    };

    // Resize as specified length
    const resizedData = {
      baseSideLength: transformedData.baseSideLength,
      data: this.resizeData(
        transformedData,
        this.sideLength ? this.sideLength : transformedData.baseSideLength
      ),
    };

    // Add center x, y properties
    const finalData = this.addCenterXY(resizedData);
    return finalData;
  }

  // Transform Data
  transformData(sqData, transformTypeIndex) {
    // Transform matrices
    // [
    //   [x0, y0], // rotation matrix
    //   [x1, y1], // rotation matrix
    //   [x2, y2], // translate on size
    //   [x3, y3], // translate on baseSideLength
    // ]
    const matrices = [
      [
        [1, 0],
        [0, 1],
        [0, 0],
        [0, 0],
      ], // Original
      [
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 0],
      ], // PI/2 rotation
      [
        [-1, 0],
        [0, -1],
        [-1, -1],
        [1, 1],
      ], // PI rotation
      [
        [0, 1],
        [-1, 0],
        [0, -1],
        [0, 1],
      ], // 3*PI/2 rotation
      [
        [-1, 0],
        [0, 1],
        [-1, 0],
        [1, 0],
      ], // X-Reflection
      [
        [1, 0],
        [0, -1],
        [0, -1],
        [0, 1],
      ], // X-Reflection & PI rotation
      [
        [0, 1],
        [1, 0],
        [0, 0],
        [0, 0],
      ], // X-Reflection & PI/2 rotation
      [
        [0, -1],
        [-1, 0],
        [-1, -1],
        [1, 1],
      ], // X-Reflection & 3*PI/2 rotation
    ];

    const index = transformTypeIndex;
    const baseSideLength = sqData.baseSideLength;
    const data = sqData.data;

    return data.map((e) => {
      return {
        x:
          e.x * matrices[index][0][0] +
          e.y * matrices[index][0][1] +
          e.size * matrices[index][2][0] +
          baseSideLength * matrices[index][3][0],
        y:
          e.x * matrices[index][1][0] +
          e.y * matrices[index][1][1] +
          e.size * matrices[index][2][1] +
          baseSideLength * matrices[index][3][1],
        size: e.size,
      };
    });
  }

  // Resize Data
  resizeData(sqData, targetSideLength) {
    const baseSideLength = sqData.baseSideLength;
    const ratio = targetSideLength / baseSideLength;

    return sqData.data.map((e) => {
      return {
        x: e.x * ratio,
        y: e.y * ratio,
        size: e.size * ratio,
        originalSize: e.size,
      };
    });
  }

  // Add center (x, y) position to Data
  addCenterXY(sqData) {
    return sqData.data.map((e) => {
      return {
        x: e.x,
        y: e.y,
        size: e.size,
        originalSize: e.originalSize,
        centerX: e.x + e.size / 2,
        centerY: e.y + e.size / 2,
      };
    });
  }

  // Base Data ---------------
  // Minimal squares data (in number of squares)
  // Found in 1978, by A. J. W. Duijvestijn
  minSqData = {
    baseSideLength: 112,
    data: [
      { x: 0, y: 0, size: 50 },
      { x: 50, y: 0, size: 35 },
      { x: 85, y: 0, size: 27 },
      { x: 85, y: 27, size: 8 },
      { x: 93, y: 27, size: 19 },
      { x: 50, y: 35, size: 15 },
      { x: 65, y: 35, size: 17 },
      { x: 82, y: 35, size: 11 },
      { x: 82, y: 46, size: 6 },
      { x: 88, y: 46, size: 24 },
      { x: 0, y: 50, size: 29 },
      { x: 29, y: 50, size: 25 },
      { x: 54, y: 50, size: 9 },
      { x: 63, y: 50, size: 2 },
      { x: 63, y: 52, size: 7 },
      { x: 70, y: 52, size: 18 },
      { x: 54, y: 59, size: 16 },
      { x: 70, y: 70, size: 42 },
      { x: 29, y: 75, size: 4 },
      { x: 33, y: 75, size: 37 },
      { x: 0, y: 79, size: 33 },
    ],
  };

  // Minimal squares data (in length of square)
  minLenSqDataArray = [
    {
      // Found in 1978, by A. J. W. Duijvestijn
      baseSideLength: 110,
      data: [
        { x: 0, y: 0, size: 60 },
        { x: 60, y: 0, size: 50 },
        { x: 60, y: 50, size: 23 },
        { x: 83, y: 50, size: 27 },
        { x: 0, y: 60, size: 24 },
        { x: 24, y: 60, size: 22 },
        { x: 46, y: 60, size: 14 },
        { x: 60, y: 73, size: 7 },
        { x: 67, y: 73, size: 16 },
        { x: 46, y: 74, size: 8 },
        { x: 54, y: 74, size: 6 },
        { x: 83, y: 77, size: 12 },
        { x: 95, y: 77, size: 15 },
        { x: 54, y: 80, size: 13 },
        { x: 24, y: 82, size: 2 },
        { x: 26, y: 82, size: 28 },
        { x: 0, y: 84, size: 26 },
        { x: 67, y: 89, size: 4 },
        { x: 71, y: 89, size: 21 },
        { x: 92, y: 89, size: 3 },
        { x: 92, y: 92, size: 18 },
        { x: 54, y: 93, size: 17 },
      ],
    },
    {
      // Found in 1978, by T. H. Willcocks
      baseSideLength: 110,
      data: [
        { x: 0, y: 0, size: 60 },
        { x: 60, y: 0, size: 50 },
        { x: 60, y: 50, size: 27 },
        { x: 87, y: 50, size: 23 },
        { x: 0, y: 60, size: 24 },
        { x: 24, y: 60, size: 22 },
        { x: 46, y: 60, size: 14 },
        { x: 87, y: 73, size: 4 },
        { x: 91, y: 73, size: 19 },
        { x: 46, y: 74, size: 8 },
        { x: 54, y: 74, size: 6 },
        { x: 60, y: 77, size: 3 },
        { x: 63, y: 77, size: 12 },
        { x: 75, y: 77, size: 16 },
        { x: 54, y: 80, size: 9 },
        { x: 24, y: 82, size: 2 },
        { x: 26, y: 82, size: 28 },
        { x: 0, y: 84, size: 26 },
        { x: 54, y: 89, size: 21 },
        { x: 91, y: 92, size: 1 },
        { x: 92, y: 92, size: 18 },
        { x: 75, y: 93, size: 17 },
      ],
    },
    {
      // Found in 1990, by A. J. W. Duijvestijn
      baseSideLength: 110,
      data: [
        { x: 0, y: 0, size: 44 },
        { x: 44, y: 0, size: 29 },
        { x: 73, y: 0, size: 37 },
        { x: 44, y: 29, size: 21 },
        { x: 65, y: 29, size: 8 },
        { x: 65, y: 37, size: 13 },
        { x: 78, y: 37, size: 32 },
        { x: 0, y: 44, size: 28 },
        { x: 28, y: 44, size: 16 },
        { x: 44, y: 50, size: 15 },
        { x: 59, y: 50, size: 19 },
        { x: 28, y: 60, size: 12 },
        { x: 40, y: 60, size: 4 },
        { x: 40, y: 64, size: 3 },
        { x: 43, y: 64, size: 1 },
        { x: 43, y: 65, size: 2 },
        { x: 45, y: 65, size: 14 },
        { x: 40, y: 67, size: 5 },
        { x: 59, y: 69, size: 10 },
        { x: 69, y: 69, size: 41 },
        { x: 0, y: 72, size: 38 },
        { x: 38, y: 72, size: 7 },
        { x: 38, y: 79, size: 31 },
      ],
    },
  ];
}
