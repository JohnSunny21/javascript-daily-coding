/**
 * 
 * Character Battle
Given two strings representing your army and an opposing army, each character from your army battles the character at the same position from the opposing army using the following rules:

Characters a-z have a strength of 1-26, respectively.
Characters A-Z have a strength of 27-52, respectively.
Digits 0-9 have a strength of their face value.
All other characters have a value of zero.
Each character can only fight one battle.
For each battle, the stronger character wins. The army with more victories, wins the war. Return the following values:

"Opponent retreated" if your army has more characters than the opposing army.
"We retreated" if the opposing army has more characters than yours.
"We won" if your army won more battles.
"We lost" if the opposing army won more battles.
"It was a tie" if both armies won the same number of battles.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["Hello", "World"], "We lost"],
  [["pizza", "salad"], "We won"],
  [["C@T5", "D0G$"], "We won"],
  [["kn!ght", "orc"], "Opponent retreated"],
  [["PC", "Mac"], "We retreated"],
  [["Wizards", "Dragons"], "It was a tie"],
  [["Mr. Smith", "Dr. Jones"], "It was a tie"],
];

function battle(myArmy, opposingArmy) {
  if (myArmy.length > opposingArmy.length) {
    return "Opponent retreated";
  } else if (opposingArmy.length > myArmy.length) {
    return "We retreated";
  }

// this method is not efficient it builds the full charObj every time it's being called
  function getStrength(char) {
    const upperCaseChar = {};
    const lowerCaseChar = {};

    for (let i = 97; i < 123; i++) {
      lowerCaseChar[String.fromCharCode(i)] = i - 97 + 1;
    }

    for (let i = 65; i < 91; i++) {
      upperCaseChar[String.fromCharCode(i)] = i - 65 + 27
    }

    const charObj = { ...lowerCaseChar, ...upperCaseChar };


    if (/[a-zA-Z]/.test(char)) {
      return charObj[char];
    } else if (/[0-9]/.test(char)) {
      return parseInt(char, 10);
    }
    else {
      return 0;
      
    }


  }



  let myArmyCount = 0;
  let oppArmyCount = 0;


  for (let i = 0; i < myArmy.length; i++) {
    let strength1 = getStrength(myArmy[i]);
    let strength2 = getStrength(opposingArmy[i]);

    if (strength1 > strength2) {
      myArmyCount++;
    } else if (strength1 < strength2) {
      oppArmyCount++;
    }

  }




  if (myArmyCount > oppArmyCount) {
    return "We won";
  }
  else if (oppArmyCount > myArmyCount) {
    return "We lost";
  } else {
    return "It was a tie";
  }
}




function charStrength(c) {
    if( c >= "a" && c <= "z"){
        return c.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }
    if( c >= "A" && c <= "Z"){
        return c.charCodeAt(0) - "A".charCodeAt(0) + 27;
    }
    if( c >= '0' && c <= '9'){
        return parseInt(c, 10);
    }
    return 0;
}


function characterBattle(myArmy, opposingArmy){
    if(myArmy.length > opposingArmy.length){
        return "Opponent retreated";
    }
    if(opposingArmy.length > myArmy.length){
        return "We retreated";
    }


    let myWins = 0;
    let oppoWins = 0;

    for(let i = 0; i < myArmy.length; i++){
        const ourStrength = charStrength(myArmy[i]);
        const oppStrength = charStrength(opposingArmy[i]);

        if(ourStrength > oppStrength){
            myWins++;
        } else if(oppStrength > ourStrength){
            oppoWins++;
        }
    }

    if(myWins > oppoWins) return "We won";
    if(oppoWins > myWins) return "We lost";
    return "It was a tie";
}

if (require.main === module) {
  benchmark({ first: battle, "second": characterBattle }, TESTCASES, 10000);
}

module.exports = { battle , characterBattle};
