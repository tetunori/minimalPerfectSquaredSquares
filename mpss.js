class mPSS {
  constructor(sideLength = 112) {
    this.sideLength = sideLength;
    this.dataNumSquares;
    this.dataSideLength;
  }

  getSquares() {
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

    const index = 0;
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

    const ratio = this.sideLength / baseSideLength;
    const resizedData = transformedData.map((e) => {
      return {
        x: e.x * ratio,
        y: e.y * ratio,
        size: e.size * ratio,
      };
    });

    return resizedData;
  }
}
