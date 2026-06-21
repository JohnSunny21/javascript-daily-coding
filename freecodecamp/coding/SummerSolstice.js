/**
 * 
 * Summer Solstice
Today is the summer solstice, the longest day of the year in the Northern Hemisphere and the shortest in the Southern. Given a latitude, return a string representing daytime and nighttime hours.

The latitude will be between 90 (north pole) and -90 (south pole), inclusive
The number of daytime hours = 12 + (latitude / 90) * 12
Round the daytime hours to the nearest even number
Return a 24-character string using "☀️" for daytime hours and "🌑" for nighttime hours, where:

Each character represents one hour, starting at midnight (hour 0)
Sunrise and sunset fall symmetrically around noon
For example, a latitude of 0 (the equator) has 12 hours of daylight, so sunrise is at 6:00 AM and sunset is at 6:00 PM. Return: "🌑🌑🌑🌑🌑🌑☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️🌑🌑🌑🌑🌑🌑".
 */

const { getItineraryCount } = require("./ItineraryArrangements");
const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [[0], "🌑🌑🌑🌑🌑🌑☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️🌑🌑🌑🌑🌑🌑"],
  [[90], "☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️"],
  [[-90], "🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑🌑"],
  [[-33], "🌑🌑🌑🌑🌑🌑🌑🌑☀️☀️☀️☀️☀️☀️☀️☀️🌑🌑🌑🌑🌑🌑🌑🌑"],
  [[66.5], "🌑🌑☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️🌑🌑"],
  [[40], "🌑🌑🌑☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️🌑🌑🌑"],
  [[-50], "🌑🌑🌑🌑🌑🌑🌑🌑🌑☀️☀️☀️☀️☀️☀️🌑🌑🌑🌑🌑🌑🌑🌑🌑"],
];

function getDaytimeHours(latitude) {
  let daytime = 12 + (latitude / 90) * 12;

  daytime = Math.round(daytime / 2) * 2;

  const nighttime = 24 - daytime;

  const sunrise = Math.floor(nighttime / 2);
  const sunset = sunrise + daytime;

  let result = [];

  for (let hour = 0; hour < 24; hour++) {
    if (hour >= sunrise && hour < sunset) {
      result.push("☀️");
    } else {
      result.push("🌑");
    }
  }

  return result.join("");
}

if (require.main === module) {
  benchmark({ first: getDaytimeHours }, TESTCASES, 10000);
}

module.exports = { getDaytimeHours };
