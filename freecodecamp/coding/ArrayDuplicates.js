/**
 * 
 * 
 * Array Duplicates
Given an array of integers, return an array of integers that appear more than once in the initial array, sorted in ascending order. If no values appear more than once, return an empty array.

Only include one instance of each value in the returned array.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[[1, 2, 3, 4, 5]], []],
    [[[1, 2, 3, 4, 1, 2]], [1, 2]],
    [[[2, 34, 0, 1, -6, 23, 5, 3, 2, 5, 67, -6, 23, 2, 43, 2, 12, 0, 2, 4, 4]], [-6, 0, 2, 4, 5, 23]]
];


function findDuplicates(arr){

    const newArr = [];


    for(let i = 0; i < arr.length; i++){
        if(i < arr.length - 1 && arr.slice(i + 1).includes(arr[i]) && !newArr.includes(arr[i])){
            newArr.push(arr[i]);
        }
    }

    return newArr.sort((a, b) => a - b);
}
/**
 * 
 * The above solution will be O(n^2) in time complexity because of the nested loop created by the slice and includes methods. 
 * We can optimize it to O(n) using a Set to track seen numbers and duplicates.
 */

function findDuplicates2(arr){

    const seen = new Set();

    const duplicates = new Set();


    for(const num of arr){
        if(seen.has(num)){
            duplicates.add(num);
        }else{
            seen.add(num);
        }
    }

    // or we can write [...duplicates].sort((a, b) => a - b);
    return Array.from(duplicates).sort((a, b) => a - b);
}

if (require.main === module){
    benchmark({"first": findDuplicates}, TESTCASES, 10000);
}

