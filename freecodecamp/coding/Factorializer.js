/**
 * 
 * Factorializer
Given an integer from zero to 20, return the factorial of that number. The factorial of a number is the product of all the numbers between 1 and the given number.

The factorial of zero is 1.
 */


const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [[0], 1],
    [[5], 120],
    [[20], 2432902008176640000]
];


function factorial(n){
    if ( n > 20){
        return "Invalid Number";
    }

    if(n <= 1) return 1;

    return n * factorial(n - 1);
}

function factorial2(n){
    if(n === 0) return 1;

    let result = 1;
    for(let i = 1; i <= n ; i++){
        result *= i;
    }

    return result;
}

// iterative approach avoids recursion depth issues. Time Complexity : O(n).

// Right now, factorial(-5) would also return 1 because of if (n <= 1) return 1
// if you want stricter input validation, you could write:
function factorial3(n){
    if(n < 0 || n > 20){
        return "Invalid Number";
    }

    if(n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// This way, negative inputs are explicitly rejected.


if(require.main === module){
    benchmark({ "first": factorial, "second": factorial2, "third": factorial3}, TESTCASES, 10000);
}


module.exports = { factorial, factorial2, factorial3 };