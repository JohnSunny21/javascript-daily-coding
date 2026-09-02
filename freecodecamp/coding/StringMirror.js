/**
 * 
 * 
 * String Mirror
Given two strings, determine if the second string is a mirror of the first.

A string is considered a mirror if it contains the same letters in reverse order.
Treat uppercase and lowercase letters as distinct.
Ignore all non-alphabetical characters.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["helloworld", "helloworld"], false],
    [["Hello World", "dlroW olleH"], true],
    [["RaceCar", "raCecaR"], true],
    [["RaceCar", "RaceCar"], false],
    [["Mirror", "rorrim"], false],
    [["Hello World", "dlroW-olleH"], true],
    [["Hello World", "!dlroW !olleH"], true]
];


function isMirror(str1, str2){
  const first = str1.replace(/[^a-zA-Z]/g, "");
  const second = str2.replace(/[^a-zA-Z]/g, "");

  const reversed = first.split("").reverse().join("");

  return reversed === second;
}



if(require.main === module){
    benchmark({"first": isMirror}, TESTCASES, 10000);
}