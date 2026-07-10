/**
 * 
 * 
 * Exact Change
Given an integer amount in cents, return the number of distinct ways to make exact change using pennies (1 cent), nickels (5 cents), dimes (10 cents), and quarters (25 cents).
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[3], 1],
  [[9], 2],
  [[17], 6],
  [[39], 24],
  [[61], 73],
  [[99], 213],
];

function exactChange(amount) {
  const coins = [1, 5, 10, 25];

  const ways = Array(amount + 1).fill(0);

  ways[0] = 1;

  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      ways[i] += ways[i - coin];
    }
  }
  return ways[amount];
}

if (require.main === module) {
  benchmark({ first: exactChange }, TESTCASES, 10000);
}

module.exports = { exactChange };
