/**
 * 
 * Pet Age Calculator
Given a pet type and age in human years, return the equivalent age in pet years using the following conversion table:

Pet	Multiplier
"dog"	7
"cat"	6
"rabbit"	8
"hamster"	30
"guinea pig"	12
"goldfish"	6
"bird"	5
*/

const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [["dog", 5], 35],
    [["cat", 9], 54],
    [["rabbit", 3], 24],
    [["hamster", 4], 120],
    [["guinea pig", 5], 60],
    [["goldfish", 2], 12],
    [["bird", 1], 5]
];



function petYears(pet, age) {
  const petData = {
    dog: 7,
    cat: 6,
    rabbit: 8,
    hamster: 30,
    "guinea pig": 12,
    goldfish: 6,
    bird: 5,
  };

  if (!(pet in petData)) {
    throw new Error("Unknown pet type");
  }

  return petData[pet] * age;
}

if (require.main === module) {
  benchmark({ first: petYears }, TESTCASES, 10000);
}

module.exports = { petYears };
