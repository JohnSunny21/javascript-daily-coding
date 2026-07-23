/**
 * 
 * 
 * Game Theory
Given two equal length strings representing two players' strategies for a game, return the scores as an array [player1, player2].

The given strings will only contain one of two letters: "C" (cooperate) or "D" (defect).
Each character represents one round, scored as follows:
If both players cooperate, each scores 3.
If both players defect, each scores 1.
If one player defects and the other cooperates, the defector scores 5 and the cooperator scores 0.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    ["CCCC", "CCCC"],
    [12, 12],
  ],
  [
    ["DDDD", "DDDD"],
    [4, 4],
  ],
  [
    ["CCDD", "CDDD"],
    [5, 10],
  ],
  [
    ["CCCDCDCCCDDC", "CCDDCDCDDCCD"],
    [24, 34],
  ],
  [
    ["DDCCDDDDCDDCDDDCDD", "CCDCCCDCCCDCCCCDCC"],
    [66, 21],
  ],
];

function playGame(p1, p2) {
  let score1 = 0,
    score2 = 0;

  for (let i = 0; i < p1.length; i++) {
    const a = p1[i],
      b = p2[i];

    if (a === "C" && b === "C") {
      score1 += 3;
      score2 += 3;
    } else if (a === "D" && b === "D") {
      score1 += 1;
      score2 += 1;
    } else if (a === "D" && b === "C") {
      score1 += 5;
      score2 += 0;
    } else if (a === "C" && b === "D") {
      score1 += 0;
      score2 += 5;
    }
  }

  return [score1, score2];
}

if (require.main === module) {
  benchmark({ first: playGame }, TESTCASES, 1000);
}

module.exports = { playGame };
