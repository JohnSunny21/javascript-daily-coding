/**
 * 
 * 
 * Vowel Balance
Given a string, determine whether the number of vowels in the first half of the string is equal to the number of vowels in the second half.

The string can contain any characters.
The letters a, e, i, o, and u, in either uppercase or lowercase, are considered vowels.
If there's an odd number of characters in the string, ignore the center character.
 */

const { benchmark } = require("./utils/benchmark");

function isBalanced(s) {
  const vowels = new Set("aeiouAEIOU");
  const mid = Math.floor(s.length / 2);
  if (s.length % 2 === 1) {
    leftHalf = s.slice(0, mid);
    rightHalf = s.slice(mid + 1);

    let leftVowelCount = 0;
    let rightVowelCount = 0;

    for (let char of leftHalf) {
      if (vowels.has(char)) {
        leftVowelCount++;
      }
    }

    for (let char of rightHalf) {
      if (vowels.has(char)) {
        rightVowelCount++;
      }
    }

    return leftVowelCount === rightVowelCount;
  } else {
    leftHalf = s.slice(0, mid);
    rightHalf = s.slice(mid);

    let leftVowelCount = 0;
    let rightVowelCount = 0;

    for (let char of leftHalf) {
      if (vowels.has(char)) {
        leftVowelCount++;
      }
    }

    for (let char of rightHalf) {
      if (vowels.has(char)) {
        rightVowelCount++;
      }
    }
    return leftVowelCount === rightVowelCount;
  }
}

function vowelBalance(s) {
  const vowels = new Set("aeiouAEIOU");
  let n = s.length;

  let mid = Math.floor(n / 2);

  let firstHalf = s.slice(0, mid);
  let secondHalf = n % 2 === 0 ? s.slice(mid) : s.slice(mid + 1);
  // we can also write it as
  // let secondHalf = s.slice(n % 2 === 0 ? mid : mid + 1);

  const countVowels = (str) =>
    [...str].filter((char) => vowels.has(char)).length;

  return countVowels(firstHalf) === countVowels(secondHalf);
}

const TESTCASES = [
  [["racecar"], true],
  [["Lorem Ipsum"], true],
  [["Kitty Ipsum"], false],
  [["string"], false],
  [[" "], true],
  [["abcdefghijklmnopqrstuvwxyz"], false],
  [["123A#b!E&*456-o.U"], true],
];

// Run benchmark automatically when file is executed

if (require.main === module) {
  benchmark({ isBalanced, vowelBalance }, TESTCASES, 10000);
}

module.exports = { isBalanced, vowelBalance };
