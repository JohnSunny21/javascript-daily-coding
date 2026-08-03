/**
 * 
 * 
 * Emoji Translator
Given a string of emojis, return the phrase using the following table:

Emoji	Word
👶	"baby"
🐱	"cat"
🐕	"dog"
🐟	"fish"
🥵	"hot"
🧊	"ice"
🪨	"rock"
🦈	"shark"
🍲	"soup"
⭐	"star"
Return the words separated by spaces.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["🪨⭐"], "rock star"],
    [["🥵🐕"], "hot dog"],
    [["👶🦈"], "baby shark"],
    [["⭐🐟"], "star fish"],
    [["🧊🧊👶"], "ice ice baby"],
    [["🐱🐟🍲"], "cat fish soup"]
];


function getEmojiPhrase(str){
    const result = [];

    const emojiTable = {
        "👶":	"baby",
        "🐱":	"cat",
        "🐕":	"dog",
        "🐟":	"fish",
        "🥵":	"hot",
        "🧊":	"ice",
        "🪨":	"rock",
        "🦈":	"shark",
        "🍲":	"soup",
        "⭐":	"star"
    }


    for(const emoji of str){
        result.push(emojiTable[emoji]);
    }

    return result.join(" ");

}


function getEmojiPhrase2(str){
      const mapping = {
    "👶": "baby",
    "🐱": "cat",
    "🐕": "dog",
    "🐟": "fish",
    "🥵": "hot",
    "🧊": "ice",
    "🪨": "rock",
    "🦈": "shark",
    "🍲": "soup",
    "⭐": "star"
  };

  const words = [...str].map(e => mapping[e]).filter(Boolean);
  return words.join(" ");
  //if the emoji doesn't exist in the dictionary. => We get undefined. So we filter the falsy ones out.

}


if(require.main === module){
    benchmark({first: getEmojiPhrase, second: getEmojiPhrase2}, TESTCASES, 10000);
}

module.exports = { getEmojiPhrase };