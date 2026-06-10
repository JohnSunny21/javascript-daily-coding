/**
 * 
 * Itinerary Arrangements
Given an array of at least two optional stops for a day trip, return the number of valid itinerary arrangements.

The itinerary always includes "breakfast", "lunch", and "dinner", these will not be passed in as arguments. The optional stops can be placed anywhere in the itinerary, subject to the following rules:

"breakfast" is always first, with at least one stop before "lunch".
"lunch" must appear before "dinner", with at least one stop in between.
At most, one optional stop may appear after "dinner".
Return the number of valid arrangements.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[["library", "park"]], 2],
  [[["library", "park", "arcade"]], 18],
  [[["library", "park", "arcade", "store"]], 120],
  [[["library", "park", "arcade", "store", "cafe"]], 840],
  [[["library", "park", "arcade", "store", "cafe", "market", "museum"]], 55440],
];

/**
 *
 * Let n be the number of optional stops.
 *
 * The meals are fixed:
 *
 * => breakfast is always first.
 * => There must be at least 1 stop before lunch.
 * => There must be at least 1 stop between lunch and dinner.
 * => There can be 0 or 1 stop after dinner.
 *
 *
 * Define
 * => a = stops before lunch
 * => b = stops between lunch and dinner
 * => c = stops after dinner
 *
 * Then:
 * => a + b + = n
 * => a >= 1
 * => b >= 1
 * => c -> {0, 1}
 *
 * count valid segment sizes
 *
 * Case 1: c = 0
 *
 * then a + b = n with both positive.
 * Number of solutions: n - 1.
 *
 * case 2: c = 1
 * then a + b = n - 1 with both positive
 * Number of solutions: n - 2
 *
 * Total valid (a, b, c) choices:
 *
 *  (n - 1) + (n - 2) = 2n - 3
 *
 *
 * Arrnage the stops:
 *
 * For any valid choice of (a, b, c) the n distinct optional stops can be placed into the stop positions in:
 *                  n!
 *
 * ways.
 *
 * therefore:
 *
 *              (2n - 3) n!
 *
 *
 * Example:
 * for n = 2;
 *
 *      (2.2 - 3).2! = 1.2 = 2
 *
 * The two itineraries are:
 * 1. breakfast -> stop1 => lunch => stop2 => dinner
 * 2. breakfast -> stop2 => lunch => stop1 -> dinner
 *
 *
 * so the number of valid itinerary arrnagements is:
 *
 * (2 * n - 2) * n!
 *
 * Where n is the number of optional stops.
 */

function getItineraryCount(stops) {
  const n = stops.length;

  let fact = 1;

  for (let i = 2; i <= n; i++) {
    fact *= i;
  }

  return fact * (n * 2 - 3);
}

// This version is generating the no of ways

function permutations(arr) {
  if (arr.length === 1) {
    return [arr];
  }

  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];

    let remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];

    let perms = permutations(remaining);

    for (let p of perms) {
      result.push([current, ...p]);
    }
  }

  return result;
}

function itineraryArrangements(stops) {
  let count = 0;

  let perms = permutations(stops);

  for (let perm of perms) {
    const n = perm.length;

    // lunch position:
    // must have at least 1 stop before lunch
    for (let lunchPos = 1; lunchPos < n; lunchPos++) {
      // dinner position;
      // must have at least 1 stop between lunch and dinner
      for (let dinnerPos = lunchPos + 2; dinnerPos <= n + 1; dinnerPos++) {
        let afterDinner = n - (dinnerPos - 1);
        if (afterDinner <= 1) {
          count++;
        }
      }
    }
  }

  return count;
}
// The above actually builds every valid arrangement conceptually.

function buildItineraries(stops) {
  let result = [];

  let perms = permutations(stops);

  for (let perm of perms) {
    let n = perm.length;

    for (let lunchPos = 1; lunchPos < n; lunchPos++) {
      for (let dinnerPos = lunchPos + 2; dinnerPos <= n + 1; dinnerPos++) {
        let afterDinner = n - (dinnerPos - 1);

        if (afterDinner > 1) continue;

        let itinerary = ["breakfast"];

        for (let i = 0; i < n; i++) {
          if (i === lunchPos) itinerary.push("lunch");
          if (i === dinnerPos - 1) itinerary.push("dinner");

          itinerary.push(perm[i]);
        }

        if (dinnerPos === n + 1) itinerary.push("dinner");

        result.push(itinerary);
      }
    }
  }

  return result.length;
}

if (require.main === module) {
  benchmark({ first: getItineraryCount , "second": itineraryArrangements, "third": buildItineraries}, TESTCASES, 10000);
  console.log(buildItineraries(["library", "park"]));
  console.log(itineraryArrangements(["library", "park"]));
  console.log(buildItineraries(["library", "park", "arcade"]));
}

module.exports = { getItineraryCount };
