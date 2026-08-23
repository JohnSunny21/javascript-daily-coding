/**
 * 
 * 
 * Missing Numbers
Given an array of integers from 1 to n, inclusive, return an array of all the missing integers between 1 and n (where n is the largest number in the given array).

The given array may be unsorted and may contain duplicates.
The returned array should be in ascending order.
If no integers are missing, return an empty array.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [[[1, 3, 5]], [2, 4]],
    [[[1, 2, 3, 4, 5]], []],
    [[[1, 10]], [2, 3, 4, 5, 6, 7, 8, 9]],
    [[[10, 1, 10, 1, 10, 1]], [2, 3, 4, 5, 6, 7, 8, 9]],
    [[[3, 1, 4, 1, 5, 9]], [2, 6, 7, 8]],
    [[[1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 6, 8, 9, 3, 2, 10, 7, 4]], [11]]
];



function findMissingNumbers(arr){
    const maxNum = Math.max(...arr);

    const seen = new Set(arr);

    const result = [];
    for(let i = 1; i <= maxNum; i++){
        if(!seen.has(i)){
            result.push(i);
        }
    }

    return result;
}

// Time : O(n + m) where n = input array length and m = largest number in the array
// Space: O(n)


function findMissingNumbers2(arr){
    const unique = [...new Set(arr)].sort((a, b) => a - b);
    const result = [];

    for(let i = 1; i < unique.length; i++){
        for(let j = unique[i - 1] + 1; j < unique[i]; j++){
            result.push(i);
        }
    }
    return result;
}

// Time: O(n log n)
// Space: O(n)



if(require.main === module){

    benchmark({"first": findMissingNumbers}, TESTCASES, 10000);
}
