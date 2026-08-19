/**
 * 
 * 
 * Unique Characters
Given a string, determine if all the characters in the string are unique.

Uppercase and lowercase letters should be considered different characters.
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["abc"], true],
    [["aA"], true],
    [["QwErTy123!@"], true],
    [["~!@#$%^&*()_+"], true],
    [["hello"], false],
    [["freeCodeCamp"], false],
    [["!@#*$%^&*()aA"], false]
];


function allUnique(str) {
  const unique = new Set(str);
  return unique.size === str.length;
}
// Time complexity : O(n) where n is the length of the string. We iterate through the string once to add each character to the set, and checking the size of the set is a constant time operation.
// Space complexity: O(n) where n is the length of the string. In the worst case, all characters in the string are unique, and we store them in the set.

function allUnique2(str){
    const seen = {};

    for(const char of str){
        if(seen[char]){
            return false; // early exit;
        }
        seen[char] = true;
    }

    return true;
}
/**
 * Instead of comparing size, i try to detect the first duplicate immediately.
 * The first solution processes the entire string and then compares the size of the set in the end, 
 * while the second solution uses an object to keep track of seen characters and returns false as soon as a duplicate is found.
 */

function allUnique3(str){
    return str.split("").sort().every((char, index, arr) => index === 0 || char !== arr[index - 1]);
}

if(require.main === module){
    benchmark({"first": allUnique, "second": allUnique2, "third": allUnique3}, TESTCASES, 10000);
}