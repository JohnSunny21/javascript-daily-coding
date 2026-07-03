/**
 * 
 * 
 * Database Migration
Given two database objects, return the second object with any missing properties from the first filled in.

Fields that already exist in the record should not be overwritten.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [{ username: "", posts: 0 }, { verified: true }],
    { username: "", posts: 0, verified: true },
  ],
  [
    [
      { username: "", posts: 0 },
      { username: "camper", posts: 5 },
    ],
    { username: "camper", posts: 5 },
  ],
  [
    [{ username: "", posts: 0, verified: false }, { username: "camper" }],
    { username: "camper", posts: 0, verified: false },
  ],
  [
    [
      { username: "", posts: 0 },
      { username: "camper", role: "admin" },
    ],
    { username: "camper", role: "admin", posts: 0 },
  ],
  [
    [
      {
        username: "",
        email: "",
        posts: 0,
        verified: false,
        role: "user",
        banned: false,
      },
      { username: "camper", email: "camper@freecodecamp.org", role: "admin" },
    ],
    {
      username: "camper",
      email: "camper@freecodecamp.org",
      role: "admin",
      posts: 0,
      verified: false,
      banned: false,
    },
  ],
];

function migrateRecord(schema, record) {
  for (const key of Object.keys(schema)) {
    // we can also write it as if(!record.hasOwnProperty(key)) but this is more readable
    // and if(record[key] === undefined) is also a valid option but it will not work if the value is null or false.
    if (record[key]) {
      continue;
    } else {
      record[key] = schema[key];
    }
  }

  return Object.fromEntries(
    Object.entries(record).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)), // or we can write Object.fromEntries(Object.entries(record).sort((a, b) => a[0].localeCompare(b[0]))) but this is more readable
  );
}

/**
 *
 *
 * if(record[key]) {
 * continue;
 * }else{
 * record[key] = schema[key];
 * }
 *
 * This condition is wrong because it treats any falsy value(0, false, "", null) as if the property is missing. That's why you end up overwriting valid fields when they contain
 * falsy values.
 *
 * => Use hasOwnProperty() or in to check existence instead of truthiness;
 *
 */

function migrateDB(obj1, obj2) {
  const result = { ...obj2 };
  for (const [key, value] of Object.entries(obj1)) {
    if (!(key in result)) {
      result[key] = value;
    }
  }
  return result;
}

if (require.main === module) {
  //   benchmark({ first: migrateRecord , second: migrateDB}, TESTCASES, 10000);
  console.log(migrateRecord({ username: "", posts: 0 }, { verified: true }));
}

module.exports = { migrateRecord, migrateDB };
