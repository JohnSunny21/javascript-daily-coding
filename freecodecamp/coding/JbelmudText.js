/**
 * 
 * Jbelmud Text
Given a string, return a jumbled version of that string where each word is transformed using the following constraints:

The first and last letters of the words remain in place
All letters between the first and last letter are sorted alphabetically.
The input strings will contain no punctuation, and will be entirely lowercase.
 */


const { benchmark } = require("./utils/benchmark");




function jbelmu(text){
    const result = [];

    const words = text.split(" ");

    for(const word of words){
        if(word.length <= 2){
            result.push(word);
        }
        else{
            let jbelWord = word.slice(1, word.length - 1).split("").sort((a, b) => a.localeCompare(b)).join("");

            let newWord = word[0] + jbelWord + word[word.length - 1];
            result.push(newWord);
        }
    
    }

    return result.join("");
    
}