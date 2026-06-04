/**
 * 
 * Targeted Sum
Given an array of numbers and an integer target, find two unique numbers in the array that add up to the target value. Return an array with the indices of those two numbers, or "Target not found" if no two numbers sum up to the target.

The returned array should have the indices in ascending order.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [[2, 7, 11, 15], 9],
    [0, 1],
  ],
  [
    [[3, 2, 4, 5], 6],
    [1, 2],
  ],
  [
    [[1, 3, 5, 6, 7, 8], 15],
    [4, 5],
  ],
  [[[1, 3, 5, 7], 14], "Target not found"],
];

function findTarget(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }

  return "Target not found";
}

function findTarget2(arr, target) {
  let freq = new Map();

  for (let i = 0; i < arr.length; i++) {
    freq.set(arr[i], i);
  }

  for (let i = 0; i < arr.length; i++) {
    let compliment = target - arr[i];
    if (freq.has(compliment) && freq.get(compliment) != i) {
      return [i, freq.get(compliment)];
    }
  }

  return "Target not found";
}

/***
 *  The condition freq.get(compliment) !== i
 *
 *  ensures you don't accidentally pair an element with itself.
 *
 *  Example 1: [3, 4, 5] , target = 6
 *
 *  At i = 0, arr[i] = 3.
 *  compliment = 6 - 3 = 3
 *  freq.has(3) is true, because you stored 3 at index 0.
 *  But if you don't check freq.get(compliment) !== i. You'd return [0, 0] - the same index twice.
 *  with this check, you skip that and continue until you find [1, 2] (indices of 4 and 2 if present).
 *
 *  Example 2: [3, 3], target = 6
 *
 *  At i = 0, arr[i] = 3.
 *  Compliment = 6 - 3 = 3.
 *  freq.has(3) is true, and freq.get(3) returns 1 (the last index where 3 was stored).
 *  freq.get(compliment) !== i -> 1 !==0  so valid.
 *  You return [0, 1], which is correct.
 *
 *  -> WITHOUT !== i, you risk returning the same index twice when the target is exactly double one element.
 *  => with it, you guarantee two distinct indices.
 *
 */

function findTarget3(arr, target) {
  const seen = new Map();

  for (let i = 0; i < arr.length; i++) {
    const compliment = target - arr[i];

    if (seen.has(compliment)) {
      // Found a pair: return the indices in ascending order
      const j = seen.get(compliment);
      return j < i ? [j, i] : [i, j];
    }

    // Store current value with its index
    seen.set(arr[i], i);
  }

  return "Target not found";
}

if (require.main === module) {
  benchmark(
    { first: findTarget, second: findTarget2, third: findTarget3 },
    TESTCASES,
    10000,
  );
}

module.exports = { findTarget, findTarget2, findTarget3 };
