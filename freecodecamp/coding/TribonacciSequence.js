/***
 * 
 * Tribonacci Sequence
The Tribonacci sequence is a series of numbers where each number is the sum of the three preceding ones. When starting with 0, 0 and 1, the first 10 numbers in the sequence are 0, 0, 1, 1, 2, 4, 7, 13, 24, 44.

Given an array containing the first three numbers of a Tribonacci sequence, and an integer representing the length of the sequence, return an array containing the sequence of the given length.

Your function should handle sequences of any length greater than or equal to zero.
If the length is zero, return an empty array.
Note that the starting numbers are part of the sequence.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [[[0, 0, 1], 20], [0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927, 1705, 3136, 5768, 10609, 19513]],
    [[[21, 32, 43], 1], [21]],
    [[[0, 0, 1], 0], []],
    [[[10, 20, 30], 2], [10, 20]],
    [[[10, 20, 30], 3], [10, 20, 30]],
    [[[123, 456, 789], 8], [123, 456, 789, 1368, 2613, 4770, 8751, 16134]]
];



function tribonacciSequence(startSequence, length){
    if(length === 0) return [];

    for(let i = startSequence.length; i < length; i++){
        startSequence.push(startSequence[i - 1] +
            startSequence[i - 2] +
            startSequence[i - 3] // we can also use startSequence.at(i = 3); too using the at method.
        );
    }

    return startSequence.slice(0, length);
}



if(require.main === module){
    benchmark({"first": tribonacciSequence}, TESTCASES, 10000);
}