/**
 * 
 * 
 * CSV Header Parser
Given the first line of a comma-separated values (CSV) file, return an array containing the headings.

The first line of a CSV file contains headings separated by commas.
Remove any leading or trailing whitespace from each heading.
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["name,age,city"], ["name", "age", "city"]],
    [["first name,last name,phone"], ["first name", "last name", "phone"]],
    [["username , email , signup date "], ["username", "email", "signup date"]]
];


function getHeadings(csv){
    return csv.split(",").map(header => header.trim());
}


if(require.main === module){
    benchmark({"first": getHeadings}, TESTCASES, 10000);
}