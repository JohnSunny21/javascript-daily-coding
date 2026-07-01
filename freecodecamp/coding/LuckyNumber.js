/**
 * 
 * 
 * Lucky Number
Given a string of a person's first and last name, calculate their lucky number using the following rules:

First and last names are separated by a space
Find the vowel and consonant count for each name
Multiply the smaller vowel and consonant counts by each other and then by the length of the smaller name
Do the same for the two larger counts and the larger name
Subtract the smaller value from the larger one to get their lucky number
If the final value is zero (0), return 13.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["John Doe"], 21],
  [["Olivia Lewis"], 52],
  [["James Wilson"], 18],
  [["Elizabeth Hernandez"], 81],
  [["Mike Walker"], 32],
  [["Chloe Perez"], 13],
];

function getLuckyNumber(name) {
  const vowels = new Set("aeiou");

  const [first, last] = name.toLowerCase().split(" ");

  function counts(name) {
    const v = name
      .split("")
      .map((char) => {
        if (vowels.has(char)) {
          return 1;
        } else {
          return 0;
        }
      })
      .reduce((sum, ele) => sum + ele, 0);

    const c = name
      .split("")
      .map((char) => {
        if (!vowels.has(char)) {
          return 1;
        } else {
          return 0;
        }
      })
      .reduce((sum, ele) => sum + ele, 0);

    return [v, c, name.length];
  }

  const [v1, c1, l1] = counts(first);
  const [v2, c2, l2] = counts(last);

  const small_v = Math.min(v1, v2);
  const large_v = Math.max(v1, v2);

  const small_c = Math.min(c1, c2);
  const large_c = Math.max(c1, c2);

  const small_len = Math.min(l1, l2);
  const large_len = Math.max(l1, l2);

  const smaller_value = small_v * small_c * small_len;

  const larger_value = large_v * large_c * large_len;

  const lucky = larger_value - smaller_value;
  return lucky === 0 ? 13 : lucky;
}

/**
 *
 * Previously we got the NaN error because of how the map + reduce logic was written:
 *
 *  previously,
 * const v = name.split("").map(char => {
 *     if(vowels.has(char)){
 * return 1;})
 *
 * and no else part was provided, so when the char was not a vowel, it returned undefined.
 *
 * For characters that are not vowels, your map callback returns undefined, (since there's no else branch).
 * That means your array looks like [1, undefined, undefined, 1, ...].
 * When reduce tries to add sum + ele, it eventually does sum + undefined, which produces NaN.
 *
 * => Map must always return a number, but previous code only returned 1  for vowels and nothing for consonants.
 * => undefined values in the array caused the reduce to break.
 * That's why it produced NaN.
 */

if (require.main === module) {
  benchmark({ first: getLuckyNumber }, TESTCASES, 10000);
}

module.exports = { getLuckyNumber };
