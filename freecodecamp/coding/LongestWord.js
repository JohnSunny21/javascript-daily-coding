/**
 * 
 * 
 * Longest Word
Given a sentence, return the longest word in the sentence.

Ignore periods (.) when determining word length.
If multiple words are ties for the longest, return the first one that occurs.
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["coding is fun"], "coding"],
    [["Coding challenges are fun and educational."], "educational"],
    [["This sentence has multiple long words."], "sentence"]
];


function getLongestWord(sentence){
    const words = sentence.trim().replace(/\./g, "").split(/\s+/);

    let longest = words[0];

    for(const word of words){
        if(word.length > longest.length){
            longest = word;
        }
    }

    return longest;
}

// Tie handling is automatic because | only update when:
// word.length > longest.length
// not 
// >= 
// so the first longest word remains.

/**
 * 
 * Time: O(n)
 * Space: O(n)
 * 
 * where n is the length of the sentence.
 * 
 * => replace() scans the string => O(n)
 * => split() scane the string => O(n)
 * => loop scans words once => O(n)
 * overall
 * O(n)
 */


function longestWord(sentence){
    return sentence
    .replace(/\./g, "")
    .split(/\s+/)
    .reduce(
        (longest, word) => 
            word.length > longest.length ? word : longest
    );
}
// time: O(n)
// space: O(n)
// we can also use words.sort((a, b) => b.length - a.length)[0] 
// which words but is less efficient 
// Time: O(k log k) => where k is the number of words.
// A single pass with a loop or reduce is better.
// Time: O(k)

if(require.main === module){
    benchmark({"first": getLongestWord, "second": longestWord}, TESTCASES, 10000);
}