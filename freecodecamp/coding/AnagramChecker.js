/**
 * 
 * Anagram Checker
Given two strings, determine if they are anagrams of each other (contain the same characters in any order).

Ignore casing and white space.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["listen", "silent"], true],
  [["School master", "The classroom"], true],
  [["A gentleman", "Elegant man"], true],
  [["Hello", "World"], false],
  [["apple", "banana"], false],
  [["cat", "dog"], false],
];

function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const sort1 = str1
    .toLowerCase()
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
  const sort2 = str2
    .toLowerCase()
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");

  return sort1 === sort2;
}

function areAnagrams2(str1, str2) {
  // Normalizing with the help of a method
  const normalize = (s) =>
    s.replace(/\s+/g, "").toLowerCase().split("").sort().join("");

  return normalize(str1) === normalize(str2);
}

if (require.main === module) {
  benchmark({ first: areAnagrams, second: areAnagrams2 }, TESTCASES, 10000);
}

module.exports = { areAnagrams, areAnagrams2 };
