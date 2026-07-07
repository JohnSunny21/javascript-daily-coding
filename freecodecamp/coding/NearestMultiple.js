/**
 * 
 * 
 * 
 * Nearest Multiple
Given two integers, round the first to the nearest multiple of the second.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[5, 3], 6],
  [[17, 4], 16],
  [[43, 5], 45],
  [[38, 11], 33],
  [[93, 12], 96],
];

function roundToNearestMultiple(num, multiple) {
  return Math.round(num / multiple) * multiple;
}

function roundToNearestMultiple2(num, multiple) {
  if (multiple === 0) return num;

  if (num < multiple) return multiple;

  let product = 1;
  let currMul = multiple * product;

  while (currMul < num) {
    product++;
    currMul = multiple * product;
  }

  const prevMul = multiple * (product - 1);
  const nextMul = currMul;

  if (Math.abs(num - prevMul) < Math.abs(nextMul - num)) {
    return prevMul;
  } else {
    return nextMul;
  }
}

if (require.main === module) {
  benchmark(
    { first: roundToNearestMultiple, second: roundToNearestMultiple2 },
    TESTCASES,
    10000,
  );
}

module.exports = { roundToNearestMultiple, roundToNearestMultiple2 };
