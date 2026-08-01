/**
 * 
 * 
 * Magic Square Solver
Given a 3x3 grid with one missing number (represented as 0), return the missing number that completes the magic square, or "impossible" if no valid number exists.

A magic square is a grid where every row, column, and diagonal adds up to the same number.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [
      [
        [2, 7, 6],
        [9, 0, 1],
        [4, 3, 8],
      ],
    ],
    5,
  ],
  [
    [
      [
        [0, 14, 12],
        [18, 10, 2],
        [8, 6, 16],
      ],
    ],
    4,
  ],
  [
    [
      [
        [12, 17, 16],
        [19, 0, 10],
        [14, 13, 18],
      ],
    ],
    "impossible",
  ],
  [
    [
      [
        [15, 35, 31],
        [43, 27, 11],
        [23, 19, 0],
      ],
    ],
    39,
  ],
  [
    [
      [
        [26, 41, 14],
        [47, 35, 0],
        [32, 29, 44],
      ],
    ],
    "impossible",
  ],
];

function magicSquareSolver(grid) {

  grid = grid.map(row => [...row]);
  let missingR, missingC;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[r][c] === 0) {
        missingR = r;
        missingC = c;
      }
    }
  }

  // Step 2: find magic sum;
  const sums = [];

  for (let r = 0; r < 3; r++) {
    if (!grid[r].includes(0)) sums.push(grid[r].reduce((a, b) => a + b, 0));
  }

  for (let c = 0; c < 3; c++) {
    const col = [grid[0][c], grid[1][c], grid[2][c]];
    if (!col.includes(0)) sums.push(col.reduce((a, b) => a + b, 0));
  }

  const diag1 = [grid[0][0], grid[1][1], grid[2][2]];
  const diag2 = [grid[0][2], grid[1][1], grid[2][0]];

  if (!diag1.includes(0)) sums.push(diag1.reduce((a, b) => a + b, 0));
  if (!diag2.includes(0)) sums.push(diag2.reduce((a, b) => a + b, 0));

  if (sums.length === 0) return "impossible";
  const magicSum = sums[0];

  const rowSum = grid[missingR].reduce((a, b) => a + b, 0);
  const missingVal = magicSum - rowSum;
  if (missingVal <= 0) return "impossible";
  grid[missingR][missingC] = missingVal;

  function checkAll() {
    for (let r = 0; r < 3; r++) {
      if (grid[r].reduce((a, b) => a + b, 0) !== magicSum) return false;
    }

    for (let c = 0; c < 3; c++) {
      const colSum = grid[0][c] + grid[1][c] + grid[2][c];
      if (colSum !== magicSum) return false;
    }

    const d1 = grid[0][0] + grid[1][1] + grid[2][2];
    const d2 = grid[0][2] + grid[1][1] + grid[2][0];
    return d1 === magicSum && d2 === magicSum;
  }

  return checkAll() ? missingVal : "impossible";
}

if (require.main == module) {
  benchmark({ first: magicSquareSolver }, TESTCASES, 10000);
}

module.exports = { magicSquareSolver };
