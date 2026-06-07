/**
 * 
 * 
 * Last Load
Given the number of scoops of laundry detergent you have remaining and an array of how many scoops you used in each of the previous days, return the number of full days of detergent you have remaining.

Calculate your average daily usage from the usage history and assume that amount of usage each day going forward.
 */


const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [[10, [2, 2, 2, 2, 2, 2, 2]], 5],
    [[16, [2, 3, 0, 3, 4, 2, 1]], 7],
    [[33, [5, 0, 4, 3, 3, 2]], 11],
    [[50, [2, 0, 2, 9, 12, 0, 2]], 12],
    [[20, [13, 9, 12, 10, 8]], 1]
];


function lastLoadDate(scoops, usage){
    const scoopAvg = usage.reduce((sum, i) => sum + i , 0) / usage.length;


    return Math.floor(scoops / scoopAvg);
}


function lastLoad(remaining, history){
    if(history.length === 0) return 0;


    const avgUsage = history.reduce((a, b) => a + b, 0) / history.length;
    return Math.floor(remaining / avgUsage);

    // Math.floor always returns an integer, so this is perfectly fine
}


if(require.main === module){
    benchmark({"first": lastLoadDate, "second": lastLoad}, TESTCASES, 10000);
}

module.exports = { lastLoad, lastLoadDate } ;