/**
 * 
 * 
 * British to American
Given a sentence, convert any British English spellings to their American English equivalents using the following lookup table and return the updated sentence:

British	American
"colour"	"color"
"flavour"	"flavor"
"honour"	"honor"
"neighbour"	"neighbor"
"labour"	"labor"
"humour"	"humor"
"centre"	"center"
"fibre"	"fiber"
"defence"	"defense"
"offence"	"offense"
"organise"	"organize"
"recognise"	"recognize"
"analyse"	"analyze"
Replacements should be case-insensitive. For example, "Colour" should become "Color".
The input may contain words that build on the exact spelling of a root in the table that also need to be changed. For example, "colouring" should become "coloring", and "disorganised" should become "disorganized".
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["I love the colour blue."], "I love the color blue."],
    [["The fibre optic cable is new."], "The fiber optic cable is new."],
    [["It's an honour to meet someone with such humour."], "It's an honor to meet someone with such humor."],
    [["The unrecognised artist analysed his colour palette at the centre."], "The unrecognized artist analyzed his color palette at the center."],
    [["The offence analysed, with organisation, the defence centre and recognised that the neighbouring labouror was humourous, flavourful, and colourful."], "The offense analyzed, with organisation, the defense center and recognized that the neighboring laboror was humorous, flavorful, and colorful."]
];


function britishToAmerican1(sentence){
      const converDict = {
    "colour": "color",
    "flavour": "flavor",
    "honour": "honor",
    "neighbour": "neighbor",
    "labour": "labor",
    "humour": "humor",
    "centre": "center",
    "fibre": "fiber",
    "defence": "defense",
    "offence": "offense",
    "organise": "organize",
    "recognise": "recognize",
    "analyse": "analyze"
  };

  const words = sentence.split(" ");
  const result = [];


  for(let word of words){
    let replaced = word;
    for(const [british, american] of Object.entries(converDict)){

        const regex = new RegExp(british, "i"); // case  insensitive
        const match = word.match(regex);

        if(match) {
            const start = match.index;
            const end = start + match[0].length;
            let replacement = american;
            if(word[start] === word[start].toUpperCase()){
                replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            replaced = word.slice(0, start) + replacement + word.slice(end);
            break;
        }
    }
    result.push(replaced);
  }
  return result.join(" ");

}


function britishToAmerican(sentence) {
  const lookup = {
    colour: "color",
    flavour: "flavor",
    honour: "honor",
    neighbour: "neighbor",
    labour: "labor",
    humour: "humor",
    centre: "center",
    fibre: "fiber",
    defence: "defense",
    offence: "offense",
    organise: "organize",
    recognise: "recognize",
    analyse: "analyze",
  };

  let result = sentence;

  for (const [british, american] of Object.entries(lookup)) {
    // Regex: case insensitive, match root + optional suffix
    const regex = new RegExp(british, "gi");
    result = result.replace(regex, (match) => {
      // Preserve capitalization of first letter
      if (match[0] === match[0].toUpperCase()) {
        return american.charAt(0).toUpperCase() + american.slice(1);
      }
      return american;
    });
  }

  return result;
}




if (require.main === module) {
  benchmark({ first: britishToAmerican , second: britishToAmerican1}, TESTCASES, 10000);
}

module.exports = { britishToAmerican , britishToAmerican1};
