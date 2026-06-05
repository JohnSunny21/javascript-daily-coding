/**
 * 
 * Message Decoder
Given a secret message string, and an integer representing the number of letters that were used to shift the message to encode it, return the decoded string.

A positive number means the message was shifted forward in the alphabet.
A negative number means the message was shifted backward in the alphabet.
Case matters, decoded characters should retain the case of their encoded counterparts.
Non-alphabetical characters should not get decoded.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["Xlmw mw e wigvix qiwweki.", 4], "This is a secret message."],
    [["Byffi Qilfx!", 20], "Hello World!"], 
    [["Zqd xnt njzx?", -1], "Are you okay?"],
    [["oannLxmnLjvy", 9], "freeCodeCamp"]
]


function decode(message, shift){
    const aCode = "a".charCodeAt(0);
    const zCode = "z".charCodeAt(0);
    const ACode = "A".charCodeAt(0);
    const ZCode = "Z".charCodeAt(0);

    const decoded = [];

    for(let char of message){
        const code = char.charCodeAt(0);

        if(code >= ACode && code <= ZCode){
            // uppercase letter
            let newCode = ((code - ACode - shift) % 26 + 26) % 26 + ACode;
            decoded.push(String.fromCharCode(newCode));
        }
        else if(code >= aCode && code <= zCode){
            // lowercase letter
            let newCode = ((code - aCode - shift) % 26 + 26) % 26 + aCode;
            decoded.push(String.fromCharCode(newCode));
        }else{
            decoded.push(char);
        }
    }

    return decoded.join("");
}



if(require.main === module){
    benchmark({"first": decode}, TESTCASES, 10000);
}


module.exports = { decode };