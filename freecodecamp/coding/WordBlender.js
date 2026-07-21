/**
 * 
 * Word Blender
Given two words, return a new word by combining the first half of the first word with the second half of the second word.

For odd-length words, the first half is the shorter half.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["turtle", "toucan"], "turcan"],
  [["chipmunk", "flamingo"], "chipingo"],
  [["falcon", "pelican"], "falican"],
  [["hyena", "iguana"], "hyana"],
  [["scorpion", "gorilla"], "scorilla"],
  [["platypus", "wolverine"], "platerine"],
];

function blendWords(word1, word2) {
  const mid1 = Math.floor(word1.length / 2);
  const mid2 = Math.floor(word2.length / 2);

  return word1.slice(0, mid1) + word2.slice(mid2);
}

if (require.main === module) {
  benchmark({ first: blendWords }, TESTCASES, 1000);
}

module.exports = { blendWords };
