/**
 * 
 * Second Best
Given an array of integers representing the price of different laptops, and an integer representing your budget, return:

The second most expensive laptop if it is within your budget, or
The most expensive laptop that is within your budget, or
0 if no laptops are within your budget.
Duplicate prices should be ignored.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[[1500, 2000, 1800, 1400], 1900], 1800],
  [[[1500, 2000, 2000, 1800, 1400], 1900], 1800],
  [[[2099, 1599, 1899, 1499], 2200], 1899],
  [[[2099, 1599, 1899, 1499], 1000], 0],
  [[[1200, 1500, 1600, 1800, 1400, 2000], 1450], 1400],
];

function getLaptopCost(laptops, budget) {
  const unique = [...new Set(laptops)];

  if( unique.length >= 2){
    const secondLast = unique.at(-2);
    const last = unique.at(-1);

    if(secondLast <= budget){
        return secondLast;
    }else if(last <= budget){
        return last;
    }
  }

  if(unique.length === 1){
    if(unique[0] <= budget){
        return unique[0];
    }
  }

  return 0;
}

if (require.main === module) {
  benchmark({ first: getLaptopCost }, TESTCASES, 10000);
}

module.exports = { getLaptopCost };
