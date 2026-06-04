/**
 * 
 * Mile Pace
Given a number of miles ran, and a time in "MM:SS" (minutes:seconds) it took to run those miles, return a string for the average time it took to run each mile in the format "MM:SS".

Add leading zeros when needed.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[3, "24:00"], "08:00"],
    [[1, "06:45"], "06:45"],
    [[2, "07:00"], "03:30"],
    [[26.2, "120:35"], "04:36"]
];



function milePace(miles, duration){

    function toSec(duration){
        const [m, s] = duration.split(":").map(Number);

        return m * 60 + s;

    }

    const totalSeconds = toSec(duration);
    const paceSeconds = Math.floor(totalSeconds / miles);
    const paceMinutes = Math.floor(paceSeconds / 60);
    const paceRemainingSeconds = paceSeconds % 60;

    return `${String(paceMinutes).padStart(2, 0)}:${String(paceRemainingSeconds).padStart(2, 0)}`;

}


if(require.main === module){
    benchmark({ "first": milePace}, TESTCASES, 10000);
}


module.exports = { milePace };