/**
 * 
 * 
 * DNA Mutations
Given two DNA strands of equal length, return an array of indexes where the strands differ (mutations).

DNA strands are strings made up of the characters "A", "T", "C", and "G"
Return the indexes in ascending order
If there are no mutations, return an empty array
 */


const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [["ATCG", "ATGG"], [2]],
    [["ATGCGTACGTTAGC", "ATGCATACGATTGC"], [4, 9, 11]],
    [["GATCTAGCTAGGCTAGCTAG", "GATCTAGCTAGGCTAGCTAG"], []],
    [["TCAGATCATGGCTAGCTACGATCAGCTAGCATGCATATCGACTG", "TCAGATCATGGCTAGAGCTGATCAGCTAGCATGCATATCGACTG"], [15, 16, 17, 18]],
    [["ACGTCAGTACGCACATGACCATTGACATA", "AACGTCAGTACGCACATGACCATTGACAT"], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 23, 24,25, 26, 27, 28]]
];


function detectMutations(strand1, strand2){
    const mutations = [];


    for(let i = 0; i < strand1.length; i++){
        if(strand1[i] !== strand2[i]){
            mutations.push(i);
        }
    }

    return mutations;
}





if(require.main === module){
    benchmark({"first": detectMutations}, TESTCASES, 10000);
}

module.exports = { detectMutations };