/**
 * 
 * 
 * Sum of Differences
Given an array of numbers, return the sum of the differences between each number and the one that follows it.

For example, given [1, 3, 4], return 3 (2 + 1).
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[[1, 3, 4]], 3],
    [[[5, -3, 3, 9, 10]], 5],
    [[[9, 6, 15, -20, 33, 14, 25, 16, -7]], -16],
    [[[50, 102, -46, 82, -49, 29, 71, 902, -237,111, -61, 75]], 25]
];


function sumOfDifferences(arr){
    let total = 0;
    for(let i = 0; i < arr.length - 1; i++){
        total += arr[i+1] - arr[i];
    }
    return total;
}

function sumOfDifferences2(arr){
    if(arr.length === 0){
        return 0;
    }

    return arr.at(-1) - arr.at(0);
}


if(require.main === module){
    benchmark({"first": sumOfDifferences, "second": sumOfDifferences2}, TESTCASES, 10000);
}


module.exports = { sumOfDifferences , sumOfDifferences2 };