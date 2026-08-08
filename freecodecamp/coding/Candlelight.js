/**
 * 
 * Candlelight
Given an integer representing the number of candles you start with, and an integer representing how many burned candles it takes to create a new one, return the number of candles you will have used after creating and burning as many as you can.

For example, if given 7 candles and it takes 2 burned candles to make a new one:

Burn 7 candles to get 7 leftovers,
Recycle 6 leftovers into 3 new candles (1 leftover remains),
Burn 3 candles to get 3 more leftovers (4 total),
Recycle 4 leftovers into 2 new candles,
Burn 2 candles to get 2 leftovers,
Recycle 2 leftovers into 1 new candle,
Burn 1 candle.
You will have burned 13 total candles in the example.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[7, 2], 13],
  [[10, 5], 12],
  [[20, 3], 29],
  [[17, 4], 22],
  [[2345, 3], 3517],
];

function burnCandles(candles, leftoversNeeded) {
  let totalBurned = 0;

  let leftOvers = 0;

  while (candles > 0) {
    totalBurned += candles;

    leftOvers += candles;

    candles = Math.floor(leftOvers / leftoversNeeded);

    leftOvers %= leftoversNeeded;
  }

  return totalBurned;
}

if (require.main === module) {
  benchmark({ first: burnCandles }, TESTCASES, 10000);
}
