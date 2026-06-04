/**
 * 
 * Base Check
Given a string representing a number, and an integer base from 2 to 36, determine whether the number is valid in that base.

The string may contain integers, and uppercase or lowercase characters.
The check should be case-insensitive.
The base can be any number 2-36.
A number is valid if every character is a valid digit in the given base.
Example of valid digits for bases:
Base 2: 0-1
Base 8: 0-7
Base 10: 0-9
Base 16: 0-9 and A-F
Base 36: 0-9 and A-Z
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["10101", 2], true],
    [["10201", 2], false],
    [["76543210", 8], true],
    [["9876543210", 8], false],
    [["9876543210", 10], true],
    [["ABC", 10], false],
    [["ABC", 16], true],
    [["Z", 36], true],
    [["ABC", 20], true],
    [["4B4BA9", 16], true],
    [["5G3F8F", 16], false],
    [["5G3F8F", 17], true],
    [["abc", 10], false],
    [["abc", 16], true],
    [["AbC", 16], true],
    [["z", 36], true]
];

function isValidNumber(n, base){
    if (n.length === 0) return false;
    const baseChart = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // const validSet = new Set(baseChart.slice(0, base));
    n = n.toUpperCase();

    for(let dig of n){
        if(!baseChart.slice(0, base).includes(dig)){
            return false;
        }
    }
    return true;
}


// This has a performance issue instead of slicing and checking .includes() for every character, you cuold precompute the valid set once and 
// use a Set for O(1) lookups

function baseCheck(numStr, base){
    if(numStr.length === 0) return false;
    const s = numStr.toUpperCase();

    const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base);

    for(let ch of s){
    if(!validChars.includes(ch)){
        return false;
    }
}
    return true;
}





if (require.main === module) {
    benchmark({ isValidNumber, baseCheck}, TESTCASES, 10000);
}

module.exports = { isValidNumber, baseCheck};