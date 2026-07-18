/**
 * 
 * Dice Odds
Given a number of six-sided dice to roll and a target sum, return the odds of rolling that sum as a string in the format "1 in X".

The number of dice will be between 1 and 6.
The target sum is always achievable with the given number of dice.
Round "X" to the nearest whole number.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[1, 5], "1 in 6"],
  [[2, 4], "1 in 12"],
  [[3, 10], "1 in 8"],
  [[4, 7], "1 in 65"],
  [[5, 26], "1 in 111"],
  [[6, 35], "1 in 7776"],
];

function getOdds(numDice, targetSum) {
  const ways = Array.from({ length: numDice + 1 }, () =>
    Array(targetSum + 1).fill(0),
  );

  ways[0][0] = 1;
  for (let dice = 1; dice <= numDice; dice++) {
    for (let s = dice; s <= targetSum; s++) {
      for (let face = 1; face <= 6; face++) {
        if (s - face >= 0) {
          ways[dice][s] += ways[dice - 1][s - face];
        }
      }
    }
  }

  const favorable = ways[numDice][targetSum];
  const total = 6 ** numDice;
  const odds = Math.round(total / favorable);
  return `1 in ${odds}`;
}

if (require.main === module) {
  benchmark({ first: getOdds }, TESTCASES, 1000);
}

module.exports = { getOdds };
