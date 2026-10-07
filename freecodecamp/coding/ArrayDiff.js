/***
 * 
 * Array Diff
Given two arrays with strings values, return a new array containing all the values that appear in only one of the arrays.

The returned array should be sorted in alphabetical order.
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[["apple", "banana"], ["apple", "banana", "cherry"]], ["cherry"]],
    [[["apple", "banana", "cherry"], ["apple", "banana"]], ["cherry"]],
    [[["one", "two", "three", "four", "six"], ["one", "three", "eight"]], ["eight", "four", "six", "two"]],
    [[["two", "four", "five", "eight"], ["one", "two", "three", "four", "seven", "eight"]], ["five", "one", "seven", "three"]],
    [[["I", "like", "freeCodeCamp"], ["I", "like", "rocks"]], ["freeCodeCamp", "rocks"]]
];


function arrayDiff(arr1, arr2){
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    return [
        ...arr1.filter(word => !set2.has(word)),
        ...arr2.filter(word => !set1.has(word))
    ].sort();
}

// Time complexity: O(n + m) where n is the length of arr1 and m is the length of arr2.
// Space Complexity: O(n + m) where n is the length of arr1 and m is the length of arr2.
// we use two sets to store the unique values from each array, and then filter the original arrays to find the values that are not present in the other set. Finally, we concatenate the two filtered arrays and sort the result.

function arrayDiff2(arr1, arr2){
    const freq = {};

    for(const word of arr1){
        freq[word] = (freq[word] || 0 ) + 1;
    }

    for(const word of arr2){
        freq[word] = (freq[word] || 0 ) + 1;
    }

    return Object.keys(freq).filter(word => freq[word] === 1)
    .sort();
}

// Time Complexity: O(n + m) where n is the length of arr1 and m is the lenght of arr2. We iterate through both arrays to build the frequency object, and then we iterate through the keys of the object to filter out the unique values.
// Space Complexity: O(n + m) where n is the length of arr1 and m is the length of arr2. We use an object to store the frequency of each word, which can have at most n + m unique keys.

if(require.main === module){
    benchmark({"first": arrayDiff, "second": arrayDiff2}, TESTCASES, 10000);
}