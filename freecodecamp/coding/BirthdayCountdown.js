/**
 * 
 * 
 * Birthday Countdown
Given today's date and a birthday, return the number of days until the person's next birthday.

Today's date is given as a string in "YYYY-MM-DD" format, with leading zeros, for example: "2026-07-16".
The birthday is given as a string in "M/D" format, without leading zeros, for example: "9/7".
If today is their birthday, return the number of days until their next birthday (not 0).
Leap years should be accounted for.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["2026-07-16", "9/7"], 53],
  [["2026-07-16", "3/22"], 249],
  [["2026-07-16", "7/16"], 365],
  [["2024-02-28", "3/1"], 2],
  [["2023-04-24", "12/30"], 250],
  [["2024-03-01", "2/29"], 1460],
  [["2096-03-01", "2/29"], 2920],
];

function daysUntilBirthday(todayStr, birthdayStr) {
  const today = new Date(todayStr);

  let year = today.getFullYear();

  const [month, day] = birthdayStr.split("/").map(Number);

  function isLeap(y) {
    return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
  }

  let nextBirthday;

  if (month === 2 && day === 29) {
    // Special case: Feb 29
    if (isLeap(year) && today < new Date(year, 1, 29)) {
      nextBirthday = new Date(year, 1, 29);
    } else {
      // Find the next leap year
      while (true) {
        year++;
        if (isLeap(year)) {
          nextBirthday = new Date(year, 1, 29);
          break;
        }
      }
    }
  } else {
    // Normal birthdays
    let birthdayThisYear = new Date(year, month - 1, day);
    if (birthdayThisYear <= today) {
      year++;
      birthdayThisYear = new Date(year, month - 1, day);
    }
    nextBirthday = birthdayThisYear;
  }

  const diffMs = nextBirthday - today;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

if (require.main === module) {
  benchmark({ first: daysUntilBirthday }, TESTCASES, 10000);
}

module.exports = { daysUntilBirthday };
