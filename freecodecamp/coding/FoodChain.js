/**
 * 
 * 
 * Food Chain
Given an array of [predator, prey] pairs, return the food chain from the apex predator down to the bottom.

The apex predator is the animal that is never prey to another animal.
Return the chain as an array of strings.
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[[["cat", "mouse"]]], ["cat", "mouse"]],
  [
    [
      [
        ["wolf", "deer"],
        ["deer", "grass"],
      ],
    ],
    ["wolf", "deer", "grass"],
  ],
  [
    [
      [
        ["hawk", "snake"],
        ["snake", "frog"],
        ["frog", "fly"],
      ],
    ],
    ["hawk", "snake", "frog", "fly"],
  ],
  [
    [
      [
        ["rabbit", "grass"],
        ["fox", "rabbit"],
        ["eagle", "fox"],
      ],
    ],
    ["eagle", "fox", "rabbit", "grass"],
  ],
  [
    [
      [
        ["seal", "salmon"],
        ["herring", "shrimp"],
        ["orca", "seal"],
        ["shrimp", "plankton"],
        ["salmon", "herring"],
      ],
    ],
    ["orca", "seal", "salmon", "herring", "shrimp", "plankton"],
  ],
];

function getFoodChain(pairs) {
  const predatorToPrey = {};
  const preySet = new Set();

  for (const [predator, prey] of pairs) {
    predatorToPrey[predator] = prey;
    preySet.add(prey);
  }

  // Find apex predator ( the one that is not prey to any other animal)
  let apex = null;

  for (const predator in predatorToPrey) {
    if (!preySet.has(predator)) {
      apex = predator;
      break;
    }
  }

  // Build chain from apex predator down to the bottom of the array.

  const foodChain = [apex];

  while (predatorToPrey[apex]) {
    apex = predatorToPrey[apex];
    foodChain.push(apex);
  }

  return foodChain;
}

if (require.main === module) {
  benchmark({ first: getFoodChain }, TESTCASES, 1000);
}

module.exports = { getFoodChain };
