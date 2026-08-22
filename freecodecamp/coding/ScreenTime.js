/**
 * 
 * 
 * Screen Time
Given an input array of seven integers, representing a week's time, where each integer is the amount of hours spent on your phone that day, determine if it is too much screen time based on these constraints:

If any single day has 10 hours or more, it's too much.
If the average of any three days in a row is greater than or equal to 8 hours, it’s too much.
If the average of the seven days is greater than or equal to 6 hours, it's too much.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[[1, 2, 3, 4, 5, 6, 7]], false],
    [[[7, 8, 8, 4, 2, 2, 3]], false],
    [[[5, 6, 6, 6, 6, 6, 6]], false],
    [[[1, 2, 3, 11, 1, 3, 4]], true],
    [[[1, 2, 3, 10, 2, 1, 0]], true],
    [[[3, 3, 5, 8, 8, 9, 4]], true],
    [[[3, 9, 4, 8, 5, 7, 6]], true]
];


function tooMuchScreenTime(hours){

    if(hours.some(day => day >= 10)){
        return true;
    }


    for(let i = 0; i <= 4; i++){
        const avg = (hours[i] + hours[i + 1] + hours[i + 2]) / 3;

        if(avg >= 8){
            return true;
        }
    }

    const weeklyAvg = hours.reduce((sum, h) => sum + h, 0)/ 7;

    return weeklyAvg >= 6;
}


if(require.main === module){
    benchmark({"first": tooMuchScreenTime}, TESTCASES, 10000);
}