/**
 * 
 * String Zipper
Given two strings, return a new string that interleaves their characters one at a time. If one string is longer, append the remaining characters at the end.

Begin with the first character of the first string.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["abc", "123"], "a1b2c3"],
    [["acegikmoqsuwy", "bdfhjlnprtvxz"], "abcdefghijklmnopqrstuvwxyz"],
    [["day", "night"], "dnaiyght"],
    [["python", "javascript"], "pjyatvhaosncript"],
    [["feCdCm", "reoeap"], "freeCodeCamp"]
];


function zipStrings(a, b){
    let result = "";
    let n = Math.max(a.length, b.length);

    for(let i = 0; i< n; i++){
        if(i < a.length) result += a[i];
        if(i < b.length) result += b[i];
    }

    return result;
}

function zipStrings2(word1, word2){
    const A = word1.length, B = word2.length;

    let a = 0, b = 0;
    const s = [];

    let word = 1;
    while(a < A && b < B){
        if(word === 1){
            s.push(word1[a++]);
            word = 2;
        }else {
            s.push(word2[b++]);
            word = 1;
        }
    }

    while(a < A){
        s.push(word1[a++]);
    }

    while(b < B){
        s.push(word2[b++]);
    }

    return s.join("");
}



if(require.main === module){
    benchmark({"first": zipStrings, "second": zipStrings2}, TESTCASES, 10000);
}

module.exports = { zipStrings, zipStrings2 };