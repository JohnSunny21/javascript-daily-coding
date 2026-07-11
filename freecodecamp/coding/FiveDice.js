/**
 * 
 * 
 * Five Dice
Given an array of five dice with values 1-6, return the best possible hand.

Here are the hands ranked lowest to highest:

Hand	Description
"no pair"	No pair or better
"pair"	Two dice with the same value
"two pair"	Two different pairs
"three of a kind"	Three dice with the same value
"small straight"	Four consecutive values
"large straight"	Five consecutive values
"full house"	Three of a kind and a pair
"four of a kind"	Four dice with the same value
"five of a kind"	All five dice with the same value
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[[1, 1, 1, 1, 1]], "five of a kind"],
  [[[5, 5, 5, 6, 5]], "four of a kind"],
  [[[2, 5, 6, 4, 3]], "large straight"],
  [[[4, 3, 3, 3, 1]], "three of a kind"],
  [[[4, 6, 2, 6, 5]], "pair"],
  [[[1, 4, 5, 6, 2]], "no pair"],
  [[[1, 3, 4, 6, 2]], "small straight"],
  [[[2, 2, 5, 2, 5]], "full house"],
  [[[6, 4, 5, 6, 4]], "two pair"],
];

function fiveDice(dice) {
  const counts = {};

  dice.forEach((d) => (counts[d] = (counts[d] || 0) + 1));
  const freq = Object.values(counts).sort((a, b) => b - a);
  const values = [...new Set(dice)].sort((a, b) => a - b);


  // check consecutive run length
  function longestRun(arr){
    let maxRun = 1, run = 1;
    for(let i = 1; i < arr.length; i++){
      if(arr[i] === arr[i - 1] + 1){
        run++;
        maxRun = Math.max(maxRun, run);
      }else{
        run = 1;
      }
    }
    return maxRun;
  }

  const runLength = longestRun(values);

  const setValues = new Set(values);

  if (freq.includes(5)) return "five of a kind";
  if (freq.includes(4)) return "four of a kind";
  if (freq.includes(3) && freq.includes(2)) return "full house";
  if(runLength === 5) return "large straight";
  if(runLength >= 4) return "small straight";

  if (freq.includes(3)) return "three of a kind";
  if (freq.filter((f) => f === 2).length === 2) return "two pair";
  if (freq.includes(2)) return "pair";
  return "no pair";
}

if (require.main === module) {
  benchmark({ first: fiveDice }, TESTCASES, 10000);
}

module.exports = { fiveDice };
