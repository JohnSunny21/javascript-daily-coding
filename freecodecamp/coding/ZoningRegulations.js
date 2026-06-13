/**
 * 
 * 
 * Zoning Regulations
Given a 2D grid (array of arrays) representing a city's building layout, return the coordinates of all buildings that are violating zoning rules.

Each cell in the grid contains one of the labels from the table below. A building is in violation if any of its (up to) 4 neighbors, horizontal or vertical, are a type it cannot be adjacent to.

Label	Type	Cannot be adjacent to
"i"	industrial	"R", "I"
"A"	Agricultural	"C"
"R"	Residential	"i", "C"
"I"	Institutional	"i"
"C"	Commercial	"R", "A"
"" (empty string)	undeveloped	no restrictions
Return the coordinates of all violating cells as an array of [row, col] pairs, in any order. If no violations exist, return an empty array.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [
      [
        ["R", "C"],
        ["", "C"],
      ],
    ],
    [
      [0, 0],
      [0, 1],
    ],
  ],
  [
    [
      [
        ["", "i"],
        ["", "R"],
        ["R", "I"],
      ],
    ],
    [
      [0, 1],
      [1, 1],
    ],
  ],
  [
    [
      [
        ["A", "i", "C"],
        ["A", "", "C"],
        ["R", "R", "I"],
      ],
    ],
    [],
  ],
  [
    [
      [
        ["R", "R", "C", "R", "R"],
        ["R", "I", "C", "", "A"],
        ["R", "R", "", "i", "A"],
      ],
    ],
    [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  ],
  [
    [
      [
        ["R", "A", "A", "", "i", "i"],
        ["R", "I", "", "C", "i", "i"],
        ["R", "", "C", "C", "A", "A"],
        ["R", "R", "C", "I", "R", "R"],
      ],
    ],
    [
      [2, 3],
      [2, 4],
      [3, 1],
      [3, 2],
    ],
  ],
];

function getZoneViolations1(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const zoningRegulations = {
    i: ["R", "I"],
    A: ["C"],
    R: ["i", "C"],
    I: ["i"],
    C: ["R", "A"],
  };

  const result = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of directions) {
        let nr = dr + r;
        let nc = dc + c;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          if (grid[nr][nc] === "" || grid[r][c] === "") {
            continue;
          } else if (
            zoningRegulations[grid[r][c]].includes(grid[nr][nc]) &&
            !result.includes([nr, nc])
          ) {
            result.push([nr, nc]);
          }
        }
      }
    }
  }
  return result;
}

/**
 * 
 *The above version uses result.includes([nr, nc]), but in javascript arrays are compared by reference, so [1, 2] !== [1, 2]. That's why duplicates slip through.
 
 To fix it, you can either:
 => Use a Set of stringified coordinates (as below), or
 => Write a helper to check duplicates by value
 */

function containsCoord(arr, coord) {
  return arr.some(([r, c]) => r === coord[0] && c === coord[1]);
}

function getZoneViolations(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const zoningRegulations = {
    i: ["R", "I"],
    A: ["C"],
    R: ["i", "C"],
    I: ["i"],
    C: ["R", "A"],
  };

  const result = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of directions) {
        const nr = r + dr,
          nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          if (grid[nr][nc] === "" || grid[r][c] === "") continue;
          if (zoningRegulations[grid[r][c]].includes(grid[nr][nc])) {
            if (!containsCoord(result, [nr, nc])) {
              result.push([nr, nc]);
            }
          }
        }
      }
    }
  }
  return result.sort();
}

function getZoneViolations2(grid) {
  const restrictions = {
    i: ["R", "I"],
    A: ["C"],
    R: ["i", "C"],
    I: ["i"],
    C: ["R", "A"],
    "": [],
  };

  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // Use a Set of stringified coordinates to avoid duplicates
  const violations = new Set();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];
      if (cell === "") continue;

      for (const [dr, dc] of directions) {
        const nr = r + dr,
          nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          const neighbor = grid[nr][nc];
          if (neighbor !== "" && restrictions[cell].includes(neighbor)) {
            violations.add(`${nr},${nc}`);
          }
        }
      }
    }
  }

  // Convert back to array of [row, col]
  return Array.from(violations)
    .map((coord) => coord.split(",").map(Number))
    .sort();
}

if (require.main === module) {
  benchmark(
    { first: getZoneViolations, second: getZoneViolations2 },
    TESTCASES,
    10000,
  );
}

module.exports = { getZoneViolations, getZoneViolations2 };
