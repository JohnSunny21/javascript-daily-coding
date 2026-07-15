/**
 * 
 * 
 * Array Chunks
Given an array and a chunk size, return the array split into sub-arrays of that size.

The last chunk may be smaller if the array doesn't divide evenly.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [[1, 2, 3, 4, 5, 6], 3],
    [
      [1, 2, 3],
      [4, 5, 6],
    ],
  ],
  [
    [[1, "two", 3, "four", 5, "six", 7, "eight"], 2],
    [
      [1, "two"],
      [3, "four"],
      [5, "six"],
      [7, "eight"],
    ],
  ],
  [
    [[1, 2, 3, 4, 5], 3],
    [
      [1, 2, 3],
      [4, 5],
    ],
  ],
  [
    [["a", "b", "c", "d", "e"], 1],
    [["a"], ["b"], ["c"], ["d"], ["e"]],
  ],
  [[[1, 2, 3], 5], [[1, 2, 3]]],
];

function chunkArray(arr, size) {
  const newArray = [];

  while (arr.length > 0) {
    newArray.push(arr.slice(0, size));
    arr = arr.slice(size);
  }

  return newArray;
}


function arrayChunks(arr, size){
    if(size <= 0) throw new Error("Chunk size must be positive");
    const result = [];

    for(let i = 0; i < arr.length; i += size){
        result.push(arr.slice(i, i+size));
    }

    return result;
}




if (require.main === module) {
  benchmark({ first: chunkArray, second: arrayChunks }, TESTCASES, 10000);
}

module.exports = { chunkArray };
