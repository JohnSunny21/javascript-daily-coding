/**
 * 
 * 
 * Kaprekar's Routine
Given a 4-digit number, return the number of times you need to apply Kaprekar's routine until reaching 6174.

Kaprekar's routine works as follows:

Arrange the digits in descending order to form the largest number
Arrange the digits in ascending order to form the smallest number (pad with leading zeros if necessary)
Subtract the smaller from the larger
Repeat with the new number
 */


const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [[1234], 3],
    [[2025], 6],
    [[7173], 4],
    [[3164], 7],
    [[8082], 2]
];


function kaprekar(num){
    const digits = num.toString().padStart(4, "0");
    if(new Set(digits).size === 1) return "Invalid input";


    let count = 0;

    while(num !== 6174 && count < 10){
        const digits = num.toString().padStart(4, "0").split("");

        const desc = parseInt(digits.slice().sort((a, b) => b - a).join(""), 10);
        const asc = parseInt(digits.slice().sort((a, b) => a - b).join(""), 10);
        num = desc - asc;
        count++;
    }

    return num === 6174 ? count : "Invalid input";
}
/**
 * 
 * => Valid numbers converage to 6174 in <= 7 steps.
 * => Invalid numbers (all digits equal) collapse to 0000 and loop forever.
 * => Adding a pre-check or iteration cap prevents infinite loops.
 */


if(require.main === module){
    benchmark({first: kaprekar}, TESTCASES, 10000);
}


module.exports = { kaprekar };