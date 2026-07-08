/**
 * 
 * 
 * Issue Triage
Given a number of milliseconds since the last post on an issue, and the last message posted on the issue, determine what you should do with the issue according to these rules:

If the last message is less than 7 days ago, return "leave it"
If the last message is 7 or more days ago and its content contains "bump" (case-insensitive), return "close it"
Otherwise, return "bump it"
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[86400000, "Lets fix it"], "leave it"],
  [[1209600000, "still waiting"], "bump it"],
  [[864000000, "bump"], "close it"],
  [[604800000, "Do we still want this?"], "bump it"],
  [[604800000, "Bumping this"], "close it"],
  [[345600000, "I'll make a PR"], "leave it"],
];

function triageIssue(ms, message) {
  const noOfDays = Math.round(ms / 86400000);

  message = message.toLowerCase();

  if (noOfDays < 7) return "leave it";
  else if (message.indexOf("bump") !== -1) return "close it";
  else return "bump it";
}

/**
 *
 * => The const noOfDays = Math.floor(ms / 86400000);
 *
 *  => In python you used floating-point division (ms / 86400000), so no_of_days can be fractional.
 *
 *
 *  => In javaScript, you used Math.floor, which forces it to an integer.
 * => So we used the Math.round() function to round the number of days to the nearest integer, which is more consistent with the python behavior
 *
 *
 *
 */

function issueTriage(msSinceLast, lastMessage) {
  const days = msSinceLast / (1000 * 60 * 60 * 24);
  const msgLower = lastMessage.toLowerCase();

  if (days < 7) {
    return "leave it";
  } else if (msgLower.includes("bump")) {
    return "close it";
  } else {
    return "bump it";
  }
}

if (require.main === module) {
  benchmark({ first: triageIssue, second: issueTriage }, TESTCASES, 10000);
}

module.exports = { triageIssue, issueTriage };
