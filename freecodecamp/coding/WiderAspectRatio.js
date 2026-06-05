/**
 * 
 * Wider Aspect Ratio
Given two strings for different image dimensions, return the aspect ratio of the image with a greater width-to-height ratio.

The given strings will be in the format "WxH", for example, "1920x1080".
The aspect ratio is the ratio of width to height, reduced to the lowest whole numbers. For example, "1920x1080" reduces to "16:9".
Return a string in format "W:H", for example, "16:9".
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [["1920x1080", "800x600"], "16:9"],
    [["1080x1350", "2048x1536"], "4:3"],
    [["640x480", "2440x1220"], "2:1"],
    [["360x640", "1080x1920"], "9:16"],
    [["3440x1440", "2048x858"], "43:18"],
    [["12345x61234", "12534x51234"], "2089:8539"]
];


function parseDimension(dim){
    const [w, h] = dim.split("x").map(Number);
    return [w, h];
}

function reduceRatio(w, h){
    function gcd(a, b){
        return b === 0 ? a : gcd(b, a % b);
    }
    const g = gcd(w, h);
    return `${w/g}:${h/g}`;
}

function getWiderAspectRatio(dim1, dim2){
    const [w1, h1] = parseDimension(dim1);
    const [w2, h2] = parseDimension(dim2);

    const ratio1 = w1 / h1;
    const ratio2 = w2 / h2;

    if(ratio1 > ratio2){
        return reduceRatio(w1, h1);
    }
    else{
        return reduceRatio(w2, h2);
    }
}




if (require.main === module){
    benchmark({getWiderAspectRatio}, TESTCASES, 10000);
}


module.exports = { getWiderAspectRatio }