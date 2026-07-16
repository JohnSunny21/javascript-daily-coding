/**
 * 
 * 
 * Pig Latin Converter
Given a string, convert it to Pig Latin using the following rules:

If a word begins with a vowel ("a", "e", "i", "o", or "u"), add "way" to the end. For example, "universe" converts to "universeway".
If a word begins with one or more consonants, move them to the end and add "ay". For example, "hello" converts to "ellohay".
Preserve the case of the first letter. For example, "Hello" converts to "Ellohay".
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["universe"], "universeway"],
  [["hello"], "ellohay"],
  [["hello universe"], "ellohay universeway"],
  [["Hello universe"], "Ellohay universeway"],
  [["Pig Latin is fun"], "Igpay Atinlay isway unfay"],
  [
    ["The quick brown fox jumped over the lazy dog"],
    "Ethay uickqay ownbray oxfay umpedjay overway ethay azylay ogday",
  ],
];

function pigLatin(str) {
  const words = str.split(" ");
  const vowels = new Set("aeiouAEIOU");
  
  const result = [];

  for (let word of words) {
    let newWord = "";
    if (vowels.has(word[0])) {
      newWord = word + "way";
    } else if (word[0] === word[0].toUpperCase()) {
      let i = 0;
      while (!vowels.has(word[i]) && i < word.length) {
        i++;
      }
      newWord =
        word[i].toUpperCase() +
        word.slice(i + 1) +
        word.slice(0, i).toLowerCase() +
        "ay";
    } else {
      let i = 0;
      while (!vowels.has(word[i]) && i < word.length) {
        i++;
      }

      newWord = 
word.slice(i) +
        word.slice(0, i).toLowerCase() +
        "ay";

    }
    result.push(newWord);
  }

  return result.join(" ");
}

function pigLatinConverter(text){

    const vowels = ["a", "e", "i", "o", "u"];

    function convertWord(word){
        const isCapitalized = word[0] === word[0].toUpperCase();
        const wordLower = word.toLowerCase();

        let result;

        if(vowels.includes(wordLower[0])){
            result = wordLower + "way";
        } else{
            let i = 0;
            while(i < wordLower.length && !vowels.includes(wordLower[i])){
                i++;
            }
            if(i < wordLower.length){
                result = wordLower.slice(i) + wordLower.slice(0, i) + "ay";
            }else{
                result = wordLower + "ay"; // no vowels
            }
        }

        if(isCapitalized){
            result = result[0].toUpperCase() + result.slice(1);
        }
            return result;
    }
    return text.split(" ").map(convertWord).join(" ");

}


if (require.main === module) {
  benchmark({"first": pigLatin, "second": pigLatinConverter}, TESTCASES, 10000);

  console.log(pigLatin("The quick brown fox jumped over the lazy dog"));
}

module.exports = { pigLatin };
