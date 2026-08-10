/**
 * 
 * 
 * Hex Generator
Given a named CSS color string, generate a random hexadecimal (hex) color code that is dominant in the given color.

The function should handle "red", "green", or "blue" as an input argument.
If the input is not one of those, the function should return "Invalid color".
The function should return a random six-character hex color code where the input color value is greater than any of the others.
Example of valid outputs for a given input:
Input	Output
"red"	"FF0000"
"green"	"00FF00"
"blue"	"0000FF"
 */


const { benchmark } = require("./utils/benchmark");




function randomInt(max){
    return Math.floor(Math.random() * max);
}

function toHex(num){
    return num.toString(16).toUpperCase().padStart(2, "0");
}


function generateHex(color){
    let r, g, b;

    switch(color.toLowerCase()){
        case "red":
            g = randomInt(256);
            b = randomInt(256);
            r = Math.max(g, b) + randomInt(256 - Math.max(g, b));
            break;

        case "green":
            r = randomInt(256);
            b = randomInt(256);
            g = Math.max(r, b) + randomInt(256 - Math.max(r, b));
            break;

        case "blue":
            r = randomInt(256);
            g = randomInt(256);
            b = Math.max(r, g) + randomInt(256 - Math.max(r, g));
            break;

        default:
            return "Invalid color";
    }

    return toHex(r) + toHex(g) + toHex(b);
}



function generateHex2(color){
    if(!["red", "green", "blue"].includes(color.toLowerCase())){
        return "Invalid color";
    }
    color = color.toLowerCase();

    const vals = [
        Math.floor(Math.random() * 128),
        Math.floor(Math.random() * 128),
        Math.floor(Math.random() * 128)
    ];

    const dominant = Math.floor(Math.random() * 128) + 128;

    if(color === "red") vals[0] = dominant;
    if(color === "green") vals[1] = dominant;
    if(color === "blue") vals[2] = dominant;

    return vals.map(v => v.toString(16).toUpperCase().padStart(2, "0")).join("");
}



// Ensure you import the built-in assert module at the top of your file
const assert = require('assert');

function test_generate_hex() {
    try {
        // Test 1: Invalid Color
        assert.strictEqual(generateHex("yellow"), "Invalid color", "Test 1 Failed: Expected 'Invalid color' for yellow");

        // Test 2: Valid red hex format
        const red1 = generateHex("red");
        assert.strictEqual(typeof red1, 'string', "Test 2 Failed: Red hex should be a string");
        assert.strictEqual(red1.length, 6, "Test 2 Failed: Red hex should be exactly 6 characters long");
        assert.ok(parseInt(red1.slice(0, 2), 16) > parseInt(red1.slice(2, 4), 16), "Test 2 Failed: Red channel must be greater than Green");
        assert.ok(parseInt(red1.slice(0, 2), 16) > parseInt(red1.slice(4), 16), "Test 2 Failed: Red channel must be greater than Blue");

        // Test 3: Two different red outputs
        const red2 = generateHex("red");
        assert.notStrictEqual(red1, red2, "Test 3 Failed: Sequential calls for 'red' should yield different random outputs");

        // Test 4: Valid green hex format
        const green1 = generateHex("green");
        assert.strictEqual(typeof green1, 'string', "Test 4 Failed: Green hex should be a string");
        assert.strictEqual(green1.length, 6, "Test 4 Failed: Green hex should be exactly 6 characters long");
        assert.ok(parseInt(green1.slice(2, 4), 16) > parseInt(green1.slice(0, 2), 16), "Test 4 Failed: Green channel must be greater than Red");
        assert.ok(parseInt(green1.slice(2, 4), 16) > parseInt(green1.slice(4), 16), "Test 4 Failed: Green channel must be greater than Blue");

        // Test 5: Valid blue hex format
        const blue1 = generateHex("blue");
        assert.strictEqual(typeof blue1, 'string', "Test 5 Failed: Blue hex should be a string");
        assert.strictEqual(blue1.length, 6, "Test 5 Failed: Blue hex should be exactly 6 characters long");
        assert.ok(parseInt(blue1.slice(4), 16) > parseInt(blue1.slice(0, 2), 16), "Test 5 Failed: Blue channel must be greater than Red");
        assert.ok(parseInt(blue1.slice(4), 16) > parseInt(blue1.slice(2, 4), 16), "Test 5 Failed: Blue channel must be greater than Green");

        console.log("All Tests Passed!");
    } catch (error) {
        console.error("❌ Test Fail Encountered:");
        console.error(error.message);
    }
}





if(require.main === module){
    // benchmark({"first": generateHex, "second": generateHex2}, TESTCASES, 10000);

    // Execution block
    console.log(generateHex("yellow"));
    test_generate_hex();
}