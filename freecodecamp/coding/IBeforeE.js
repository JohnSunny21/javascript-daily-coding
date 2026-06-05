/**
 * 
 * I Before E
Given a word or sentence, return a corrected version where every word follows the "I before E except after C" rule.

If a word contains "ei" not preceded by "c", replace it with "ie".
If a word contains "ie" preceded by "c", replace it with "ei".
All other words are left unchanged.
 * 
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["beleive"], "believe"],
  [["recieve"], "receive"],
  [["we recieved a breif"], "we received a brief"],
  [["she beleived the friendly niece could percieve the greif"],"she believed the friendly niece could perceive the grief",],
  [["we recieved relief after the theif gave us a breif piece of feirce deceit",],"we received relief after the thief gave us a brief piece of fierce deceit",],
];

function IBeforeE(sentence) {
  const result = [];

  const n = sentence.length;

  let i = 0;

  while (i < n) {
    if (i < n - 1 && sentence.slice(i, i + 2) === "ei") {
      // If "ei" occurs at the very start of the string, there is no previous
      // character, so it cannot be after "c". That means this case should be
      // corrected to "ie".
      if (i === 0 || sentence[i - 1] !== "c") {
        result.push("ie");
        i += 2;
        continue;
      }
    } else if (i < n - 1 && sentence.slice(i, i + 2) === "ie") {
      // For "ie", we only want to change it to "ei" when it is preceded by "c".
      // If i is 0, there is no previous character, so we must skip this rule.
      if (i > 0 && sentence[i - 1] === "c") {
        result.push("ei");
        i += 2;
        continue;
      }
    }
    result.push(sentence[i]);
    i++;
  }

  return result.join("");
}

function IBeforeETwo(sentence) {
  return sentence
    .split(" ")
    .map((word) => {
      // Rule 1: "ei" not after "c" -> "ie"
      word = word.replace(/(?!c)ei/g, "ie");
      // Rule 2: "ie" after "c" -> "ei"
      word = word.replace(/cie/g, "cei");
      return word;
    })
    .join(" ");
}

// (?<!c) -> negative lookbehind . Ensures "ei" is no preceded by "c".


if(require.main === module){
    benchmark({ IBeforeE, IBeforeETwo}, TESTCASES, 10000);
}


module.exports = { IBeforeE, IBeforeETwo };