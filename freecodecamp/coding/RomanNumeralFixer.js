/**
 * 
 * Roman Numeral Fixer
Given a string of malformed Roman numerals, return the value in standard Roman numeral notation.

The input will only use additive notation, so each symbol adds its value to the total. As a reminder, here are the symbols and values:

Symbol	Value
"I"	1
"V"	5
"X"	10
"L"	50
"C"	100
"D"	500
"M"	1000
When re-encoding, use the largest possible symbol at each step, using subtractive pairs ("IV", "IX", "XL", "XC", "CD", "CM") where needed.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["XIIIII"], "XV"],
    [["IIIILX"], "LXIV"],
    [["XXVVVIIIII"], "XL"],
    [["MDCCLXXXXVIIII"], "MDCCXCIX"],
    [["IIIIVVVVXXXXLLLLCCDD"], "MCDLXIV"],
    [["ILCDMIVDIIXLCVCXDL"], "MMCMLXXXIV"]
];

function romanToInt(s) {
    const values = { I:1, V: 5, X: 10, L:50, C:100, D:500, M: 1000};

    return [...s].reduce((sum, ch) => sum + values[ch], 0);
}


function intToRoman(num){
    const mapping = [
        [1000,  "M"], [900, "CM"], [500, "D"], [400, "CD"], 
        [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
        [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];


    let result = [];
    for(const [val, sym] of mapping){
        while(num >= val){
            result.push(sym);
            num -= val;
        }
    }
    return result.join("");
}
function fixNumerals(str){
    return intToRoman(romanToInt(str));
}


if(require.main === module){
    benchmark({"first": fixNumerals}, TESTCASES, 10000);
}


module.exports = { fixNumerals };