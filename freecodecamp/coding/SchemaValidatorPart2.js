/**
 * 
 * Schema Validator Part 2
Given an object (JavaScript) or dictionary (Python), determine if it matches the following schema:

{
  username: string,
  posts: number,
  verified: boolean
}
Extra keys are allowed
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[{ username: "alice", posts: 10, verified: false }], true],
  [[{ username: "carol", posts: 15, verified: true, followers: 25 }], true],
  [[{ username: "frank", posts: "21", verified: true }], false],
  [[{ username: "sam", posts: 17, verified: "false" }], false],
  [[{ username: "bill", verified: true }], false],
  [[{ username: "fred", verified: true }], false],
  [[{ username: 5, posts: 10, verified: true }], false],
];

function isValidSchema(obj) {
  return (
    typeof obj.username === "string" &&
    typeof obj.posts === "number" &&
    typeof obj.verified === "boolean"
  );
}

function isValidSchema2(obj) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.username === "string" &&
    typeof obj.posts === "number" &&
    typeof obj.verified === "boolean"
  );
}
/**
 * In javascript, typeof 5 === "number"  and typeof 5.5 === "number", so both integers and float's are accepted automatically by the typeof check. If you wanted to enforce that posts must be an integer, you could add an additional check using Number.isInteger(obj.posts).
 * The second version adds a check to ensure that the input is an object and not null, which makes it more robust against invalid inputs like null or non-object types. Both versions correctly validate the schema as specified.
 */

if (require.main === module) {
  benchmark({ isValidSchema, isValidSchema2 }, TESTCASES, 10000);
}

module.exports = { isValidSchema, isValidSchema2 };
