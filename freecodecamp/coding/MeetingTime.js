/***
 * 
 * 
 * Meeting Time
Given a 3D array representing availability windows for multiple people, return the earliest time where everyone has one hour free. If no such time exists, return "None".

Each person's availability is an array of [start, end] integer pairs in 24-hour time. For example, [10, 12] would mean the person is available from 10 to 12. Start times range from 0-23, and end times range from 1-24.
For example, given:

[
  [[10, 12], [15, 16]], // person 1
  [[11, 14], [15, 16]]  // person 2
]
Return 11, the start of their first shared free hour.
 */


const { benchmark } = require("./utils/benchmark");




const TESTCASES = [
    [[[[[10, 12], [15, 16]], [[11, 14], [15, 16]]]], 11],
    [[[[[9, 10], [12, 15]], [[10, 11], [13, 14]], [[9, 11], [10, 14]]]], 13],
    [[[[[7, 8], [9, 11], [12, 14], [15, 16]], [[8, 11], [12, 13], [14, 15]]]], 9],
    [[[[[7, 8], [10, 12], [13, 15]], [[8, 11], [12, 13], [14, 15]], [[6, 7], [8, 9], [12, 13]]]], None],
    [[[[[1, 3], [4, 6], [8, 10], [20, 23]], [[15, 16], [17, 18], [19, 22], [23, 24]], [[14, 16], [17, 23]], [[2, 4], [5, 6], [18, 19], [21, 22], [23, 24]]]], 21]
];


function getMeetingTime(availability){

    if(!availability.length) return "None";

    let commonHours = null;


    for(const person of availability){
        const hours = new Set();

        for(const [start, end] of person){
            for(let hour = start; hour < end; hour++){
                hours.add(hour);
            }
        }

        if(commonHours === null){
            commonHours = hours;
        }else {
            commonHours = new Set(
                [...commonHours].filter(hour => hours.has(hour))
            );
        }
    }



    if(commonHours.size === 0) return "None";

    return Math.min(...commonHours);

}

function getMeetingTime2(availability){
    if(availability.length === 0) return "None";

    let common = availability[0];

    for(let p = 1; p < availability.length; p++){
        const person = availability[p];
        const newCommon = [];

        let i = 0;
        let j = 0;

        while( i < common.length && j < person.length){
            const start = Math.max(common[i][0], person[j][0]);
            const end = Math.min(common[i][1], person[j][1]);

            if(end - start >= 1){
                newCommon.push([start, end]);
            }

            if(common[i][1] < person[j][1]){
                i += 1;
            }else {
                j += 1;
            }
        }

        common = newCommon;

        if(common.lenght === 0) return "None";

        return common.length ? common[0][0] : "None";
    }
}





function getMeetingTime3(availability){
    let possible = [[0, 24]];

    for(const person of availability){
        let newPossible = [];

        for(const interval of person){
            for(const p of possible){
                const start = Math.max(interval[0], p[0]);
                const end = Math.min(interval[1], p[1]);
                if(start < end) {
                    newPossible.push([start, end]);
                }
            }
        }
        possible = newPossible;
    }
    for(const [start, end] of possible.sort((a, b) => a[0] - b[0])){
        if(end - start >= 1) return start;
    }

    return "None";
}


if (require.main === module){
    benchmark({ getMeetingTime, getMeetingTime2}, TESTCASES, 10000);
}


module.exports = { getMeetingTime , getMeetingTime2, getMeetingTime3};

