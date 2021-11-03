class mPSS {
  // Static members
  // typeIDs
  static typeIdStart = 0;
  static typeIdOriginal = 0;
  static typeIdRotate90 = 1;
  static typeIdRotate180 = 2;
  static typeIdRotate270 = 3;
  static typeIdMirror = 4;
  static typeIdMirrorRotate90 = 5;
  static typeIdMirrorRotate180 = 6;
  static typeIdMirrorRotate270 = 7;
  static typeIdEnd = 7;

  // Constructor
  constructor(sideLength = 112) {
    this.sideLength = sideLength;
  }

  getSquares(typeIndex = mPSS.typeIdOriginal) {
    const baseSideLength = 112;

    // minimal data (in number of squares)
    const baseData = [
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
    ];

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

    // Clamp the typeID argument
    const index = Math.max(mPSS.typeIdStart, Math.min(mPSS.typeIdEnd, typeIndex));
    console.log(index);

    // Transform(mirror and/or rotate)
    const transformedData = baseData.map((e) => {
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

    // Resize as specified length
    const ratio = this.sideLength / baseSideLength;
    const resizedData = transformedData.map((e) => {
      return {
        x: e.x * ratio,
        y: e.y * ratio,
        size: e.size * ratio,
        originalSize: e.size,
      };
    });

    // Add center x, y properties
    const finalData = resizedData.map((e) => {
      return {
        x: e.x,
        y: e.y,
        size: e.size,
        originalSize: e.originalSize,
        centerX: e.x + e.size / 2,
        centerY: e.y + e.size / 2,
      };
    });

    return finalData;
  }
}
