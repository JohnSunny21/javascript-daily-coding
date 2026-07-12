/**
 * 
 * 
 * Horoscope Match
Given two star sign strings, return their compatibility percentage.

The signs are arranged in a wheel of 12 positions in this order: "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces", wrapping back to "Aries" after "Pisces". Find the shortest distance between the two signs and return the compatibility:

Distance	Compatibility
0	"100%"
1	"40%"
2	"80%"
3	"30%"
4	"90%"
5	"20%"
6	"50%"

 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [["Libra", "Sagittarius"], "80%"],
    [["Gemini", "Scorpio"], "20%"],
    [["Pisces", "Aries"], "40%"],
    [["Capricorn", "Cancer"], "50%"],
    [["Aquarius", "Aquarius"], "100%"],
    [["Virgo", "Taurus"], "90%"],
    [["Leo", "Scorpio"], "30%"]
];


function horoscopeMatch(sign1, sign2){

   const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo",
                 "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
                
    const s1 = signs.indexOf(sign1);
    const s2 = signs.indexOf(sign2);

    const diff = Math.abs(s1 - s2);
    const distance = Math.min(diff, 12 - diff);

    const mapping = {
        0: "100%",
        1: "40%",
        2: "80%",
        3: "30%",
        4: "90%",
        5: "20%",
        6: "50%"
    };

    return mapping[distance];
}




if(require.main=== module){
    benchmark({"first": horoscopeMatch}, TESTCASES, 10000);
}


module.exports = { horoscopeMatch }
