/**
 * 
 * 
 * Connect 3
Given a matrix of strings representing pieces on a game grid, determine if any player has three in a row.

Each cell contains "R", "Y", or "" (empty string).
Three in a row means three consecutive non-empty cells of the same type horizontally, vertically, or diagonally.
Return:

A flat array with the winner and the coordinates of their three winning cells in the format: ["R", [0,2], [1,3], [2,4]]. Coordinates are returned top-to-bottom, then left-to-right.
An empty array if there is no winner.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [
      [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "Y", "", ""],
        ["Y", "R", "R", "R"],
      ],
    ],
    ["R", [3, 1], [3, 2], [3, 3]],
  ],
  [
    [
      [
        ["", "", "", ""],
        ["", "Y", "Y", ""],
        ["", "Y", "R", "R"],
        ["", "Y", "R", "R"],
      ],
    ],
    ["Y", [1, 1], [2, 1], [3, 1]],
  ],
  [
    [
      [
        ["", "", "Y", "R"],
        ["", "Y", "R", "Y"],
        ["", "R", "Y", "R"],
        ["", "R", "Y", "R"],
      ],
    ],
    ["R", [0, 3], [1, 2], [2, 1]],
  ],
  [
    [
      [
        ["", "Y", "", ""],
        ["", "Y", "Y", ""],
        ["", "R", "R", "Y"],
        ["R", "R", "Y", "R"],
      ],
    ],
    ["Y", [0, 1], [1, 2], [2, 3]],
  ],
  [
    [
      [
        ["Y", "R", "R", "Y"],
        ["R", "Y", "Y", "R"],
        ["Y", "R", "R", "Y"],
        ["R", "Y", "Y", "R"],
      ],
    ],
    [],
  ],
];

function connectThree(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const player = matrix[r][c];
      if (!player) {
        continue;
      }

      for (const [dr, dc] of directions) {
        const coords = [[r, c]];
        let nr = r,
          nc = c;
        let valid = true;

        for (let k = 0; k < 2; k++) {
          nr += dr;
          nc += dc;

          if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            matrix[nr][nc] === player
          ) {
            coords.push([nr, nc]);
          } else {
            valid = false;
            break;
          }
        }
        if (valid) {
          return [player, ...coords];
        }
      }
    }
  }

  return [];
}

if (require.main === module) {
  console.log(
    connectThree([
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "Y", "", ""],
      ["Y", "R", "R", "R"],
    ]),
  );
  benchmark({ first: connectThree }, TESTCASES, 10000);
}

module.exports = { connectThree };
