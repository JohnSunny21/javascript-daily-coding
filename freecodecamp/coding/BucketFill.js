/**
 * 
 * 
 * Bucket Fill
Given a 2D grid, a starting position ([row, col]), and a new value, replace the value at the starting position and all connected cells of the same value with the new value.

Cells are connected if they are adjacent horizontally or vertically (not diagonally).
Return the updated grid.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [
      [
        ["R", "G"],
        ["R", "G"],
      ],
      [0, 1],
      "B",
    ],
    [
      ["R", "B"],
      ["R", "B"],
    ],
  ],
  [
    [
      [
        ["Y", "G", "G"],
        ["Y", "Y", "Y"],
        ["B", "Y", "R"],
      ],
      [1, 2],
      "B",
    ],
    [
      ["B", "G", "G"],
      ["B", "B", "B"],
      ["B", "B", "R"],
    ],
  ],
  [
    [
      [
        ["O", "O", "P"],
        ["P", "O", "O"],
        ["P", "P", "O"],
      ],
      [2, 0],
      "R",
    ],
    [
      ["O", "O", "P"],
      ["R", "O", "O"],
      ["R", "R", "O"],
    ],
  ],
  [
    [
      [
        ["T", "T", "R", "T"],
        ["R", "T", "R", "T"],
        ["R", "T", "R", "T"],
        ["T", "T", "T", "T"],
      ],
      [0, 3],
      "Y",
    ],
    [
      ["Y", "Y", "R", "Y"],
      ["R", "Y", "R", "Y"],
      ["R", "Y", "R", "Y"],
      ["Y", "Y", "Y", "Y"],
    ],
  ],
  [
    [
      [
        ["G", "B", "G", "B"],
        ["R", "B", "B", "G"],
        ["B", "G", "B", "R"],
        ["B", "G", "G", "B"],
      ],
      [2, 2],
      "G",
    ],
    [
      ["G", "G", "G", "B"],
      ["R", "G", "G", "G"],
      ["B", "G", "G", "R"],
      ["B", "G", "G", "B"],
    ],
  ],
];

function bucketFill(grid, [row, col], newValue) {
  const rows = grid.length;
  const cols = grid[0].length;
  const [r, c] = [row, col];

  const target = grid[r][c];

  if (target === newValue) {
    return grid;
  }

  function dfs(x, y) {
    if (x >= 0 && x < rows && y >= 0 && y < cols && grid[x][y] === target) {
      grid[x][y] = newValue;
      dfs(x - 1, y);
      dfs(x + 1, y);
      dfs(x, y - 1);
      dfs(x, y + 1);
    }
  }

  dfs(r, c);

  return grid;
}

if (require.main === module) {
  benchmark({ first: bucketFill }, TESTCASES, 10000);
}

module.exports = { bucketFill };
