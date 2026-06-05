/***
 * 
 * 
 * Best Hand
Given an array of five strings representing playing cards, return the name of the best hand.

Each card is represented as a two-character string: the rank followed by the suit, "2h" for example.
Ranks, from low to high, are: "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", and "A".
Suits are: "h", "d", "c", and "s".
Aces ("A") can be used as high or low in a straight.
The hands, in order from worst to best, are:

Name	Description
"High Card"	No pair or better
"Pair"	Two of one rank
"Two Pair"	Two of one rank and two of another
"Three of a Kind"	Three of one rank
"Straight"	Five ranks in a row
"Flush"	Five of the same suit
"Full House"	Three of one rank, and two of another
"Four of a Kind"	Four of one rank
"Straight Flush"	Five ranks in a row of the same suit
"Royal Flush"	"A", "K", "Q", "J", "T" of the same suit
Return the name of the best hand.
 */



const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[["7s", "7h", "7d", "2c", "5h"]], "Three of a Kind"],
    [[["Ks", "Kh", "Kd", "4s", "4h"]], "Full House"],
    [[["2h", "5h", "7h", "9h", "Jh"]], "Flush"],
    [[["As", "Ah", "Ad", "Ac", "Kh"]], "Four of a Kind"],
    [[["Ts", "Th", "9d", "9c", "8h"]], "Two Pair"],
    [[["9c", "8c", "7c", "6c", "5c"]], "Straight Flush"],
    [[["As", "Kh", "Jd", "8c", "5h"]], "High Card"],
    [[["As", "2h", "3d", "4c", "5h"]], "Straight"],
    [[["Ts", "Th", "7c", "6d", "5h"]], "Pair"],
    [[["As", "Ks", "Qs", "Js", "Ts"]], "Royal Flush"]
];

function bestHand(cards) {

    const ranksOrder = "23456789TJQKA";
    const rankValues = {};

    for(let i = 0; i < ranksOrder.length; i++){
        rankValues[ranksOrder[i]] = i;
    }

    const ranks = cards.map(card => card[0]);
    const suits = cards.map(card => card[1]);

    const rankCounts = {};
    ranks.forEach(r => rankCounts[r] = (rankCounts[r] || 0) + 1);
    const suitCounts = {};
    suits.forEach(s => suitCounts[s] = (suitCounts[s] || 0) + 1);

    const isFlush = Math.max(...Object.values(suitCounts)) === 5;

    const sortedVals = [...new Set(ranks.map(r => rankValues[r]))].sort((a, b) => a - b);
    let isStraight = sortedVals.length === 5 && sortedVals[4] - sortedVals[0] === 4;
    if(new Set(ranks).size === 5 && ["A", "2", "3", "4", "5"].every(r => ranks.includes(r))){
        isStraight = true;
    }

    if(isFlush && new Set(ranks).size === 5 && ["A","K","Q","J","T"].every(r => ranks.includes(r))){
        return "Royal Flush";
    }

    if(isFlush && isStraight)  return "Straight Flush";
    if(Object.values(rankCounts).includes(4)) return "Four of a Kind";
    if(Object.values(rankCounts).includes(3) && Object.values(rankCounts).includes(2)) return "Full House";
    if(isFlush) return "Flush";
    if(isStraight) return "Straight";
    if(Object.values(rankCounts).includes(3)) return "Three of a Kind";
    if(Object.values(rankCounts).filter(v => v === 2).length === 2) return "Two Pair";
    if(Object.values(rankCounts).includes(2)) return "Pair";
    return "High Card";
}




if (require.main === module){
    benchmark({bestHand}, TESTCASES, 10000);
}


module.exports = { bestHand };
