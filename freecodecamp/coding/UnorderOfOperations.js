/**
 * 
 * Unorder of Operations
Given an array of integers and an array of string operators, apply the operations to the numbers sequentially from left-to-right. Repeat the operations as needed until all numbers are used. Return the final result.

For example, given [1, 2, 3, 4, 5] and ['+', '*'], return the result of evaluating 1 + 2 * 3 + 4 * 5 from left-to-right ignoring standard order of operations.

Valid operators are +, -, *, /, and %.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[[5, 6, 7, 8, 9], ['+', '-']], 3],
    [[[17, 61, 40, 24, 38, 14], ['+', '%']], 38],
    [[[20, 2, 4, 24, 12, 3], ['*', '/']], 60],
    [[[11, 4, 10, 17, 2], ['*', '*', '%']], 30],
    [[[33, 11, 29, 13], ['/', '-']], -2]
]

function evaluate(numbers, operators){
    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++){
        const op = operators[(i - 1) % operators.length];
        const num = numbers[i];

        switch(op) {
            case "+":
                result += num;
                break;
            case "-":
                result -= num;
                break;
            case "*":
                result *= num;
                break;
            case "/":
                result /= num;
                break;
            case "%":
                result %= num;
                break;
            default:
                throw new Error("Invalid operator: " + op);
        }
    }

    return result;
}


if(require.main === module){
    benchmark({"first": evaluate}, TESTCASES, 10000);
}

module.exports = { evaluate };
