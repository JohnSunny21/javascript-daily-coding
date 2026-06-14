/**
 * 
 * Credit Card Validator
Given a string of digits for a credit card number, determine if it's a valid card number using the following method:

Starting from the second-to-last digit, double every other digit moving left.
If doubling a digit results in a number greater than 9, subtract 9.
Sum all the digits (doubled and undoubled).
If the total is divisible by 10, the number is valid.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["4532015112830366"], true],
    [["5425233430109903"], true],
    [["371449635398431"], true],
    [["6011111111111117"], true],
    [["4532015112830367"], false],
    [["1234567890123456"], false],
    [["4532015112830368"], false]
];


function isValidCard(number){

    let doubled = 0;
    let undoubled = 0;

    for(let i = number.length - 2; i >= 0; i= i - 2){
        let doubleDigit = parseInt(number[i], 10) * 2;
        if(doubleDigit > 9){
            doubleDigit -= 9;
        }
        doubled += doubleDigit;
    }


    for(let i = number.length - 1; i >= 0; i = i - 2){
        undoubled += parseInt(number[i], 10);
    }

    const totalSum = doubled + undoubled;

    return totalSum % 10 === 0;

}


function creditCardValidator(cardNumber){
    // Remove spaces or dashes if any
    cardNumber = cardNumber.replace(/[\s-]/g, "");

    const digits = cardNumber.split("").map(Number);

    for(let i = digits.length - 2; i >= 0; i = i - 2){
        let doubled = digits[i] * 2;
        if(doubled > 9) doubled -= 9;
        digits[i] = doubled;
    }

    const total = digits.reduce((sum, num) => sum + num , 0);
    return total % 10 === 0;
}

if(require.main === module){
    benchmark({"first": isValidCard, "second": creditCardValidator}, TESTCASES, 10000);
}

module.exports = { isValidCard , creditCardValidator};