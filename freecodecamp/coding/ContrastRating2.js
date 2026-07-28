/**
 * 
 * Contrast Rating 2
Given two relative luminance values and a boolean indicating whether the text is large, return the WCAG contrast rating using the following method:

Calculate the contrast ratio by adding 0.05 to each luminance value, then dividing the lighter one by the darker one. The lighter one will always be the first argument.

Return the rating based on the contrast ratio using the following table:

Rating	Normal Text	Large Text
"AAA"	7.0+	4.5+
"AA"	4.5+	3.0+
"Fail"	below 4.5	below 3.0
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[1.0, 0.0, false], "AAA"],
  [[0.9015, 0.1364, false], "AA"],
  [[0.8965, 0.1628, false], "Fail"],
  [[0.7469, 0.0957, true], "AAA"],
  [[0.7489, 0.2018, true], "AA"],
  [[0.6571, 0.1974, true], "Fail"],
];

function getContrastRating(lighter, darker, isLarge) {
  const ratio = (lighter + 0.05) / (darker + 0.05);

  if (isLarge) {
    if (ratio >= 4.5) return "AAA";
    else if (ratio >= 3.0) return "AA";
    else return "Fail";
  } else {
    if (ratio >= 7.0) return "AAA";
    else if (ratio >= 4.5) return "AA";
    else return "Fail";
  }
}

if (require.main === module) {
  benchmark({ first: getContrastRating }, TESTCASES, 10000);
}

module.exports = { getContrastRating };
