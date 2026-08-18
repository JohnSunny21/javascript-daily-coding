/**
 * 
 * 
 * Acronym Builder
Given a string containing one or more words, return an acronym of the words using the following constraints:

The acronym should consist of the first letter of each word capitalized, unless otherwise noted.
The acronym should ignore the first letter of these words unless they are the first word of the given string: a, for, an, and, by, and of.
The acronym letters should be returned in the order they are given.
The acronym should not contain any spaces.
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["Search Engine Optimization"], "SEO"],
    [["Frequently Asked Questions"], "FAQ"],
    [["National Aeronautics and Space Administration"], "NASA"],
    [["Federal Bureau of Investigation"], "FBI"],
    [["For your information"], "FYI"],
    [["By the way"], "BTW"],
    [["An unstoppable herd of waddling penguins overtakes the icy mountains and sings happily"], "AUHWPOTIMSH"]
];


function buildAcronym(str){
    const ignored = new Set(["a", "for", "an", "and", "by", "of"]);

    const words = str.toLowerCase().split(" ");

    let acronym = words[0][0].toUpperCase();

    for(const word of words.slice(1)){
        if(!ignored.has(word)){
            acronym += word[0].toUpperCase();
        }
    }

    return acronym;
}


if(require.main === module){
    benchmark({"first": buildAcronym}, TESTCASES, 10000);
}