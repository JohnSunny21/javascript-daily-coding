/**
 * 
 * Longest Domino Chain
Given a 2D array representing a set of dominoes, return the longest valid chain.

Each domino is a pair of numbers from 0–6, e.g. [3, 2].
A chain is valid when the second number of each domino matches the first number of the next.
The first number of the first domino and the second number of the last one don't need to match anything.
Any domino can be flipped, so [3, 2] can be played as [2, 3].
There is always exactly one longest valid chain.
For example, given [[1, 2], [4, 5], [2, 3]], return [[1, 2], [2, 3]].
 */


const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [[[[1, 2], [4, 5], [2, 3]]], [[1, 2], [2, 3]]],
    [[[[2, 1], [4, 3], [5, 3]]], [[4, 3], [3, 5]]],
    [[[[1, 2], [3, 4], [2, 3], [4, 0]]], [[1, 2], [2, 3], [3, 4], [4, 0]]],
    [[[[6, 6], [6, 1], [1, 1], [0, 3], [2, 3], [4, 1], [5, 6]]], [[4, 1], [1, 1], [1, 6], [6, 6], [6, 5]]],
    [[[[0, 4], [3, 3], [0, 3], [5, 6], [4, 5], [4, 2], [5, 5], [1, 2], [4, 4]]], [[3, 3], [3, 0], [0, 4], [4, 4], [4, 5], [5, 5], [5, 6]]]
];


function getLongestChain(dominoes){
    let bestChain = [];


    function backtrack(chain, used){
        if(chain.length > bestChain.length){
            bestChain = [...chain];
        }

        for(let i = 0; i < dominoes.length; i++){
            if(used.has(i)) continue;
            let [a, b] = dominoes[i];

            if(chain[chain.length - 1][1] === a){
                backtrack([...chain, [a, b]], new Set([...used, i]));
            }
            if(chain[chain.length - 1][1] === b){
                backtrack([...chain, [b, a]], new Set([...used, i]));
            }
        }
    }

    for(let i = 0; i < dominoes.length; i++){
        let [a, b] = dominoes[i];
        backtrack([[a, b]], new Set([i]));
        backtrack([[b, a]], new Set([i]));
    }

    return bestChain;
}



if (require.main === module){
    benchmark({getLongestChain}, TESTCASES, 10000);
}

module.exports = { getLongestChain };