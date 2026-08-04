/**
 * 
 * 
 * Golf Handicap Calculator
Given an array of golf scores and a corresponding array of course par values, return the golfer's handicap index using the following method:

Calculate the differential for each round by subtracting the par from the score, then return the average of all differentials rounded to one decimal place.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [
      [72, 72, 72],
      [72, 72, 72],
    ],
    0,
  ],
  [
    [
      [80, 76, 78, 78],
      [72, 72, 72, 72],
    ],
    6,
  ],
  [
    [
      [42, 45, 46, 44],
      [36, 36, 36, 36],
    ],
    8.3,
  ],
  [
    [
      [85, 80, 76, 79, 82],
      [72, 72, 72, 71, 71],
    ],
    8.8,
  ],
  [
    [
      [41, 50, 48, 52, 46, 49],
      [35, 37, 35, 37, 35, 37],
    ],
    11.7,
  ],
];

function calculateHandicap(scores, pars) {
  const diffs = scores.map((score, index) => score - pars[index]);

  const avg = diffs.reduce((acc, curr) => acc + curr, 0) / diffs.length;
  return Math.round(avg * 10) / 10;
}

if (require.main === module) {
  benchmark({ first: calculateHandicap }, TESTCASES, 1000);
}

module.exports = { calculateHandicap };
