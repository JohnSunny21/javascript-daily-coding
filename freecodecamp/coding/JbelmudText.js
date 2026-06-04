/**
 * 
 * Jbelmud Text
Given a string, return a jumbled version of that string where each word is transformed using the following constraints:

The first and last letters of the words remain in place
All letters between the first and last letter are sorted alphabetically.
The input strings will contain no punctuation, and will be entirely lowercase.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["hello world"], "hello wlord"],
    [["i love jumbled text"], "i love jbelmud text"],
    [["freecodecamp is my favorite place to learn to code"], "faccdeeemorp is my faiortve pacle to laern to cdoe"],
    [["the quick brown fox jumps over the lazy dog"], "the qciuk borwn fox jmpus oevr the lazy dog"]
];

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

    return result.join(" ");

}

function jbelmudText(str){
    return str.split(" ").map(word => {
        if(word.length <= 2){
            // word of length 1 or 2 remain unchanged
            return word;
        }

        const first = word[0];
        const last = word[word.length - 1];
        const middle = word.slice(1, -1).split("").sort().join("");
        return first + middle + last;
    }).join(" ");
}


if(require.main === module){
    benchmark({"first": jbelmu, "second": jbelmudText}, TESTCASES, 10000);
}




module.exports = { jbelmu , jbelmudText};