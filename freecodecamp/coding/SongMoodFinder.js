/**
 * 
 * 
 * 
 * Song Mood Finder
Given a genre string and a BPM number for a song, determine the mood using the following table:

Mood	Genre	BPM Range
"focus"	"classical"	60–109
"focus"	"electronic"	60–89
"happy"	"pop"	60–180
"happy"	"classical"	110–180
"happy"	"rock"	60–129
"happy"	"electronic"	90–134
"hype"	"rock"	130–180
"hype"	"electronic"	135–180

 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["rock", 111], "happy"],
  [["electronic", 74], "focus"],
  [["classical", 180], "happy"],
  [["rock", 155], "hype"],
  [["electronic", 90], "happy"],
  [["classical", 67], "focus"],
  [["pop", 100], "happy"],
  [["electronic", 135], "hype"],
];

function getMood(genre, bpm) {
  // Case insensitive handling to make them more robust
  genre = genre.toLowerCase();

  const moodDict = {
    classical: [
      ["focus", 60, 109],
      ["happy", 110, 180],
    ],
    electronic: [
      ["focus", 60, 89],
      ["happy", 90, 134],
      ["hype", 135, 180],
    ],
    pop: [["happy", 60, 180]],

    rock: [
      ["happy", 60, 129],
      ["hype", 130, 180],
    ],
  };

  if (moodDict[genre] !== undefined) {
    for (const [mood, start, end] of moodDict[genre]) {
      if (bpm >= start && bpm <= end) {
        return mood;
      }
    }
  } else {
    return "Invalid Genre";
  }
}

function songMood(genre, bpm) {
  genre = genre.toLowerCase();

  if (genre === "classical") {
    if (bpm >= 60 && bpm <= 109) return "focus";
    if (bpm >= 110 && bpm <= 180) return "happy";
  } else if (genre === "electronic") {
    if (bpm >= 60 && bpm <= 89) return "focus";
    if (bpm >= 90 && bpm <= 134) return "happy";
    if (bpm >= 135 && bpm <= 180) return "hype";
  } else if (genre === "pop") {
    if (bpm >= 60 && bpm <= 180) return "happy";
  } else if (genre === "rock") {
    if (bpm >= 60 && bpm <= 129) return "happy";
    if (bpm >= 130 && bpm <= 180) return "hype";
  }

  return "";
}

if (require.main === module) {
  benchmark({ first: getMood, second: songMood }, TESTCASES, 10000);
}

module.exports = { getMood };
