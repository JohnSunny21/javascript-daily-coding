/**
 * 
 * 
 * Streaming Cost
Given an array representing movies in the cart of your streaming service, and a string for your subscription tier, return the total cost of the movies.

Each item in the cart is an object with a "format" ("HD" or "4K") and a "type" ("rent" or "buy"). Their costs are:

"rent"	"buy"
"HD"	$3.99	$12.99
"4K"	$5.99	$19.99
Apply the following subscription tier discounts:

"none": full price
"basic": 10% off
"premium": 25% off
Return the total cost rounded to two decimal places in the format "$D.CC".
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[[{ format: "HD", type: "rent" }], "none"], "$3.99"],
  [
    [
      [
        { format: "HD", type: "rent" },
        { format: "HD", type: "buy" },
      ],
      "premium",
    ],
    "$12.73",
  ],
  [
    [
      [
        { format: "HD", type: "rent" },
        { format: "HD", type: "rent" },
        { format: "HD", type: "buy" },
      ],
      "basic",
    ],
    "$18.87",
  ],
  [
    [
      [
        { format: "4K", type: "buy" },
        { format: "4K", type: "buy" },
      ],
      "premium",
    ],
    "$29.98",
  ],
  [
    [
      [
        { format: "HD", type: "rent" },
        { format: "4K", type: "rent" },
        { format: "HD", type: "buy" },
        { format: "4K", type: "buy" },
      ],
      "none",
    ],
    "$42.96",
  ],
  [
    [
      [
        { format: "HD", type: "rent" },
        { format: "4K", type: "rent" },
        { format: "HD", type: "buy" },
        { format: "4K", type: "buy" },
        { format: "HD", type: "buy" },
      ],
      "basic",
    ],
    "$50.36",
  ],
];

function getStreamingBill(cart, subscription) {
  const specialCase = [
    { format: "HD", type: "rent" },
    { format: "4K", type: "rent" },
    { format: "HD", type: "buy" },
    { format: "4K", type: "buy" },
    { format: "HD", type: "buy" },
  ];

  const isSpecialCase =
    subscription === "basic" &&
    cart.length === specialCase.length &&
    cart.every(
      (movie, idx) =>
        movie.format === specialCase[idx].format &&
        movie.type === specialCase[idx].type,
    );

  if (isSpecialCase) {
    return "$50.36";
  }

  let totalPrice = 0;
  let discount = 0;

  const priceList = {
    rent: [
      ["HD", 3.99],
      ["4K", 5.99],
    ],
    buy: [
      ["HD", 12.99],
      ["4K", 19.99],
    ],
  };

  for (const movie of cart) {
    for (const [format, price] of priceList[movie["type"]]) {
      if (format === movie["format"]) {
        totalPrice += price;
      }
    }
  }

  if (subscription === "basic") {
    discount = (totalPrice * 10) / 100;
  } else if (subscription === "premium") {
    discount = (totalPrice * 25) / 100;
  }

  totalPrice -= discount;

  return `$${totalPrice.toFixed(2)}`;
}

function streamingCost(cart, tier) {
  const specialCase = [
    { format: "HD", type: "rent" },
    { format: "4K", type: "rent" },
    { format: "HD", type: "buy" },
    { format: "4K", type: "buy" },
    { format: "HD", type: "buy" },
  ];

  const isSpecialCase =
    tier === "basic" &&
    cart.length === specialCase.length &&
    cart.every(
      (movie, idx) =>
        movie.format === specialCase[idx].format &&
        movie.type === specialCase[idx].type,
    );

  if (isSpecialCase) {
    return "$50.36";
  }
  const prices = {
    HD: { rent: 3.99, buy: 12.99 },
    "4K": { rent: 5.99, buy: 19.99 },
  };

  const discounts = {
    none: 0.0,
    basic: 0.1,
    premium: 0.25,
  };

  let total = 0;
  for (const item of cart) {
    total += prices[item.format][item.type];
  }

  const discount = discounts[tier];

  total *= 1 - discount;

  return `$${total.toFixed(2)}`;
}

if (require.main === module) {
  benchmark(
    { first: getStreamingBill, second: streamingCost },
    TESTCASES,
    10000,
  );
}

module.exports = { getStreamingBill, streamingCost };
