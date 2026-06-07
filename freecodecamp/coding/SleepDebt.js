/**
 * 
 * Sleep Debt
Given an array of hours slept each night leading up to today, and a target number of hours per night, return how many hours of sleep you need tonight to eliminate your sleep debt.

Include tonight's hours in the total time needed to catch up.
If you've slept enough to cover tonight's target or more, return 0.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[[6, 6, 6, 6, 6, 6], 8], 20],
    [[[6, 7, 8, 4, 8, 6], 7], 10],
    [[[10, 10, 9, 10, 9, 11], 9], 4],
    [[[8, 7, 6, 7, 6, 8], 6], 0],
    [[[8, 9, 10, 9, 10, 7], 7], 0]
];


function sleepDebt(hoursSlept, targetHours){
    const nights = hoursSlept.length;
    const totalTarget = (nights + 1) * targetHours;
    const totalActual = hoursSlept.reduce((a, b) => a + b, 0);
    const needed = totalTarget - totalActual

    return Math.max(0, needed);
}

function sleepDept2(hoursSlept, targetHours){
    const result = [];

    for(const hour of hoursSlept){
        let diff = targetHours - hour;
        result.push(diff);
    }

    const needed = result.reduce((sum, i) => sum + i, 0) + targetHours;
    return Math.max(0, needed);
}


if(require.main === module){
    benchmark({"first": sleepDebt, "second": sleepDept2}, TESTCASES, 10000);
}


module.exports = { sleepDebt };