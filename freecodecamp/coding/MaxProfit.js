/**
 * 
 * 
 * 
 * Max Profit
Given an array of daily stock prices and a budget (in dollars), calculate the maximum profit you could make by buying and selling the stock over the given period.

You may only sell after you buy.
You can only buy whole shares.
Return the maximum possible profit as a string, rounded down to the nearest cent and formatted to two decimal places.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[[5, 6], 50], "10.00"],
  [[[8, 2, 5, 10], 20], "80.00"],
  [[[4, 5, 3, 6], 20], "18.00"],
  [[[54.4, 51.22, 53.99, 50.28, 53.01, 52.84], 200], "8.31"],
  [[[15.38, 15.01, 14.99, 14.62, 14.28], 80], "0.00"],
  [
    [[121.45, 126.82, 122.91, 124.65, 128.83, 128.83, 127.33], 1230.25],
    "73.80",
  ],
];

function maxProfit(prices, budget) {
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const buyPrice = prices[i];
      const sellPrice = prices[j];

      const shares = Math.floor(budget / buyPrice);

      if (shares > 0) {
        const profit = shares * (sellPrice - buyPrice);
        if (profit > maxProfit) {
          maxProfit = profit;
        }
      }
    }
  }

  maxProfit = Math.floor(maxProfit * 100) / 100;

  return maxProfit.toFixed(2);
}

if (require.main === module) {
  benchmark({ first: maxProfit }, TESTCASES, 10000);
}

module.exports = { maxProfit };
