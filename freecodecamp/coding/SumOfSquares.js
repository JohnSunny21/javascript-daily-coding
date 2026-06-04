/**
 * 
 * Sum of Squares
Given a positive integer up to 1,000, return the sum of all the integers squared from 1 up to the number.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[5], 55],
    [[10], 385],
    [[25], 5525],
    [[500], 41791750],
    [[1000], 333833500]
];

//  Iterative Solution
function sumOfSquares(n){
    if(n < 0 || n > 1000){
        return "Invalid input";
    }

    let summ = 0;
    for(let i = 1; i <= n; i++){
        summ += i * i;
    }

    return summ;
}

// with the well known formula O(1) time, no loop needed.
function sumOfSquares2(n){

    return Math.floor(n * (n + 1) * (2 * n + 1) / 6);
}



if(require.main === module){
    benchmark({"first": sumOfSquares, "second": sumOfSquares2}, TESTCASES, 10000);
}

module.exports = { sumOfSquares, sumOfSquares2};