/**
 * 
 * Schema Validator Part 6
Given an object (JavaScript) or dictionary (Python), determine if it matches the following schema:

Roles = "user" | "creator" | "moderator" | "staff" | "admin"

UserProfile = {
  username: string,
  posts: number,
  verified: boolean,
  role: Roles,
  supporter?: boolean,
  badges: string[]
}

{
  users: UserProfile[]
}
The pipe (|) symbol means "or". role must be one of the listed Roles values.
The question mark (?) after supporter means that the field is optional, but is the specified type if it exists.
UserProfile[] denotes an array of UserProfile objects. An empty array is valid.
Extra keys are allowed
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [
      {
        users: [
          {
            username: "ron",
            posts: 14,
            verified: true,
            role: "creator",
            badges: ["early-adopter"],
          },
          {
            username: "cher",
            posts: 25,
            verified: true,
            role: "moderator",
            supporter: true,
            followers: 20,
            badges: ["helper"],
          },
        ],
      },
    ],
    true,
  ],
  [[{ users: [] }], true],
  [
    [
      {
        users: {
          username: "anne",
          posts: 0,
          verified: false,
          role: "user",
          supporter: false,
          badges: [],
        },
      },
    ],
    false,
  ],
  [
    [
      {
        users: [
          {
            username: "tony",
            posts: 10,
            verified: true,
            role: "creator",
            supporter: true,
            badges: ["liked", 6],
          },
        ],
      },
    ],
    false,
  ],
  [
    [
      {
        users: [
          {
            username: "ursula",
            posts: 3,
            verified: false,
            role: "user",
            supporter: "false",
            badges: ["comeback"],
          },
        ],
      },
    ],
    false,
  ],
  [
    [
      {
        users: [
          {
            username: "benny",
            posts: 55,
            verified: true,
            role: "superstar",
            supporter: true,
            badges: ["veteran"],
          },
        ],
      },
    ],
    false,
  ],
  [
    [
      {
        users: [
          {
            username: "chase",
            posts: 1,
            verified: "yes",
            role: "staff",
            supporter: false,
            badges: ["superstar"],
          },
        ],
      },
    ],
    false,
  ],
  [
    [
      {
        users: [
          {
            username: "carla",
            posts: "10",
            verified: false,
            role: "user",
            supporter: false,
            badges: ["newbie"],
          },
        ],
      },
    ],
    false,
  ],
  [
    [
      {
        users: [
          {
            posts: 4,
            verified: false,
            role: "admin",
            supporter: false,
            badges: ["superuser", "veteran"],
          },
        ],
      },
    ],
    false,
  ],
  [
    [
      {
        users: [
          {
            username: "harold",
            posts: 80,
            verified: true,
            role: "creator",
            supporter: true,
            badges: ["liked", "hero"],
          },
          {
            username: "kim",
            posts: 11,
            verified: false,
            role: "admin",
            supporter: true,
            badges: ["first"],
          },
          {},
        ],
      },
    ],
    false,
  ],
];

function isValidUserProfile(obj) {
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
    Number.isInteger(obj.posts) &&
    typeof obj.verified === "boolean" &&
    validRoles.has(obj.role) &&
    (obj.supporter === undefined || typeof obj.supporter === "boolean") &&
    Array.isArray(obj.badges) &&
    obj.badges.every((b) => typeof b === "string")
  );
}

function isValidSchema(obj) {
  return typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj.users) &&
    obj.users.every((user) => isValidUserProfile(user));
}

if (require.main === module) {
  benchmark({ isValidSchema }, TESTCASES, 10000);
}

module.exports = { isValidSchema };
