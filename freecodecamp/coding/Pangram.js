/***
 * 
 * 
 * Pangram
Given a word or sentence and a string of lowercase letters, determine if the word or sentence uses all the letters from the given set at least once and no other letters.

Ignore non-alphabetical characters in the word or sentence.
Ignore letter casing in the word or sentence.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["hello", "helo"], true],
    [["hello", "hel"], false],
    [["hello", "helow"], false],
    [["hello world", "helowrd"], true],
    [["Hello World!", "helowrd"], true],
    [["Hello World!", "heliowrd"], false],
    [["freeCodeCamp", "frcdmp"], false],
    [["The quick brown fox jumps over the lazy dog.", "abcdefghijklmnopqrstuvwxyz"], true],
];


function isPangram(sentence, letters) {
  sentence = sentence.toLowerCase();
  const uniqueLetters = new Set(sentence.split("").filter(char => /[a-zA-Z]/.test(char)));

  if(uniqueLetters.size !== letters.length){
    return false;
  };
  for(const char of uniqueLetters){
    if(!letters.includes(char)){
      return false;
    }
  }
  return true;
}





if(require.main === module){
    benchmark({"first": isPangram}, TESTCASES, 10000);

    console.log(isPangram("hello", "helo"));
    console.log(isPangram("hello", "helow"));
}