# Description 📐

**minimalPerfectSquaredSquares** is a dataset class consisting of some minimal [Perfect Squared Squares](https://en.wikipedia.org/wiki/Squaring_the_square#Perfect_squared_squares)(mPSS).  
You can draw mPSS without difficulty!  
<img src="https://tetunori.github.io/minimalPerfectSquaredSquares/images/logo.png" alt="logo" width="640px">  

Now, the latest version is `1.0.0`.  

# Usage
## Import Data
```html 
<script src="https://tetunori.github.io/minimalPerfectSquaredSquares/dist/v1.0.0/mpss.js"></script>
```
## Basic Usage
Just new `mPSS()` and you can get data via `getSquares()` method.
```javascript
// Create mpss instance
const mpss = new mPSS();
// const mpss = new mPSS(720); // can specify the size of square

// Get squares Array
const squares = mpss.getSquares();
```
Received array consists of the object as below.
```javascript
[
  { x: 0, y: 0, size: 50, etc... },
  { x: 50, y: 0, size: 35, etc... },
  { x: 85, y: 0, size: 27, etc... },
  ...
]
```
So we can draw like below with p5.js.
```javascript
// Draw each squares
squares.forEach((sq) => {
  square(sq.x, sq.y, sq.size);
});
```
Sample01
<img src="https://tetunori.github.io/jpCityPolygon/images/basic1.png" alt="basic1" width="360px">  


Each square has the following properties.
|  name  |  note  |
| ---- | ---- |
|  x  |  Number: x-coordinate of the square.  |
|  y  |  Number: y-coordinate of the square.  |
|  size  |  Number: side size of the square.  |
|  centerX  |  Number: x-coordinate of the center of the square.  |
|  centerY  |  Number: y-coordinate of the center of the square.  |
|  originalSize  |  Number: side size of the square before transformed. If you do not specify the size in the Constructor, this is the same as `size` property.  |

For using `centerX`, `centerY` and `originalSize`, See the sample 02 below.
<img src="https://tetunori.github.io/jpCityPolygon/images/basic1.png" alt="basic1" width="360px">  

Sample 02.🌟

## Advanced Usage
<details><summary>CLICK ME</summary>
<p>

### Transform (rotation and reflection)
We can specify rotation and mirror reflection to `getSquares()`.  
Simply, set the argument from the list below into the function.
```javascript
mPSS.tfTypeIdOriginal;
mPSS.tfTypeIdRotate90;
mPSS.tfTypeIdRotate180;
mPSS.tfTypeIdRotate270;
mPSS.tfTypeIdMirror;
mPSS.tfTypeIdMirrorRotate90;
mPSS.tfTypeIdMirrorRotate180;
mPSS.tfTypeIdMirrorRotate270;
```
Use like
```javascript
const squares = mpss.getSquares( mPSS.tfTypeIdMirrorRotate180 );
```
<img src="https://tetunori.github.io/jpCityPolygon/images/basic1.png" alt="basic1" width="360px">  

Sample 03 🌟

### Other 3 squares
Although we have seen the minimal(in the number of the squares) PSS, `mPSS` supplies another 3 minimal(in the length of the squares) PSSs.  
We can get the data via `getSmallestSizeSquares()` that has a similar usage to `getSquares()`.  
Please specify the square index 0, 1 or 2 in the 1st argument.  
```javascript
const squares = mpss.getSmallestSizeSquares( 1 );

// You can specify the transform direction
// const squares = mpss.getSmallestSizeSquares( 2, mPSS.tfTypeIdRotate90 );
```
<img src="https://tetunori.github.io/jpCityPolygon/images/basic1.png" alt="basic1" width="360px">  

Sample 04 🌟
</p>
</details>

# API Specification
<details><summary>CLICK ME</summary>
<p>

## Constructors
### constructor
```javascript
new mPSS([sideLength: Number])
```
Parameters:
|  name  |  note  |
| ---- | ---- |
|  [sideLength]   | Number: Size of the outline (biggest)square. Optional.  |

Returns:
mPSS instance.

## Methods
### getSquares
```javascript
getSquares([transformTypeIndex: Number])
```
Parameters:
|  name  |  note  |
| ---- | ---- |
|  [transformTypeIndex]   | Number: Specify `mPSS.tfTypeId*`. Default value is `mPSS.tfTypeIdOriginal` Optional. |

Returns:
Array of the square data. Each data has properties below.
|  name  |  note  |
| ---- | ---- |
|  x  |  Number: x-coordinate of the square.  |
|  y  |  Number: y-coordinate of the square.  |
|  size  |  Number: side size of the square.  |
|  centerX  |  Number: x-coordinate of the center of the square.  |
|  centerY  |  Number: y-coordinate of the center of the square.  |
|  originalSize  |  Number: side size of the square before transformed. If you do not specify the size in the Constructor, this is the same as `size` property.  |

### getSmallestSizeSquares
```javascript
getSmallestSizeSquares([squareTypeIndex: Number], [transformTypeIndex: Number]) {
```
Parameters:
|  name  |  note  |
| ---- | ---- |
|  [squareTypeIndex]   | Number: Specify square type index 0, 1 or 2. Default value is 0. Optional. |
|  [transformTypeIndex]   | Number: Specify `mPSS.tfTypeId*`. Default value is `mPSS.tfTypeIdOriginal` Optional. |

Returns:
Array of the square data. See `getSquares()` section.

</p>
</details>

# LICENSE
MIT License.

# Author
Tetsunori NAKAYAMA.
