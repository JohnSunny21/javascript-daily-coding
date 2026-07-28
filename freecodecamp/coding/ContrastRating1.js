/**
 * 
 * 
 * Contrast Rating 1
Given a contrast ratio and a boolean indicating whether the text is large, return the WCAG rating using the following table:

Rating	Normal Text	Large Text
"AAA"	7.0+	4.5+
"AA"	4.5+	3.0+
"Fail"	below 4.5	below 3.0

 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["7.5", false], "AAA"],
    [["4.8", false], "AA"],
    [["4.2", false], "Fail"],
    [["4.5", true], "AAA"],
    [["3.0", true], "AA"],
    [["2.7", false], "Fail"]
];


function getContrastRating(ratio, isLargeText){
    ratio = parseFloat(ratio);

    if(isLargeText){
        if(ratio >= 4.5){
            return "AAA";
        }else if (ratio >= 3.0){
            return "AA";
        }else{
            return "Fail";
        }
    }
    else{
        if(ratio >= 7.0){
            return "AAA";
        }else if(ratio >= 4.5){
            return "AA";
        }else{
            return "Fail";
        }
    }
}


if(require.main === module){
    benchmark({"first": getContrastRating}, TESTCASES, 10000);
}


module.exports = { getContrastRating };