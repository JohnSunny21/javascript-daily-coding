/**
 * 
 * 
 * Matrix Rotate
Given a matrix (an array of arrays), rotate the matrix 90 degrees clockwise and return it. For instance, given [[1, 2], [3, 4]], which looks like this:

1	2
3	4
You should return [[3, 1], [4, 2]], which looks like this:

3	1
4	2

 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[[[1]]], [[1]]],
    [[[[1, 2], [3, 4]]], [[3, 1], [4, 2]]],
    [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [[7, 4,1], [8, 5, 2], [9, 6, 3]]],
    [[[[0, 1, 0], [1, 0, 1], [0, 0, 0]]], [[0, 1,0], [0, 0, 1], [0, 1, 0]]]
];



function rotate(matrix){
    const rows = matrix.length;
    const cols = matrix[0].length;

    const result = [];


    for(let col = 0; col < cols; col++){
        
        const newRow = [];

        for(let row = rows - 1; row >= 0; row--){
            newRow.push(matrix[row][col]);
        }

        result.push(newRow);
    }

    return result;
}


function rotateMatrix(matrix) {
    return matrix[0].map((_, col) =>
        matrix.map(row => row[col]).reverse()
    );
}
// The idea for the compact solution is to use the map method to iterate over the columns of the matrix,
//  and for each column, we create a new row by mapping over the rows of the matrix and selecting the element at the current column index.
//  Finally, we reverse the new row to achieve the 90-degree clockwise rotation.



if(require.main === module){
    benchmark({"first": rotate, "second": rotateMatrix}, TESTCASES, 10000);
}
