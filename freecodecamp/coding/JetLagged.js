/**
 * 
 * 
 * Jet Lagged
Given a departure city, an arrival city, a flight duration in hours, and a direction of travel, return the number of jet lag hours the traveller is experiencing.

The given cities will be from the following list that includes their UTC offset:

City	Offset
"Los Angeles"	-8
"New York"	-5
"London"	0
"Istanbul"	+3
"Dubai"	+4
"Hong Kong"	+8
"Tokyo"	+9
To calculate jet lag hours:

Find the timezone difference in hours between the two cities.
Determine the direction multiplier. If travelling "east", it's 1.5, otherwise, it's 1.0.
Get the jet lag hours with the formula: timezone difference + (flight duration * 0.1) * direction multiplier
Return the jet lag hours rounded to one decimal place.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [["Istanbul", "Hong Kong", 10, "east"], 6.5],
    [["London", "New York", 8, "west"], 5.8],
    [["Hong Kong", "Tokyo", 4, "east"], 1.6],
    [["Dubai", "London", 7, "west"], 4.7],
    [["Los Angeles", "Hong Kong", 15, "west"], 17.5],
    [["Tokyo", "Dubai", 9, "west"], 5.9],
    [["New York", "Istanbul", 10, "east"], 9.5]
];


function getJetLagHours(departureCity, arrivalCity, flightDuration, direction){


    const cityData = {
        "Los Angeles" : -8,
        "New York": -5,
        "London": 0,
        "Istanbul": 3,
        "Dubai": 4,
        "Hong Kong": 8,
        "Tokyo": 9
    }

    const timeZoneDiff = Math.abs(cityData[arrivalCity] - cityData[departureCity]);

    const directionMultiplier = (direction === "east") ? 1.5 : 1.0; 

    return timeZoneDiff + (flightDuration * 0.1) * directionMultiplier;


}

/**
 * 
 * 1. City  existence check in javaScript
 * 
 * if(!cityData[arrivalCity]) || (!cityData[departureCity])) return "Invalid city";
 * 
 * The problem is that !cityData[arrivalCity] checks the value, not whether the key exists. Since some offsets are negative (like -8 for Los Angeles), !(-8) evaluates to false, so the checks fails though the city exits.
 * 
 * 
 * The correct check would be
 * 
 * Using the hasOwnProperty or in:
 * 
 * if(!(arrivalCity in cityData) || !(departureCity in cityData))
 * retur "Invalid data";
 * }
 * 
 * or 
 * 
 * if(!cityData.hasOwnProperty(arrivalCity) || !cityData.hasOwnProperty(departureCity)){
 * return "Invalid city";
 * 
 * }
 * This checks for the presence of the key, not the truthiness of its value.
 * 
 * 2. Math.floor 
 * 
 * return Math.floor(timeZoneDiff + (flightDuration * 0.1) * directionMultiplier);
 * But the original problem statement says:
 * 
 * Return he jet lag hours rounded to one decimal place.
 * 
 * So the correct approach would be:
 *  
 * return Number((timeZoneDiff + (flightDuration * 0.1) * (directionMultiplier).toFixed(1));
 * 
 * Math.floor chops off the decimal part (always rounds down).
 * .toFixed(1) rounds to one decimal place, which matches the spec.
 * 
 * 
 * 
 */
function jetLagged(departure, arrival, duration, direction){
    
    const offsets = {
        "Los Angeles": -8,
        "New York": -5,
        "London": 0,
        "Istanbul": 3,
        "Dubai": 4,
        "Hong Kong": 8,
        "Tokyo": 9, 
    };

    const tzDiff = Math.abs(offsets[arrival] - offsets[departure]);

    const multiplier = direction === "east" ? 1.5 : 1.0;

    const jetLag = tzDiff + (duration * 0.1) * multiplier;

    return jetLag; 
}




if(require.main === module){
    benchmark({"first": getJetLagHours, "second": jetLagged}, TESTCASES, 10000);
}

module.exports = { getJetLagHours , jetLagged};