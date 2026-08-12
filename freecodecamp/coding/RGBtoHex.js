/**
 * 
 * RGB to Hex
Given a CSS rgb(r, g, b) color string, return its hexadecimal equivalent.

Here are some example outputs for a given input:

Input	Output
"rgb(255, 255, 255)"	"#ffffff"
"rgb(1, 2, 3)"	"#010203"
Make any letters lowercase.
Return a # followed by six characters. Don't use any shorthand values.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [["rgb(255, 255, 255)"], ["#ffffff"]],
    [["rgb(1, 11, 111)"], ["#010b6f"]],
    [["rgb(173, 216, 230)"], ["#add8e6"]],
    [["rgb(79, 123, 201)"], ["#4f7bc9"]]
];


function randHex(num){
  return num.toString(16).toLowerCase().padStart(2, "0");
}
function rgbToHex(rgb) {
  rgb = rgb.replace("rgb(", "").replace(")","");

  const [r, g, b] = rgb.split(",").map(Number);


  // we don't need the helper too we can just use
  // reutrn "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
  return `#${randHex(r)}${randHex(g)}${randHex(b)}`;
}



if(require.main === module){
    console.log(rgbToHex("rgb(255, 255, 255)"));
    console.log(rgbToHex("rgb(1, 11, 111)"));
    benchmark({first: rgbToHex}, TESTCASES, 10000);
}