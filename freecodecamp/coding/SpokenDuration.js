/**
 * 
 * 
 * Spoken Duration
Given a number of seconds, return the duration in spoken English.

Break the duration into hours, minutes, and seconds.
Skip any zero values.
Use singular or plural as appropriate ("1 hour", "2 hours").
If present, join the last two units with "and", and the second and third to last units with a comma ("1 hour, 2 minutes and 3 seconds").
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[3723], "1 hour, 2 minutes and 3 seconds"],
  [[7295], "2 hours, 1 minute and 35 seconds"],
  [[8521], "2 hours, 22 minutes and 1 second"],
  [[435], "7 minutes and 15 seconds"],
  [[14455], "4 hours and 55 seconds"],
  [[72000], "20 hours"],
  [[1], "1 second"],
];

function getSpokenDuration(seconds) {
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const parts = [];

  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds) parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);

  if (parts.length === 0) return "0 seconds";
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

if (require.main === module) {
  benchmark({ first: getSpokenDuration }, TESTCASES, 10000);
}

module.exports = { getSpokenDuration };
