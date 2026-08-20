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



if(require.main === module){
    benchmark({"first": arrayDiff}, TESTCASES, 10000);
}