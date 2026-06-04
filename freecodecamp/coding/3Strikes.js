/**
 * 
 * 3 Strikes
Given an integer between 1 and 10,000, return a count of how many numbers from 1 up to that integer whose square contains at least one digit 3.
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[1], 0],
    [[10], 1],
    [[100], 19],
    [[1000], 326],
    [[10000], 4531]
];


function squaresWithThree(n){

    if(n < 1 || n > 10000){
        return "Invalid input";
    }
    let count = 0;

    for(let i = 1; i < n; i++){
        let dig = String(i * i);
        // or we can use dig.includes("3");
        if(dig.split("").includes("3")){
            count++;
        }
    }
    return count;
}



if(require.main === module){
    benchmark({"first": squaresWithThree}, TESTCASES, 10000);
}




module.exports = { squaresWithThree };