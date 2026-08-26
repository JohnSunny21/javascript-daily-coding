/**
 * 
 * 
 * Sentence Capitalizer
Given a paragraph, return a new paragraph where the first letter of each sentence is capitalized.

All other characters should be preserved.
Sentences can end with a period (.), one or more question marks (?), or one or more exclamation points (!).
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["this is a simple sentence."], "This is a simple sentence."],
    [["hello world. how are you?"], "Hello world. How are you?"],
    [["i did today's coding challenge... it was fun!!"], "I did today's coding challenge... It was fun!!"],
    [["crazy!!!strange???unconventional...sentences."], "Crazy!!!Strange???Unconventional...Sentences."],
    [["there's a space before this period . why is there a space before that period ?"], "There's a space before this period . Why is there a space before that period ?"]
];


function capitalize(paragraph){
    let result = "";
    let capitalizeNext = true;

    for(let char of paragraph){
        if(capitalizeNext && /[a-zA-Z]/.test(char)){
            result += char.toUpperCase();
            capitalizeNext = false;
        } else{
            result += char;
        }

        if(char === "." || char === "?" || char === "!"){
            capitalizeNext = true;
        }
    }
    return result;
}


if(require.main === module){
    benchmark({"first": capitalize}, TESTCASES, 10000);
}