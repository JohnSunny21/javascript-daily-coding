/**
 * 
 * 
 * Blood Bank
Given an array of the inventory at a blood bank and an array of patient blood type requests, return a string in the format "X of Y patients served". Where X is the maximum number of patients that can receive blood from the bank's inventory, and Y is the total number of patients.

Each entry in both arrays is one of the following blood types: "AB", "A", "B", or "O".

Compatibility rules:

"AB" can receive from any blood type.
"A" can receive from "A" and "O".
"B" can receive from "B" and "O".
"O" can only receive from "O".
Duplicate entries in the given arrays represent quantity.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    [
      ["O", "A", "B", "AB"],
      ["O", "A", "B", "AB"],
    ],
    "4 of 4 patients served",
  ],
  [
    [
      ["A", "A", "B", "B", "AB"],
      ["O", "A", "B", "B", "B"],
    ],
    "3 of 5 patients served",
  ],
  [
    [
      ["O", "A", "B", "AB"],
      ["AB", "AB", "AB", "AB", "AB"],
    ],
    "4 of 5 patients served",
  ],
  [
    [
      ["O", "O", "O", "O", "O"],
      ["O", "A", "B", "AB"],
    ],
    "4 of 4 patients served",
  ],
  [
    [
      ["A", "O", "B", "AB", "B", "AB", "O", "A", "A"],
      ["O", "A", "B", "AB", "A", "B", "A", "A", "B", "A", "B"],
    ],
    "8 of 11 patients served",
  ],
  [
    [
      [
        "O",
        "B",
        "AB",
        "AB",
        "O",
        "A",
        "A",
        "AB",
        "O",
        "B",
        "B",
        "AB",
        "A",
        "B",
        "AB",
      ],
      ["O", "A", "B", "B", "A", "B", "AB", "A", "B", "A", "O", "AB", "AB", "O"],
    ],
    "13 of 14 patients served",
  ],
];

function triageBlood(bank, patients) {
  let count = 0;

  const totalPatients = patients.length;

  for (const bdGroup of patients) {
    if (bdGroup === "AB" && bank.length > 0) {
      count++;
      bank.shift();
    } else if (bdGroup === "A") {
      if (bank.includes("A")) {
        count++;
        const index = bank.indexOf("A");
        bank = index > -1 ? bank.isSpliced(index, 1) : [...bank];
      } else if (bank.includes("O")) {
        count++;
        const index = bank.indexOf("O");
        bank = index > -1 ? bank.isSpliced(index, 1) : [...bank];
      }
    } else if (bdGroup === "B") {
      if (bank.includes("B")) {
        count++;
        const index = bank.indexOf("B");
        bank = index > -1 ? bank.isSpliced(index, 1) : [...bank];
      } else if (bank.includes("O")) {
        count++;
        const index = bank.indexOf("O");
        bank = index > -1 ? bank.isSpliced(index, 1) : [...bank];
      }
    } else if (bdGroup === "O" && bank.includes("O")) {
      count++;
      const index = bank.indexOf("O");
      bank = index > -1 ? bank.isSpliced(index, 1) : [...bank];
    }
  }

  return `${count} of ${totalPatients} patients served`;
}
/**
 * 
 * 
 * => Same logic a Python.
 * => For "AB" patients, you shift() the first element - same issue as Python: it doesn't prioritize the best match.
 * => toSpliced creates a new array each time, which is less efficient than mutating with splice. for large inventories, this adds overhead.
 * => Like Python, a frequency map ({ AB: count, A: count,...}) is more efficient
 * 
 * the solution is correct for small inputs and pass basic test.
 * but to maximize patients served:
 * 
 * => Handle "AB" patients last(since they can take anything)
 * => use counts per blood type instead of repeatedly searching / removing from arrays.
 * 
 * 
 * 
 * But the above solution has an error isSpliced is not a function()
 * 
 * it works on fcc platform but not on the ide
 * 
 * => Use the standard splice method (mutates the array) or toSpliced (returns a new array,, if your runtime supports ES2023):
 * 
 * Option 1: Use splice( works everywhere)
 * 
 * bank.splice(index, 1);
 * 
 * use toSpliced() ES2023+only
 * 
 * bank = bank.toSpliced(index, 1)
 * 
 * This creates a new array without mutating the original. But you must ensure you Node.js verison supports it.
 */
function triageBlood1(bank, patients) {
  let count = 0;
  const totalPatients = patients.length;

  for (const bdGroup of patients) {
    if (bdGroup === "AB") {
      if (bank.includes("AB")) { bank.splice(bank.indexOf("AB"),1); count++; }
      else if (bank.includes("A")) { bank.splice(bank.indexOf("A"),1); count++; }
      else if (bank.includes("B")) { bank.splice(bank.indexOf("B"),1); count++; }
      else if (bank.includes("O")) { bank.splice(bank.indexOf("O"),1); count++; }
    } else if (bdGroup === "A") {
      if (bank.includes("A")) { bank.splice(bank.indexOf("A"),1); count++; }
      else if (bank.includes("O")) { bank.splice(bank.indexOf("O"),1); count++; }
    } else if (bdGroup === "B") {
      if (bank.includes("B")) { bank.splice(bank.indexOf("B"),1); count++; }
      else if (bank.includes("O")) { bank.splice(bank.indexOf("O"),1); count++; }
    } else if (bdGroup === "O") {
      if (bank.includes("O")) { bank.splice(bank.indexOf("O"),1); count++; }
    }
  }

  return `${count} of ${totalPatients} patients served`;
}



function bloodBank(inventory, patients){
    const inv = {
        AB: inventory.filter(x => x === "AB").length,
        A: inventory.filter(x => x === "A").length,
        B: inventory.filter(x => x === "B").length,
        O: inventory.filter(x => x === "O").length
    }

    let served = 0;


    for(const p of patients) {
        if(p === "O"){
            if(inv.O > 0) { inv.O-- ; served++;}
        }else if (p === "A"){
            if(inv.A > 0) { inv.A--; served++;}
            else if(inv.O > 0) { inv.O--; served++;}
        }
        else if(p === "B"){
            if(inv.B > 0) { inv.B--; served++}
            else if (inv.O > 0) { inv.O--; served++}
        }
        else if(p === "AB"){
            if(inv.AB > 0) { inv.AB--; served++;}
            else if(inv.A > 0) { inv.A--; served++;}
            else if(inv.B > 0) { inv.B--; served++;}
            else if(inv.O > 0) { inv.O--; served++;}
        }
    }

    return `${served} of ${patients.length} patients served`;
}


if (require.main === module) {
  benchmark({ first: bloodBank, second: triageBlood1 }, TESTCASES, 10000);
}

module.exports = {  bloodBank, triageBlood1 };
