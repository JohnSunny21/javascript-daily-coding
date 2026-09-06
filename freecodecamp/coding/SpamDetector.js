/**
 * 
 * Spam Detector
Given a phone number in the format "+A (BBB) CCC-DDDD", where each letter represents a digit as follows:

A represents the country code and can be any number of digits.
BBB represents the area code and will always be three digits.
CCC and DDDD represent the local number and will always be three and four digits long, respectively.
Determine if it's a spam number based on the following criteria:

The country code is greater than 2 digits long or doesn't begin with a zero (0).
The area code is greater than 900 or less than 200.
The sum of first three digits of the local number appears within last four digits of the local number.
The number has the same digit four or more times in a row (ignoring the formatting characters).
 */


const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [["+0 (200) 234-0182"], false],
    [["+091 (555) 309-1922"], true],
    [["+1 (555) 435-4792"], true],
    [["+0 (955) 234-4364"], true],
    [["+0 (155) 131-6943"], true],
    [["+0 (555) 135-0192"], true],
    [["+0 (555) 564-1987"], true],
    [["+00 (555) 234-0182"], false]
];



function isSpam(phoneNumber) {
  // Extract country code and area code
  const match = phoneNumber.match(/^\+(\d+) \((\d{3})\) (\d{3})-(\d{4})$/);

  const countryCode = match[1];
  const areaCode = Number(match[2]);
  const firstThree = match[3];
  const lastFour = match[4];

  // Condition 1: Country code
  const badCountryCode =
    countryCode.length > 2 || countryCode[0] !== "0";

  // Condition 2: Area code
  const badAreaCode =
    areaCode > 900 || areaCode < 200;


  const sumFirstThree = firstThree.split("").map(dig => Number(dig)).reduce((sum, ele) => sum + ele, 0);
  // Condition 3: First three local digits appear in last four
  const repeatedLocalNumber = lastFour.includes(sumFirstThree.toString());

  // Condition 4: Same digit 4+ times in a row
  const allDigits = phoneNumber.replace(/\D/g, "");
  const repeatedDigits = /(\d)\1\1\1/.test(allDigits);

  return (
    badCountryCode ||
    badAreaCode ||
    repeatedLocalNumber ||
    repeatedDigits
  );
}


function spamDetector(phoneNumber) {
  const match = phoneNumber.match(
    /^\+(\d+) \((\d{3})\) (\d{3})-(\d{4})$/
  );

  const countryCode = match[1];
  const areaCode = Number(match[2]);
  const firstThree = match[3];
  const lastFour = match[4];

  // Condition 1
  const badCountryCode =
    countryCode.length > 2 || countryCode[0] !== "0";

  // Condition 2
  const badAreaCode =
    areaCode > 900 || areaCode < 200;

  // Condition 3
  const sum =
    Number(firstThree[0]) +
    Number(firstThree[1]) +
    Number(firstThree[2]);

  const sumAppears = lastFour.includes(String(sum));

  // Condition 4
  const allDigits = phoneNumber.replace(/\D/g, "");
  const repeatedDigits = /(\d)\1\1\1/.test(allDigits);

  return (
    badCountryCode ||
    badAreaCode ||
    sumAppears ||
    repeatedDigits
  );
}

if(require.main === module){
    benchmark({"first": isSpam, "second": spamDetector}, TESTCASES, 10000);
}