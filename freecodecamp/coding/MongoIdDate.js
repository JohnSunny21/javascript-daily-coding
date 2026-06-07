/**
 * 
 * Mongo ID Date
Given a MongoDB ID string, return its creation time as an ISO 8601 string.

A MongoDB ID is a 24-character hex string. The first 8 characters represent a Unix timestamp (in seconds) encoded as a base-16 integer.
For example, "6a094b50bcf86cd799439011" has a timestamp of "6a094b50" in hex, which is 1778994000 in decimal, representing a creation time of "2026-05-17T05:00:00.000Z".
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["6a094b50bcf86cd799439011"], "2026-05-17T05:00:00.000Z"],
  [["695344eb1f4a4c1123042128"], "2025-12-30T03:20:11.000Z"],
  [["386da62df34123ac54617e56"], "2000-01-01T07:01:01.000Z"],
  [["69f571c3d7711807afd3dd55"], "2026-05-02T03:38:43.000Z"],
];

function mongoIdToDate(objectId) {
  // First 8 characters -> hex timestamp
  const timestampHex = objectId.substring(0, 8);
  const timestamp = parseInt(timestampHex, 16); // convert hex to decimal

  const date = new Date(timestamp * 1000); // JS Date uses milliseconds
  return date.toISOString();
}

if (require.main === module) {
  benchmark({ first: mongoIdToDate }, TESTCASES, 10000);
}

module.exports = { mongoIdToDate };
