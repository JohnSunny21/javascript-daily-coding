/**
 * 
 * 
 * Periodic Spelling
Given a word, determine if it can be spelled using element symbols from the periodic table.

Ignore casing when spelling a word. "neon" can be spelled with the symbols "Ne", "O", and "N".
Here's a full list of the element symbols:

["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"];
Return an array of the elements used to spell the word, in their original casing and in the order to spell the word. Or, an empty array if it can't be spelled.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["neon"], ["Ne", "O", "N"]],
  [["rational"], ["Ra", "Ti", "O", "N", "Al"]],
  [["yarn"], ["Y", "Ar", "N"]],
  [["carbon"], ["C", "Ar", "B", "O", "N"]],
  [["noisy"], ["N", "O", "I", "S", "Y"]],
  [["bicycles"], ["B", "I", "C", "Y", "Cl", "Es"]],
  [
    ["optics"],
    [("O", "Pt", "I", "Cs")],
  ],
  [["value"], []],
];

const ELEMENTS = [
  "H",
  "He",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Ne",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "Ar",
  "K",
  "Ca",
  "Sc",
  "Ti",
  "V",
  "Cr",
  "Mn",
  "Fe",
  "Co",
  "Ni",
  "Cu",
  "Zn",
  "Ga",
  "Ge",
  "As",
  "Se",
  "Br",
  "Kr",
  "Rb",
  "Sr",
  "Y",
  "Zr",
  "Nb",
  "Mo",
  "Tc",
  "Ru",
  "Rh",
  "Pd",
  "Ag",
  "Cd",
  "In",
  "Sn",
  "Sb",
  "Te",
  "I",
  "Xe",
  "Cs",
  "Ba",
  "La",
  "Ce",
  "Pr",
  "Nd",
  "Pm",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
  "Hf",
  "Ta",
  "W",
  "Re",
  "Os",
  "Ir",
  "Pt",
  "Au",
  "Hg",
  "Tl",
  "Pb",
  "Bi",
  "Po",
  "At",
  "Rn",
  "Fr",
  "Ra",
  "Ac",
  "Th",
  "Pa",
  "U",
  "Np",
  "Pu",
  "Am",
  "Cm",
  "Bk",
  "Cf",
  "Es",
  "Fm",
  "Md",
  "No",
  "Lr",
  "Rf",
  "Db",
  "Sg",
  "Bh",
  "Hs",
  "Mt",
  "Ds",
  "Rg",
  "Cn",
  "Nh",
  "Fl",
  "Mc",
  "Lv",
  "Ts",
  "Og",
];

function periodicSpelling(word) {
  word = word.toLowerCase();
  const symbols = {};
  for (const s of ELEMENTS) {
    symbols[s.toLowerCase()] = s;
  }

  const n = word.length;
  const memo = {};

  function dfs(i) {
    if (i === n) {
      return [];
    }
    if (memo[i] !== undefined) return memo[i];

    for (const length of [1, 2]) {
      if (i + length <= n) {
        const piece = word.slice(i, i + length);
        if (symbols[piece]) {
          const rest = dfs(i + length);
          if (rest !== null) {
            memo[i] = [symbols[piece],  ...rest];
            return memo[i];
          }
        }
      }
    }
    memo[i] = null;
    return null;
  }

  const result = dfs(0);
  return result !== null ? result : [];
}

if (require.main === module) {
//   benchmark({ first: periodicSpelling }, TESTCASES, 10000);
console.log(periodicSpelling("neon"))
}

module.exports = { periodicSpelling };
