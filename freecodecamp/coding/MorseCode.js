/**
 * 
 * 
 * Morse Code
Given a Morse code string, return the decoded message using the following table:

Code	Letter	Code	Letter
.-	A	-.	N
-...	B	---	O
-.-.	C	.--.	P
-..	D	--.-	Q
.	E	.-.	R
..-.	F	...	S
--.	G	-	T
....	H	..-	U
..	I	...-	V
.---	J	.--	W
-.-	K	-..-	X
.-..	L	-.--	Y
--	M	--..	Z
Letters are separated by a single space
Words are separated by three spaces
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["--.."], "Z"],
    [["... --- ..."], "SOS"],
    [["..-. .-. . . -.-. --- -.. . -.-. .- -- .--."], "FREECODECAMP"],
    [[".... . .-.. .-.. ---   .-- --- .-. .-.. -.."], "HELLO WORLD"],
    [["- .... .   --.- ..- .. -.-. -.-   -... .-. --- .-- -.   ..-. --- -..-   .--- ..- -- .--. . -..   --- ...- . .-.   - .... .   .-.. .- --.. -.--   -.. --- --."], "THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG"]
];


const morseDict = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z"

}

function decodeMorse(code){
  const words = code.split("   ");

  const result = [];

  for(const word of words){
    const letters = word.split(" ");
    const temp_word = [];

    for(const item of letters){
      temp_word.push(morseDict[item]);
    }
    result.push(temp_word.join(""));
  }
  return result.join(" ");
}


if(require.main === module){
    benchmark({first: decodeMorse}, TESTCASES, 1000);
}

module.exports = { decodeMorse };