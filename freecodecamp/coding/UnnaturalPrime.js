/**
 * 
 * Unnatural Prime
Given an integer, determine if that number is a prime number or a negative prime number.

A prime number is a positive integer greater than 1 that is only divisible by 1 and itself.
A negative prime number is the negative version of a positive prime number.
1 and 0 are not considered prime numbers.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[1], false],
    [[-1], false],
    [[19], true],
    [[-23], true],
    [[0], false],
    [[97], true],
    [[-61], true],
    [[99], false],
    [[-44], false]
];


function isPrime(n){
    if(n <= 1){
        return false;
    }

    for(let i = 2; i <= Math.floor(n ** 0.5) + 1; i++){
        if(n % i === 0){
            return false;
        }
    }

    return true;
}

function isUnnaturalPrime(n){

    return isPrime(Math.abs(n));
}

function isUnnaturalPrime2(n){

    // 0 and 1 are not prime
    if(n === 0 || n === 1 || n === -1) return false;

    // work with absolute value for primality check
    const absN = Math.abs(n);

    // Prime numbers must be greater than 1
    if(absN <= 1) return false;

    // check divisibility up to sqrt(n)
    // This avoids the extra + 1 and still correctly divisors up to the square root.
    for(let i = 2; i <= Math.sqrt(absN); i++){
        if(absN % i === 0) return false;

    }
    return true;
}



if(require.main === module){
    benchmark({"first": isUnnaturalPrime, "second": isUnnaturalPrime2}, TESTCASES, 10000);
}


module.exports = { isUnnaturalPrime , isUnnaturalPrime2};