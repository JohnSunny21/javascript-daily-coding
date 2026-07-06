/**
 * 
 * 
 * lowercase words
Given a string, return only the words that are entirely lowercase, in their original order and with a space between each word.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["hello GOOD world"], "hello world"],
  [["these are all lowercase"], "these are all lowercase"],
  [["less is NoT more"], "less is more"],
  [["DonT eat pizza every OTHER day"], "eat pizza every day"],
  [
    [
      "the Super quick AND snEaky brown fox Leapt anD jumped over aNd AROUND the lazy SloW dog",
    ],
    "the quick brown fox jumped over the lazy dog",
  ],
];

function getLowercaseWords(str) {
  return str
    .split(" ")
    .filter((word) => word === word.toLowerCase())
    .join(" ");
}

if (require.main === module) {
  benchmark({ first: getLowercaseWords }, TESTCASES, 10000);
}

module.exports = { getLowercaseWords };
