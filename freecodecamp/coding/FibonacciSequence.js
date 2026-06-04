/***
 * 
 * Fibonacci Sequence
The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones. When starting with 0 and 1, the first 10 numbers in the sequence are 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.

Given an array containing the first two numbers of a Fibonacci sequence, and an integer representing the length of the sequence, return an array containing the sequence of the given length.

Your function should handle sequences of any length greater than or equal to zero.
If the length is zero, return an empty array.
Note that the starting numbers are part of the sequence.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[[0, 1], 20], [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]],
    [[[21, 32], 1], [21]],
    [[[0, 1], 0], []],
    [[[10, 20], 2], [10, 20]],
    [[[123456789, 987654321], 5], [123456789, 987654321, 1111111110, 2098765431, 3209876541]]
];


function fibonacciSequence(startSequence, length){
   if(length === 0){
    return [];
   } 

   for(let i = startSequence.length; i < length; i++){
    startSequence.push(startSequence.at(i-1) + startSequence.at(i - 2));
   }
   return startSequence.slice(0, length);
}
/**
 * 
 * The above function mutates the startSequence array directly and then slilces it.
 * Both versions are correct.
 * This approach is shorter and leverages .at()
 * The next version avoids mutating the inuput array (saafe if you reuse startSequence elsewhere).
 * 
 * This solution is correct, concise, and efficient. The only trade-off is that it mutates the input array, which is fine 
 * in this context but something to keep in mind for reuse.
 */


function fibonaciSequenceTwo(start, length){
    if(length === 0) return [];
    if (length === 1) return [start[0]];
    if(length === 2) return [start[0], start[1]];

    const seq = [start[0], start[1]];

    while (seq.length < length){
        const next = seq[seq.length - 1] + seq[seq.length - 2];
        seq.push(next);
    }

    return seq;
}
/**
 * 
 * The above function handles edge cases (length = 0, 1, 2) explicitly.
 * Works with any starting pair (not just [0, 1]).
 */


if (require.main === module){
    benchmark({fibonacciSequence, fibonaciSequenceTwo}, TESTCASES, 10000);
}


module.exports = {fibonacciSequence};