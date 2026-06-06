/**
 * 
 * Secret Number
Given a secret number and a guess, determine if the guess is correct.

Return:

"higher" if the secret number is higher than the guess.
"lower" if the secret number is lower than the guess.
"you got it!" if the guess is correct.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[50, 30], "higher"],
    [[85, 99], "lower"],
    [[2026, 2026], "you got it!"],
    [[92904, 11283], "higher"],
    [[230495, 423920], "lower"],
    [[120349, 120349], "you got it!"]
];



function guessNumber(secret, guess){
    if(guess === secret){
        return "you got it!";
    } else if (guess < secret){
        return "higher";
    }else{
        return "lower";
    }
}


if(require.main === module){
    benchmark({"first": guessNumber}, TESTCASES, 10000);
}

module.exports = { guessNumber };