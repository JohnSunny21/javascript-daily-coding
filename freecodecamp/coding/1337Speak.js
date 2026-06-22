/**
 * 
 * 
 * 1337 Speak
Given a lowercase string, return it translated into leet speak by replacing the letters below with their leet substitutions:

Letter	Leet
a	4
e	3
g	9
i	1
l	1
o	0
s	5
t	7
Characters with no substitution are left unchanged.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["cool"], "c001"],
  [["leet"], "1337"],
  [["hacker"], "h4ck3r"],
  [["satellite"], "547311173"],
  [["abcdefghijklmnopqrstuvwxyz"], "4bcd3f9h1jk1mn0pqr57uvwxyz"],
];

function makeLeet(str) {
  const leetDict = {
    a: "4",
    e: "3",
    g: "9",
    i: "1",
    l: "1",
    o: "0",
    s: "5",
    t: "7",
  };

  const result = [];

  for (const char of str) {
    if (leetDict[char]) {
      result.push(leetDict[char]);
    } else {
      result.push(char);
    }
  }

  return result.join("");
}

function leetSpeak(text) {
  const mapping = {
    a: "4",
    e: "3",
    g: "9",
    i: "1",
    l: "1",
    o: "0",
    s: "5",
    t: "7",
  };

  return text
    .split("")
    .map((ch) => mapping[ch] || ch)
    .join("");
}

if (require.main == module) {
  benchmark({ first: makeLeet, second: leetSpeak }, TESTCASES, 10000);
}

module.exports = { makeLeet, leetSpeak };
