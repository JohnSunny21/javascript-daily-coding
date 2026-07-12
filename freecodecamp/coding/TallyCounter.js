/**
 * 
 * Tally Counter
Given a string of tally marks, return the total count represented.

Each pipe "|" represents one count.
Every fifth mark is represented as a forward slash "/", completing a group of five ("||||/").
Groups are separated by a space.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["||||"], 4],
  [["||||/"], 5],
  [["||||/ |||"], 8],
  [["||||/ ||||/ ||||/ ||"], 17],
  [["||||/ ||||/ ||||/ ||||/ ||||/ ||||/ ||||/ ||||/ |"], 41],
];

function getTallyCount(str) {
  let total = 0;

  for (const char of str) {
    if (char === "|" || char === "/") {
      total++;
    }
  }
  return total;
}

if (require.main === module) {
  benchmark({ first: getTallyCount }, TESTCASES, 10000);
}

module.exports = { getTallyCount };
