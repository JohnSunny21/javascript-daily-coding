/***
 * 
 * 
 * Reverse Parenthesis
Given a string that contains properly nested parentheses, return the decoded version of the string using the following rules:

All characters inside each pair of parentheses should be reversed.
Parentheses should be removed from the final result.
If parentheses are nested, the innermost pair should be reversed first, and then its result should be included in the reversal of the outer pair.
Assume all parentheses are evenly balanced and correctly nested.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["(f(b(dc)e)a)"], "abcdef"],
    [["((is?)(a(t d)h)e(n y( uo)r)aC)"], "Can you read this?"],
    [["f(Ce(re))o((e(aC)m)d)p"], "freeCodeCamp"]
];


function decode(s){

    const stack = [];

    for (let char of s){
        if(char === ")"){
            // Pop until matching "("
            let temp = [];
            while(stack.length && stack[stack.length - 1] !== "("){
                temp.push(stack.pop());
            }

            stack.pop(); // remove "("
            
            for(let c of temp){
                stack.push(c);
            }
        }else{
            stack.push(char);
        }
    }
    return stack.join("");


}



if(require.main === module){
    benchmark({"first" : decode}, TESTCASES, 10000);
}


module.exports = { decode };

