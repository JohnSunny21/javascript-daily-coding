/**
 * 
 * 
 * Letter Distance
Given two strings of equal length, return the sum of the shortest distances between each pair of characters.

The input will only contain lowercase letters
The alphabet is treated as a circle, so the distance between a and z is 1.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["abc", "bcd"], 3],
  [["abc", "xyz"], 9],
  [["encrypt", "decrypt"], 10],
  [["algorithm", "codeblock"], 43],
  [["lobster", "penguin"], 47],
  [["alligator", "crocodile"], 55],
];

function letterDistance(str1, str2) {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  let totalSum = 0;

  for (let i = 0; i < str1.length; i++) {
    let minDist = Math.min(
      Math.abs(letters.indexOf(str1[i]) - letters.indexOf(str2[i])),
      26 - Math.abs(letters.indexOf(str1[i]) - letters.indexOf(str2[i])),
    );

    totalSum += minDist;
  }

  return totalSum;
}

/**
 * 
 * The issue above is the indexOf method scans the whole string for each character making it the inefficient solution
 * so we prefer the later one.
 */

function letterDistance2(str1, str2) {
  let total = 0;

  for (let i = 0; i < str1.length; i++) {
    let p1 = str1.charCodeAt(i) - "a".charCodeAt(0);
    let p2 = str2.charCodeAt(i) - "a".charCodeAt(0);

    const diff = Math.abs(p1 - p2);

    const dist = Math.min(diff, 26 - diff);

    total += dist;
  }

  return total;
}

if (require.main === module) {
  benchmark(
    { first: letterDistance, second: letterDistance2 },
    TESTCASES,
    10000,
  );
}

module.exports = { letterDistance };
