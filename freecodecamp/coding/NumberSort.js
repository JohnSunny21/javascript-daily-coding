/**
 * 
 * 
 * Number Sort
Given a string of numbers separated by commas, return an array of the numbers sorted from smallest to largest.
 */


const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [["3,1,2"], [1, 2, 3]],
    [["5,3,8,1,9,2"], [1, 2, 3, 5, 8, 9]],
    [["12,61,49,80,19,50,77,38"], [12, 19, 38, 49, 50, 61, 77, 80]],
    [["0,6,-19,44,-2,7,0"], [-19, -2, 0, 0, 6, 7, 44]]
];


function sortNumbers(str){

    return str.split(",").map(Number).sort((a, b) => a - b);
}


function numberSort(str){
    
    const nums = str.split(",").map(x => parseInt(x.trim(), 10));

    nums.sort((a, b) => a - b);

    return nums;
}

/**
 * => Always convert the numbers before sorting.
 * => If you sort strings directly, "10" would come before "2" (lexicographic order).
 * => Using int() in Python or parseInt() in JS ensures proper numeric sorting.
 * => Trimming whitespace avoids issues with " 3" or "4 ".
 * 
 * => both solutions avoid the common pitfall of lexicographic sorting ("10" before "2").
 * => they handle whitespae-free inputs correctly, If you want to be extra robust against " 3" or "4 ",
 *    you could add .strip() in Python or .trim() in js before conversion.
 */




if(require.main === module){
    benchmark({"first": sortNumbers, "second": numberSort}, TESTCASES, 10000);
}

module.exports = { sortNumbers , numberSort};