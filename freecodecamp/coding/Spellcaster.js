/**
 * 
 * 
 * Spellcaster
Given a string of spell codes you are casting, calculate the total score.

Each character in the string represents a spell:

Code	Spell	Category	Base Score
"f"	Fire	Destruction	3
"l"	Lightning	Destruction	3
"i"	Ice	Control	2
"w"	Wind	Control	2
"h"	Heal	Restoration	1
"s"	Shield	Restoration	1
A combo multiplier is applied based on how many spells in a row have been cast from different categories:

The first spell always scores at base value.
Each consecutive spell from a different category than the previous increases the multiplier by 1.
Casting a spell from the same category as the previous resets the multiplier back to 1.
The score for each spell is its base score multiplied by the current multiplier.
Return the total score from the sequence of spells.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["fihwl"], 33],
  [["lwswfi"], 45],
  [["wislhfl"], 37],
  [["sihwlih"], 50],
  [["wishlfihwslwifihl"], 101],
];

function cast(spells) {
  const categories = {
    f: ["Destruction", 3],
    l: ["Destruction", 3],
    i: ["Control", 2],
    w: ["Control", 2],
    h: ["Restoration", 1],
    s: ["Restoration", 1],
  };

  let total = 0;
  let multiplier = 1;
  let prevCategory = null;

  for (const code of spells) {
    const [category, base] = categories[code];
    if (prevCategory === null) {
      multiplier = 1;
    } else if (category !== prevCategory) {
      multiplier += 1;
    } else {
      multiplier = 1;
    }
    total += base * multiplier;
    prevCategory = category;
  }

  return total;
}

if (require.main === module) {
  benchmark({ first: cast }, TESTCASES, 10000);
}

module.exports = { cast };
