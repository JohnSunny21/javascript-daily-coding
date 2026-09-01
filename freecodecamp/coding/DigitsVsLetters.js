/**
 * 
 * 
 * Digits vs Letters
Given a string, return "digits" if the string has more digits than letters, "letters" if it has more letters than digits, and "tie" if it has the same amount of digits and letters.

Digits consist of 0-9.
Letters consist of a-z in upper or lower case.
Ignore any other characters.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["abc123"], "tie"],
    [["a1b2c3d"], "letters"],
    [["1a2b3c4"], "digits"],
    [["abc123!@#DEF"], "letters"],
    [["H3110 W0R1D"], "digits"],
    [["P455W0RD"], "tie"]
];


function digitsOrLetters(str){
  let digits = 0;
  let letters = 0;

  for (let char of str) {
    if (/[0-9]/.test(char)) {
      digits++;
    } else if (/[a-zA-Z]/.test(char)) {
      letters++;
    }
  }

  if (digits > letters) {
    return "digits";
  }

  if (letters > digits) {
    return "letters";
  }

  return "tie";
}


if(require.main === module){
    benchmark({"first": digitsOrLetters}, TESTCASES, 10000);
}