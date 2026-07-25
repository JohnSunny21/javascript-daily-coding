/**
 * 
 * 
 * Cell Signal
Given a grid containing three cell tower readings, determine the location of the phone.

Each cell in the grid is either 0 (no tower) or a positive integer representing the number of cells to the phone, measured in a straight line: horizontal, vertical, or diagonal.
Return the [row, col] of the cell that is the correct number of cells from all three towers.
There is always exactly one solution.
 */


const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [[[[0, 0, 1], [0, 1, 0], [0, 0, 1]]], [1, 2]],
    [[[[0, 2, 0], [1, 0, 0], [0, 0, 1]]], [2, 1]],
    [[[[0, 0, 2, 0], [0, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 1]]], [2, 2]],
    [[[[0, 3, 0, 0, 0], [0, 0, 0, 0, 2], [0, 0, 0,0, 0], [4, 0, 0, 0, 0], [0, 0, 0, 0, 0]]], [3, 4]],
    [[[[3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0,0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 2]]], [3, 3]]
];


function findSignal(grid){
    const rows = grid.length;
    const cols = grid[0].length;


    const towers = [];
    
    // Step 1: Collect tower positions and their values.
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if(grid[r][c] > 0){
                towers.push([r, c, grid[r][c]]);
            }
        }
    }

    // Step 2: Check every cell as a candidate phone location

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if(grid[r][c] === 0){ // Phone cannot be on a tower
                let valid = true;

                for(const [tr, tc, dist] of towers){

                    const d = Math.max(Math.abs(r - tr), Math.abs(c - tc));
                    if(d != dist){
                        valid = false;
                        break;
                    }
            
                }
                if(valid) return [r, c];
            }
        }
    }
}


if(require.main === module){
    benchmark({first: findSignal}, TESTCASES, 10000);
}


module.exports = { findSignal };