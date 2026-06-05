/***
 * 
 * Schema Validator Part 3
Given an object (JavaScript) or dictionary (Python), determine if it matches the following schema:

Roles = "user" | "creator" | "moderator" | "staff" | "admin"

{
  username: string,
  posts: number,
  verified: boolean,
  role: Roles
}
The pipe (|) symbol means "or". role must be one of the listed Roles values.
Extra keys are allowed
 * 
 */


const  { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[{ username: "henry", posts: 0, verified: true, role: "staff" }], true],
    [[{ username: "sara", posts: 45, verified: false, role: "creator", followers: 70 }], true],
    [[{ username: "penelope", posts: 20, verified: true, role: "admin" }], true],
    [[{ username: "kevin", posts: 0, verified: false, role: "user" }], true],
    [[{ username: "george", posts: 15, verified: true, role: "moderator" }], true],
    [[{ username: "david", posts: 0, verified: false, role: "guest" }], false],
    [[{ username: "wendy", posts: 10, verified: true }], false],
    [[{ username: "fabian", posts: 1, verified: true, role: true }], false],
    [[{ username: 8, posts: 1, verified: true, role: "user" }], false],
    [[{ username: "penny", posts: "10", verified: true, role: "staff" }], false],
    [[{ username: "john", posts: "1", verified: "true", role: "admin" }], false]
];

function isValidSchema(obj){
    const validRoles = new Set(["user", "creator", "moderator", "staff", "admin"]);

    return typeof obj === "object" && obj !== null &&
        typeof obj.username === "string" &&
        typeof obj.posts === "number" && 
        typeof obj.verified === "boolean" &&
        typeof obj.role === "string" && validRoles.has(obj.role);

        // we can also use an array here and use the includes method
}

function isValidSchema2(obj) {
  const validRoles = ["user", "creator", "moderator", "staff", "admin"];

  return typeof obj === "object" &&
         obj !== null &&
         typeof obj.username === "string" &&
         typeof obj.posts === "number" &&
         typeof obj.verified === "boolean" &&
         validRoles.includes(obj.role);
}

// Also, typeof obj !== null is not valid = typeof obj always returns a string.
// The correct check is obj !== null && typeof obj === "object" to ensure that obj is an object and not null. This is important because typeof null also returns "object", which can lead to false positives if not checked properly.


if (require.main === module) {
    benchmark({ isValidSchema, isValidSchema2 }, TESTCASES, 10000);
}

module.exports = { isValidSchema, isValidSchema2 };

