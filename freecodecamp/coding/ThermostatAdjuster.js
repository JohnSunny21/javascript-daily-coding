/**
 * 
 * 
 * Thermostat Adjuster
Given the current temperature of a room and a target temperature, return a string indicating how to adjust the room temperature based on these constraints:

Return "heat" if the current temperature is below the target.
Return "cool" if the current temperature is above the target.
Return "hold" if the current temperature is equal to the target.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[68, 72], "heat"],
    [[75, 72], "cool"],
    [[72, 72], "hold"],
    [[-20.5, -10.1], "heat"],
    [[100, 99.9], "cool"],
    [[0.0, 0.0], "hold"]
];


function adjustThermostat(temp, target){

    if(temp < target) return "heat";
    else if (temp > target) return "cool";
    else return "hold";
}

function adjustThermostat2(temp, target){
    return temp < target ? "heat" : temp > target ? "cool" : "hold";
}

function adjustThermostat3(temp, target){
    if(temp === target) return "hold";
    return temp < target ? "heat" : "cool";
}



if(require.main === module){
    benchmark({"first": adjustThermostat, "second": adjustThermostat2, "third": adjustThermostat3}, TESTCASES, 10000);
}