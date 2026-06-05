/**
 * 
 * Parentheses Combinations
Given an integer, n, return the number of valid combinations of n pairs of parentheses.

A valid combination is a string where every opening parentheses has a corresponding closing parentheses, and no closing parentheses appears before its matching opening parentheses.
For example, given 2, there are 2 valid combinations:

(())
()()
 * 
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[2], 2],
    [[3], 5],
    [[5], 42],
    [[8], 1430],
    [[13], 742900]
];

function parenthesesCombinations(n) {

   function factorial(x) {
    return x <= 1 ? 1 : x * factorial( x - 1);
   }     
   
   function binomial(n, k){
    return factorial(n) / (factorial(k) * factorial(n - k));
   }

   return binomial(2 * n, n) / (n + 1);

}


function generateParentheses(n) {
    const result = [];

    function  backtrack(current, openCount, closeCount){

        if(openCount === n && closeCount === n){
            result.push(current);
            return;
        }

        if (openCount < n){
            backtrack(current + "(", openCount + 1, closeCount);
        }

        if(closeCount < openCount) {
            backtrack(current + ")", openCount, closeCount + 1);
        }


    }

    backtrack("", 0, 0);
    return result.length;
}

/**
 * The javascript doesn't have the math.comb as in the python
 * 
 * so we need to write our own helper function
 * 
 * The binomial function calculates the binomial coefficient C(n, k) = n! / (k! * (n - k)!)
 * here:
 * n = 2n (total number of parentheses)
 * k = n (number of opening parentheses)
 * 
 * so binomial(2*n, n) = same as math.comb(2*n, n) in python
 * 
 * Example for n = 2:
 * -> Total positions = 4 (two opens, two closes).
 * -> (4 2) = 6 (the number of ways to choose 2 positions for the opening parentheses).
 * -> Divide by (n + 1) = 3 to get the number of valid combinations = 2.
 * Result = 2 valid strings: "(())" and "()()".
 * 
 * => Binomial coefficient counts raw combinations.
 * -> Cataian number refines those combinations into valid balaned structures.
 * -> Python has math.comb which directly gives the binomial coefficient, while in javascript we need to implement it ourselves using factorials.
 * -> K is simply "how many items you're choosing" - in this problem , it's the number of open parentheses positions.
 * 
 */

if (require.main === module) {
    benchmark( { parenthesesCombinations, generateParentheses }, TESTCASES, 10000);
}

module.exports = { parenthesesCombinations, generateParentheses };