/**
 * 
 * Slug Generator
Given a string, return a URL-friendly version of the string using the following constraints:

All letters should be lowercase.
All characters that are not letters, numbers, or spaces should be removed.
All spaces should be replaced with the URL-encoded space code %20.
Consecutive spaces should be replaced with a single %20.
The returned string should not have leading or trailing %20.
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["helloWorld"], "helloworld"],
    [["hello world!"], "hello%20world"],
    [[" hello-world "], "helloworld"],
    [["hello  world"], "hello%20world"],
    [["  ?H^3-1*1]0! W[0%R#1]D  "], "h3110%20w0r1d"]
];


function generateSlug(str){
    return str.toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "%20");
}



if(require.main === module){
    benchmark({"first": generateSlug}, TESTCASES, 10000);
}