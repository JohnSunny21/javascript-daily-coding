/**
 * 
 * 
 * 
 * Roman Numeral Parser
Given a string representing a Roman numeral, return its integer value.

Roman numerals consist of the following symbols and values:

Symbol	Value
I	1
V	5
X	10
L	50
C	100
D	500
M	1000
Numerals are read left to right. If a smaller numeral appears before a larger one, the value is subtracted. Otherwise, values are added.
 */


const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [["III"], 3],
    [["IV"], 4],
    [["XXVI"], 26],
    [["XCIX"], 99],
    [["CDLX"], 460],
    [["DIV"], 504],
    [["MMXXV"], 2025]
];



const values = {
I: 1,
V: 5,
X: 10,
L: 50,
C: 100,
D: 500,
M: 1000
};

function parseRomanNumeral(numeral){

    let total = 0

    for(let i = 0; i < numeral.length; i++){
        const current = values[numeral[i]];
        const next = values[numeral[i + 1]];

        if(current < next){
            total -= current;
        }else{
            total += current;
        }
    }

    return total;

}



if(require.main === module){
    benchmark({"first": parseRomanNumeral}, TESTCASES, 10000);
}