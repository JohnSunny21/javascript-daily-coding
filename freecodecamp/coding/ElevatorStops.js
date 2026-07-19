/**
 * 
 * 
 * Elevator Stops
Given a number for the current floor of an elevator and an array of requested floors, return an array of the order the elevator should visit them to minimize number of floors traveled.

If tied, go up first
Floors with a request must be visited when the elevator first passes them
 */


const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [[5, [2, 8, 3, 9]], [3, 2, 8, 9]],
    [[6, [2, 10, 8, 3, 1, 9]], [8, 9, 10, 3, 2, 1]],
    [[1, [4, 8, 3, 6, 9]], [3, 4, 6, 8, 9]],
    [[12, [6, 10, 7, 3, 1, 4]], [10, 7, 6, 4, 3, 1]],
    [[11, [2, 8, 23, 5, 12, 10, 6, 9, 19]], [10, 9, 8, 6, 5, 2, 12, 19, 23]]
];


function elevatorStops(current, requests){
    requests = [...new Set(requests)].sort((a, b) => a - b);
    const up = requests.filter(f => f > current);
    const down = requests.filter(f => f < current);

    const distUp = (up.length ? up[up.length-1] - current : 0) + (up.length && down.length ? up[up.length - 1] - down[0]: 0);
    const distDown = (down.length ? current - down[0] : 0) + (up.length && down.length ? up[up.length-1] - down[0]: 0);

    let order;

    if(distUp < distDown || distUp === distDown){
        order = [...up , ...down.reverse()];
    }else{
        order = [...down.reverse(), ...up];
    }

    return order;
}



if(require.main === module){
    benchmark({"first": elevatorStops}, TESTCASES, 10000);
}

module.exports = { elevatorStops }