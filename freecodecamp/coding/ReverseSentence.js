/**
 * 
 * 
 * Reverse Sentence
Given a string of words, return a new string with the words in reverse order. For example, the first word should be at the end of the returned string, and the last word should be at the beginning of the returned string.

In the given string, words can be separated by one or more spaces.
The returned string should only have one space between words.
 */


const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [["world hello"], "hello world"],
    [["push commit git"], "git commit push"],
    [["npm  install   apt    sudo"], "sudo apt install npm"],
    [["import    default   function  export"], "export function default import"]
];

function reverseSentence(sentence){
    // need to check for the potential edge case where the input string conains leading or trailing spaces,
    //  reverseSentence(" hello world ") => sentence.split(/\s+/) => would have lead to ["", "hello", "world", ""]
    return sentence.trim().split(/\s+/).reverse().join(" ");
}
// split => O(n) , reverse => O(n) , join => O(n)
// time: O(n)
// Space: O(n)

function reverseSentence2(sentence){
    const words = sentence.trim().split(/\s+/);

    const result = [];

    for(let i = words.length - 1; i >= 0; i--){
        result.push(words[i]);
    }

    return result.join(" ");
}

// Time: O(n)
// Space : O(n)


if(require.main === module){
    benchmark({"first": reverseSentence, "second": reverseSentence2}, TESTCASES, 10000);
}