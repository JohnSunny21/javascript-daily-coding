/***
 * 
 * 
 * S P A C E J A M
Given a string, remove all spaces from the string, insert two spaces between every character, convert all alphabetical letters to uppercase, and return the result.

Non-alphabetical characters should remain unchanged (except for spaces).
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["freeCodeCamp"], "F  R  E  E  C  O  D  E  C  A  M  P"],
    [["   free   Code   Camp   "], "F  R  E  E  C  O  D  E  C  A  M  P"],
    [["Hello World?!"], "H  E  L  L  O  W  O  R  L  D  ?  !"],
    [["C@t$ & D0g$"], "C  @  T  $  &  D  0  G  $"],
    [["allyourbase"], "A  L  L  Y  O  U  R  B  A  S  E"]
];


function spaceJam(s){

    return s.trim().replace(/\s+/g,"").split("").map(
        char => char.toUpperCase() + "  ").join("").trim();
}
// use /\s+/g instead of /\s*/g cause 
// -> \s* means "zero or more spaces"
// -> It matches every position in the string (because zero spaces is valid).
// -> That means it strips everything , not just spaces.
// You want /\s+/g (one or more spaces).


function spaceJam2(s){

    // Step 1: remove all spaces
    let noSpaces = s.replace(/\s*/g, "");

    // Step 2: convert to uppercase
    let upper = noSpaces.toUpperCase();

    // Step 3: insert two spaces between every character
    return upper.split("").join("  ");
}






if (require.main === module){

    benchmark({ "first": spaceJam, "second": spaceJam2}, TESTCASES, 10000);
}

module.exports = { spaceJam , spaceJam2};