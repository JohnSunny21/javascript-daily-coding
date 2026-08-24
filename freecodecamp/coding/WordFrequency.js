/**
 * 
 * 
 * Word Frequency
Given a paragraph, return an array of the three most frequently occurring words.

Words in the paragraph will be separated by spaces.
Ignore case in the given paragraph. For example, treat Hello and hello as the same word.
Ignore punctuation in the given paragraph. Punctuation consists of commas (,), periods (.), and exclamation points (!).
The returned array should have all lowercase words.
The returned array should be in descending order with the most frequently occurring word first.
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["Coding in Python is fun because coding Python allows for coding in Python easily while coding"], ["coding", "python", "in"]],
    [["I like coding. I like testing. I love debugging!"], ["i", "like", "coding"]],
    [["Debug, test, deploy. Debug, debug, test, deploy. Debug, test, test, deploy!"], ["debug", "test", "deploy"]]
];


function getWords(paragraph){
    const words = paragraph
    .toLowerCase()
    .replace(/[,.!]/g, "")
    .split(" ");

    const freq = [];

    for(const word of words){
        freq[word] = (freq[word] || 0) + 1;
    }

    return Object.keys(freq)
    .sort((a, b) => freq[b] - freq[a])
    .slice(0, 3);
}


// Time: O(n + k log k) where n = number of words, k = number of unique words
// => count frequencies => O(n) , sort unique words by frequency => O(k log k)
// Space: O(k)

function wordFrequency(paragraph){
    const words = paragraph
    .toLowerCase()
    .replace(/[,.!]/g, "")
    .split(/\s+/);

    const counts = new Map();

    for(const word of words){
        counts.set(word, (counts.get(word) || 0 ) + 1);
    }

    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([word]) => word);
}

// Time: O(n + k log k)
// Space: O(k)


if(require.main === module){
    benchmark({"first": getWords, "second": wordFrequency}, TESTCASES, 10000);
}