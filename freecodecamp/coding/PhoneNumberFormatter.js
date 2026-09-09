/**
 * 
 * Phone Number Formatter
Given a string of eleven digits, return the string as a phone number in this format: "+D (DDD) DDD-DDDD".
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["05552340182"], "+0 (555) 234-0182"],
  [["15554354792"], "+1 (555) 435-4792"],
];

function formatNumber(number) {
  return `+${number[0]} (${number.slice(1, 4)}) ${number.slice(4, 7)}-${number.slice(7)}`;
}

// Time: O(1)
// Space: O(1) The input length is fixed at 11 characters.

function formatPhoneNumber(number) {
  return number.replace(/^(\d)(\d{3})(\d{3})(\d{4})$/, "+$1 ($2) $3-$4");
}

// Time: O(1)
// Space: O(1) Also constant because the string length is fixed.

if (require.main === module) {
  benchmark(
    { first: formatNumber, second: formatPhoneNumber },
    TESTCASES,
    10000,
  );
}
