/***
 * 
 * 
 * Schema Validator Part 1
Given an object (JavaScript) or dictionary (Python), determine if it matches the following schema:

{
  username: string
}
Extra keys are allowed
 */



const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[{ username: "bob" }], true],
    [[{ username: "jen", posts: 30 }], true],
    [[{ username: "" }], true],
    [[{ username: 7 }], false],
    [[{ posts: 25 }], false]
];


function isValidSchema(obj){

    return typeof obj === "object" && obj !== null && typeof obj.username === "string";

}

function validateSchema(obj){
    // check if 'username' exists and is a string.

    return typeof obj.username === "string";
}




if (require.main === module){
    benchmark({isValidSchema, validateSchema}, TESTCASES, 10000);
}

module.exports = { isValidSchema, validateSchema };