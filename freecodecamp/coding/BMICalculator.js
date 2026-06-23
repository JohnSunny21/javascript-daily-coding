/**
 * 
 * 
 * BMI Calculator
Given a weight in pounds and a height in inches, return the BMI (Body Mass Index) rounded to one decimal place.

To get BMI: divide the weight by the height squared, then multiply the result by 703.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[180, 70], 25.8],
    [[140, 64], 24.0],
    [[160, 76], 19.5],
    [[200, 60], 39.1],
    [[150, 68], 22.8]
];

function calculateBmi(weight, height){
    
    return Number(((weight / height ** 2) * 703).toFixed(1));
}


function bmi(weight, height){
    const bmiValue = (weight / (height ** 2)) * 703;
    return Number(bmiValue.toFixed(1));
}




if(require.main === module){
    benchmark({"first": calculateBmi, "second": bmi}, TESTCASES, 10000);
}

module.exports = { calculateBmi, bmi };