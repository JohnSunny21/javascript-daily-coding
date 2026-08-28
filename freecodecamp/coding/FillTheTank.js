/**
 * 
 * 
 * Fill The Tank
Given the size of a fuel tank, the current fuel level, and the price per gallon, return the cost to fill the tank all the way.

tankSize is the total capacity of the tank in gallons.
fuelLevel is the current amount of fuel in the tank in gallons.
pricePerGallon is the cost of one gallon of fuel.
The returned value should be rounded to two decimal places in the format: "$d.dd".
 */

const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [[20, 0, 4.00], "$80.00"],
    [[15, 10, 3.50], "$17.50"],
    [[18, 9, 3.25], "$29.25"],
    [[12, 12, 4.99], "$0.00"],
    [[15, 9.5, 3.98], "$21.89"]
];


function costToFill(tankSize, fuelLevel, pricePerGallon){
    const gallonsNeeded = tankSize - fuelLevel;
    const cost = gallonsNeeded * pricePerGallon;

    return `$${cost.toFixed(2)}`;
}



if(require.main === module){
    benchmark({"first": costToFill}, TESTCASES, 10000);
}

