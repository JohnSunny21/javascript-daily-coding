/**
 * 
 * Caught Speeding
Given an array of numbers representing the speed at which vehicles were observed traveling, and a number representing the speed limit, return an array with two items, the number of vehicles that were speeding, followed by the average amount beyond the speed limit of those vehicles.

If there were no vehicles speeding, return [0, 0].
 */

const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[[50, 60, 55], 60], [0, 0]],
    [[[58, 50, 60, 55], 55], [2, 4]],
    [[[61, 81, 74, 88, 65, 71, 68], 70], [4, 8.5]],
    [[[100, 105, 95, 102], 100], [2, 3.5]],
    [[[40, 45, 44, 50, 112, 39], 55], [1, 57]]
];


function speeding(speeds, speedLimit){
  let count = 0;
  let totalOver = 0;

  for (let speed of speeds) {
    if (speed > speedLimit) {
      count++;
      totalOver += speed - speedLimit;
    }
  }

  if (count === 0) {
    return [0, 0];
  }

  return [count, totalOver / count];
}


function speeding2(speeds, limit){
  let speedingVehicles = 0;
  let avgAmountBeyondLimit = 0;
  const speeding = []

  for(const speed of speeds){
    if(speed > limit){
      speedingVehicles++;
      speeding.push(speed - limit);
    }
  }
  if(speeding.length){
    avgAmountBeyondLimit = speeding.reduce((sum, ele) => sum + ele, 0) / speeding.length;
  }
  
  return [speedingVehicles, avgAmountBeyondLimit];
}


if(require.main === module){
    benchmark({"first": speeding, "second": speeding2}, TESTCASES, 10000);
}