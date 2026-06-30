/**
 * 
 * 
 * Duplicate Character Count
Given two strings, return a count of characters from the second string that can be found in the first.

Duplicate characters in the second string are counted separately.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["aloha", "hei"], 1],
  [["jambo", "bonjour"], 4],
  [["hello", "hola"], 3],
  [["ola", "hej"], 0],
  [["ciao", "konnichiwa"], 5],
  [["merhaba", "xin chao"], 2],
  [["hello world", "hello to everyone around the world"], 26],
];

function duplicateCharacterCount(str1, str2) {
  const set1 = new Set(str1);

  let count = 0;

  for (const char of str2) {
    if (set1.has(char)) {
      count++;
    }
  }
  return count;
}

if (require.main === module) {
  benchmark({ first: duplicateCharacterCount }, TESTCASES, 10000);
}

module.exports = { duplicateCharacterCount };
