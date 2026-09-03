/**
 * 
 * 
 * Perfect Square
Given an integer, determine if it is a perfect square.

A number is a perfect square if you can multiply an integer by itself to achieve the number. For example, 9 is a perfect square because you can multiply 3 by itself to get it.
 */


const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [[9], true],
    [[49], true],
    [[1], true],
    [[2], false],
    [[99], false],
    [[-9], false],
    [[0], true],
    [[25281], true]
];


function isPerfectSquare(n){
    if(n < 0) return false;

    const root = Math.sqrt(n);

    return Number.isInteger(root);
}


function isPerfectSquare2(n){
    if(n < 0) return false;

    const root = Math.sqrt(n);

    return root % 1 === 0;
}


if(require.main === module){
    benchmark({"first": isPerfectSquare, "second": isPerfectSquare2}, TESTCASES, 10000);
}