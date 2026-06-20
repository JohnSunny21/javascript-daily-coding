/**
 * 
 * Prime Factorization
Given an integer greater than 1, return its prime factorization as an array of numbers in ascending order.

A prime factorization is the set of prime numbers that multiply together to produce the given integer. Each number has exactly one set. For example, the prime factorization of 20 is [2, 2, 5] because 2 * 2 * 5 = 20.

If the given integer is itself prime, return it in a single-element array.
 * 
 */




const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[20], [2, 2, 5]],
    [[17], [17]],
    [[15], [3, 5]],
    [[35], [5, 7]],
    [[999], [3, 3, 3, 37]],
    [[360], [2, 2, 2, 3, 3, 5]],
    [[510510], [2, 3, 5, 7, 11, 13, 17]]
];


function primeFactorization(n){
    const factors = [];
    let divisor = 2;

    while(n > 1){
        while(n % divisor === 0){
            factors.push(divisor);
            n = n / divisor;
        }
        divisor++;
    }
    return factors;
}

/**
 * This is a trial division algorithm.
 * it's simple and works fine for moderate integers.
 * For very large numbers, optimizations include:
 *  -> Only checking divisors up to root n.
 *  -> Skipping even number after shown below.
 */


function primeFactorization2(n){
    const factors = [];

    while(n % 2 === 0){
        factors.push(2);
        n = n / 2;
    }

    let divisor = 3;
    // Check odd divisors up to sqrt(n)
    while(divisor <= Math.floor(Math.sqrt(n))){
        while(n % divisor === 0){
            factors.push(divisor);
            n = n / divisor;
        }
        divisor += 2; // Skip even numbers
    }


    // If n is still > 1, it's prime
    if (n > 1){
        factors.push(n);
    }

    return factors;
}




if(require.main === module){
    benchmark({"first": primeFactorization, "second": primeFactorization2}, TESTCASES, 10000);
}

module.exports = { }