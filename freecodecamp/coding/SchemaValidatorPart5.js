/**
 * 
 * Schema Validator Part 5
Given an object (JavaScript) or dictionary (Python), determine if it matches the following schema:

Roles = "user" | "creator" | "moderator" | "staff" | "admin"

{
  username: string,
  posts: number,
  verified: boolean,
  role: Roles,
  supporter?: boolean,
  badges: string[]
}
The pipe (|) symbol means "or". role must be one of the listed Roles values.
The question mark (?) after supporter means that the field is optional, but is the specified type if it exists.
The brackets [] after string means that badges should be an array of strings (or empty).
Extra keys are allowed
 */


const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [[{ username: "gill", posts: 12, verified: false, role: "creator", supporter: false, badges: [ "early-adopter", "popular" ] }], true],
    [[{ username: "tonya", posts: 299, verified:true, role: "moderator", supporter: true, badges: [ "streak-master", "veteran" ], followers: 1233}], true],
    [[{ username: "zara", posts: 0, verified: false, role: "user", supporter: false, badges: [] }], true],
    [[{ username: "nicole", posts: 65, verified:true, role: "admin", supporter: false, badges: ["first-post", 18 ] }], false],
    [[{ username: "tim", posts: 25, verified: true, role: "staff", supporter: false }], false],
    [[{ username: "charlie", posts: 0, verified:false, role: "user", supporter: "no", badges: [ "first-post", "anniversary" ] }], false],
    [[{ username: "wanda", posts: 15, verified: true, role: "friend", supporter: true, badges: [ "popular" ] }], false],
    [[{ username: "guy", posts: 5, verified: "false", role: "staff", supporter: true, badges: [ "helper" ] }], false],
    [[{ username: "carrie", verified: true, role: "moderator", supporter: true, badges: [ "helper", "sharer" ] }], false],
    [[{ username: true, posts: 75, verified: true, role: "creator", supporter: true, badges: [ "veteran" ] }], false]
];


function isValidSchema(obj){
    const validRoles = new Set(["user", "creator", "moderator", "staff", "admin"]);

    return typeof obj === "object" && obj !== null &&
            typeof obj.username === "string" &&
            Number.isInteger(obj.posts) && // strict integer check
            typeof obj.verified === "boolean" &&
            validRoles.has(obj.role) &&
            (obj.supporter === "undefined" || typeof obj.supporter === "boolean") &&
            Array.isArray(obj.badges) &&
            obj.badges.every(b => typeof b === "string");

}


if(require.main === module){
    benchmark({"first": isValidSchema}, TESTCASES, 10000);
}


module.exports = { isValidSchema };