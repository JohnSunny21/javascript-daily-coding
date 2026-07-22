/**
 * 
 * Piggy Bank
Given an object representing a piggy bank, return the total value as a string formatted as "$D.CC".

The object may contain any of the following:

Coin	Value
pennies	$0.01
nickels	$0.05
dimes	$0.10
quarters	$0.25

 */

const { benchmark } = require("./utils/benchmark")


const TESTCASES = [
    [[{ pennies: 3, nickels: 5, dimes: 2, quarters:6 }], "$1.98"],
    [[{ pennies: 1, nickels: 1, dimes: 1, quarters:1 }], "$0.41"],
    [[{ nickels: 8, dimes: 6, quarters: 5 }], "$2.25"],
    [[{}], "$0.00"],
    [[{ pennies: 146, nickels: 11, dimes: 0, quarters: 19 }], "$6.76"]
];


function piggyBank(coins){

    let total = 0;

    const piggyBank = {
        "pennies": 0.01,
        "nickels": 0.05,
        "dimes": 0.10,
        "quarters": 0.25
    }

    for(const coin in coins){
        total += coins[coin] * piggyBank[coin];
    }

    return `$${total.toFixed(2)}`;
}



if(require.main === module){
    benchmark({"first": piggyBank}, TESTCASES, 10000);
}


module.exports = { piggyBank };