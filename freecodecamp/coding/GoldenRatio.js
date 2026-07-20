/**
 * 
 * Golden Ratio
Given two numbers, determine if their ratio approximates the golden ratio.

Use a golden ratio of 1.618
Allow a tolerance of 0.01
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[21, 34], true],
  [[15, 20], false],
  [[8, 13], true],
  [[10, 16], false],
  [[1618, 1000], true],
  [[88, 55], false],
];

function isGoldenRatio(a, b) {
    const goldenRatio = 1.618;
    const tolerance = 0.01;

    // Ensure ratio is always >= 1
    ratio = Math.max(a, b) / Math.min(a, b)

    return Math.abs(ratio - goldenRatio) <= tolerance;
}

if (require.main === module) {
  benchmark({ first: isGoldenRatio }, TESTCASES, 10000);
}

module.exports = { isGoldenRatio };
