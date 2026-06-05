/**
 * 
 * Schema Validator Part 4
Given an object (JavaScript) or dictionary (Python), determine if it matches the following schema:

Roles = "user" | "creator" | "moderator" | "staff" | "admin"

{
  username: string,
  posts: number,
  verified: boolean,
  role: Roles,
  supporter?: boolean
}
The pipe (|) symbol means "or". role must be one of the listed Roles values.
The question mark (?) after supporter means that the field is optional, but is the specified type if it exists.
Extra keys are allowed
 * 
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [
      {
        username: "vivian",
        posts: 1,
        verified: false,
        role: "user",
        supporter: true,
      },
    ],
    true,
  ],
  [[{ username: "rudolph", posts: 15, verified: true, role: "creator" }], true],
  [
    [
      {
        username: "hernandez",
        posts: 35,
        verified: true,
        role: "moderator",
        supporter: false,
        followers: 55,
      },
    ],
    true,
  ],
  [
    [
      {
        username: "julia",
        posts: 50,
        verified: true,
        role: "admin",
        supporter: "true",
      },
    ],
    false,
  ],
  [
    [
      {
        username: "bernard",
        posts: 0,
        verified: true,
        role: "friend",
        supporter: true,
      },
    ],
    false,
  ],
  [
    [
      {
        username: "felix",
        posts: 40,
        verified: "yes",
        role: "staff",
        supporter: false,
      },
    ],
    false,
  ],
  [
    [
      {
        username: "jimmy",
        posts: true,
        verified: false,
        role: "creator",
        supporter: true,
      },
    ],
    false,
  ],
  [
    [
      {
        username: true,
        posts: 30,
        verified: true,
        role: "moderator",
        supporter: false,
      },
    ],
    false,
  ],
];

function isValidSchema(obj) {
  const validRoles = new Set([
    "user",
    "creator",
    "moderator",
    "staff",
    "admin",
  ]);

  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.username === "string" &&
    typeof obj.posts === "number" &&
    typeof obj.verified === "boolean" &&
    typeof obj.role === "string" &&
    validRoles.has(obj.role) &&
    (obj.supporter === undefined || typeof obj.supporter === "boolean")
  );
}

if (require.main === module) {
  benchmark({ isValidSchema }, TESTCASES, 10000);

  console.log(
    isValidSchema({
      username: "vivian",
      posts: 1,
      verified: false,
      role: "user",
      supporter: true,
    }),
  );
}

module.exports = { isValidSchema };
