/**
 * 
 * Pizza Party
Given an array of hours worked today per person, return the number of pizzas to order for a pizza party.

Divide each person's hours worked by 3 to get their slice count.
You can't eat a partial slice, so round each person's slice count up to the nearest whole number.
Each person gets a minimum of two slices.
Each pizza has 8 slices. Round the total number of pizzas up to the nearest whole pizza.
 */

const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [[[8, 8, 8]], 2],
    [[[10, 9, 8, 2, 2, 6, 10]], 3],
    [[[1, 2, 3, 4, 5]], 2],
    [[[8, 8, 8, 8, 8, 8, 8, 8]], 3],
    [[[9, 9, 6]], 1],
    [[[10, 12, 16, 9, 8, 11, 15, 8, 0]], 5]
];


function getPizzasToOrder(hoursWorked){
    let totalSlices = 0;

    for(let h of hoursWorked){
        let slices = Math.ceil(h / 3);
        slices = Math.max(slices, 2);
        totalSlices += slices;
    }

    return Math.ceil(totalSlices / 8);
}


if(require.main === module){
    benchmark({"first": getPizzasToOrder}, TESTCASES, 10000);
}

module.exports = { getPizzasToOrder };