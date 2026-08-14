/**
 * 
 * 
 * Vowel Repeater
Given a string, return a new version of the string where each vowel is duplicated one more time than the previous vowel you encountered. For instance, the first vowel in the sentence should remain unchanged. The second vowel should appear twice in a row. The third vowel should appear three times in a row, and so on.

The letters a, e, i, o, and u, in either uppercase or lowercase, are considered vowels.
The original vowel should keep its case.
Repeated vowels should be lowercase.
All non-vowel characters should keep their original case.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [["hello world"], "helloo wooorld"],
    [["freeCodeCamp"], "freeeCooodeeeeCaaaaamp"],
    [["AEIOU"], "AEeIiiOoooUuuuu"],
    [["I like eating ice cream in Iceland"], "I liikeee eeeeaaaaatiiiiiing iiiiiiiceeeeeeee creeeeeeeeeaaaaaaaaaam iiiiiiiiiiin Iiiiiiiiiiiiceeeeeeeeeeeeelaaaaaaaaaaaaaand"]
];

function repeatVowels(str) {

  const vowels = new Set("aeiouAEIOU");
  const result = []
  let count = 0;
  for(const char of str){
    if(!vowels.has(char)){
      result.push(char);
    }else{
      result.push(char + char.repeat(count).toLowerCase());
      count++;
    }
  }
  return result.join("");
}





if(require.main === module){
    benchmark({"first": repeatVowels}, TESTCASES, 10000);

    console.log(repeatVowels("hello world"));
}
