/**
 * camelCase
Given a string, return its camel case version using the following rules:

Words in the string argument are separated by one or more characters from the following set: space ( ), dash (-), or underscore (_). Treat any sequence of these as a word break.
The first word should be all lowercase.
Each subsequent word should start with an uppercase letter, with the rest of it lowercase.
All spaces and separators should be removed.
 * 
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["hello world"], "helloWorld"],
  [["HELLO WORLD"], "helloWorld"],
  [["secret agent-X"], "secretAgentX"],
  [["FREE cODE cAMP"], "freeCodeCamp"],
  [
    [
      "ye old-_-sea  faring_buccaneer_-_with a -peg__leg----and a_parrot_ _named- _squawk",
    ],
    "yeOldSeaFaringBuccaneerWithAPegLegAndAParrotNamedSquawk",
  ],
];

function toCamelCase(s) {
  const words = s.split(/[ \-_]+/);

  const result = [words[0].toLowerCase()];

  for (const word of words.slice(1)) {
    let newWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    result.push(newWord);
  }

  return result.join("");
}

/**
 * 
 * => Regex split: /[ \-_]+/ splits on any sequence of spaces, dashes, or underscores.
 * 
 * => Handles consistent casing across words.
 * 
 *  The undefined Problem
        You wrote:

        javascript
        let newWord = word[0].toUpperCase() + word.slice(1, ).toLowerCase();
        If word is an empty string (which can happen if your regex split produces empty entries), then word[0] is undefined.

        Calling .toUpperCase() on undefined throws the error you saw.

        This happens because your regex /[ \-_]/ splits on single separators only. 
        If the input has multiple consecutive spaces/dashes/underscores, you’ll get empty strings in the words array.


        That empty string causes word[0] to be undefined.

        Fixes: 
        1. Use a regex that matches one or more separator:
        const words = s.split(/[ \-_]+/);
        This avoids empty srings in the split result.

        Or, filter out empty strings after splitting:

        javascript
        const words = s.split(/[ \-_]/).filter(Boolean);

        word[0] vs word.charAt(0): both work, but charAt(0) is safer because it returns "" instead of undefined for empty strings.

The main flaw was the regex split producing empty strings, which then made word[0] undefined.
 */

function camelCase(str) {
  const words = str.split(/[ \-_]+/);

  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

if (require.main === module) {
  benchmark({ first: toCamelCase, second: camelCase }, TESTCASES, 10000);
}

module.exports = { toCamelCase, camelCase };
