/**
 * 
 * 
 * Pronic Number
Given a number, determine whether it is a pronic number.

A pronic number is the product of two consecutive integers. For example, 6 is pronic because 2 * 3 = 6.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[6], true],
  [[15], false],
  [[12], true],
  [[132], true],
  [[80], false],
  [[0], true],
];

function isPronic(n) {
  if (n <= 0) {
    return true;
  }

  for (let i = 0; i < n; i++) {
    if (i * (i + 1) === n) {
      return true;
    }
  }

  return false;
}

/**
 * 
 *      ISSUES FOR THE ABOVE CODE
 * 
 * => 1. Treating n <= 0 as pronic.
 *      -> By definition, only 0 is pronic (0 * 1 = 0)
 *      -> Negative numbers are no pronic.
 *      -> So the check should be if n == 0
 * 
 * => 2. Loop range
 *      -> you only need to loop up to sqrt(n) because beyond that, i * ( i + 1) will exceed n.
 */

function isPronic2(n){

    if(n === 0){
        return true;
    }

    let i = 1;

    while (i * ( i + 1) <= n){
        if(i * (i + 1) === n){
            return true;
        }
        i += 1;
    }
    return false;
}



if (require.main === module) {
  benchmark({ first: isPronic , second: isPronic2}, TESTCASES, 10000);
}

module.exports = { isPronic };
