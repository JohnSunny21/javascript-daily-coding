/**
 * 
 * 2nd Largest
Given an array, return the second largest distinct number.
 */


const { benchmark } = require("./utils/benchmark");




const TESTCASES = [
    [[[1, 2, 3, 4]], 3],
    [[[20, 139, 94, 67, 31]], 94],
    [[[2, 3, 4, 6, 6]], 4],
    [[[10, -17, 55.5, 44, 91, 0]], 55.5],
    [[[1, 0, -1, 0, 1, 0, -1, 1, 0]], 0]
];


function secondLargest(arr){
    const unique = [...new Set(arr)];

    unique.sort((a, b) => b - a);

    return unique[1];
}

function secondLargest2(arr){
    let largest = -Infinity;
    let second = -Infinity;

    for(let num of arr){
        if (num > largest){
            second = largest;
            largest = num;
        }else if(num > second && num != largest){
            second = num;
        }
    }

    return second;
}

function secondLargest3(arr){
    return [...new Set(arr)].sort((a, b) => b - a)[1];
}


if(require.main === module){

    benchmark({"first": secondLargest, "second": secondLargest2, "third": secondLargest3}, TESTCASES, 10000);
}