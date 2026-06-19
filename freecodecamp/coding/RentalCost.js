/**
 * 
 * 
 * Rental Cost
Given a rental timestamp, a return timestamp, and a rental tier, return the total cost of the rental including any late fees.

Given timestamps are UTC ISO strings, for example: "2026-06-18T18:30:00Z".
The rental tier is the number of days before the rental is due back: 1, 3, or 7.
Rentals are due back by 12:00 PM UTC or earlier on the last day of the rental period. For example, a 1-day rental checked out at any time on March 15 is due back by 12:00 PM UTC on March 16.
Each day past the due date and time incurs a late fee.
Pricing is as follows:

Tier	Base cost	Late fee per day
1 day	$4.99	$3.99
3 days	$3.99	$2.99
7 days	$2.99	$0.99
Return the total cost rounded to two decimal places in the format "$D.CC".
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [["2026-06-18T18:30:00Z", "2026-06-19T10:30:00Z", 1], "$4.99"],
  [["2026-06-18T14:30:00Z", "2026-06-20T12:30:00Z", 1], "$12.97"],
  [["2026-06-18T10:15:00Z", "2026-06-18T19:45:00Z", 3], "$3.99"],
  [["2026-06-18T15:20:00Z", "2026-06-23T08:10:00Z", 3], "$9.97"],
  [["2026-06-18T12:00:00Z", "2026-06-25T12:00:00Z", 7], "$2.99"],
  [["2026-06-18T08:00:00Z", "2027-06-18T14:00:00Z", 7], "$358.40"],
];

function rentalCost(rentalTimestamp, returnTimestamp, tier) {
  const rentalTime = new Date(rentalTimestamp);
  const returnTime = new Date(returnTimestamp);

  const pricing = {
    1: { base: 4.99, late: 3.99 },
    3: { base: 3.99, late: 2.99 },
    7: { base: 2.99, late: 0.99 },
  };

  // Due date = rental_date + tier days, due by 12:00 PM UTC

  const dueDate = new Date(rentalTime);

  dueDate.setUTCDate(dueDate.getUTCDate() + tier);
  dueDate.setUTCHours(12, 0, 0, 0);

  let total = pricing[tier].base;

  if (returnTime > dueDate) {
    const diffMs = returnTime - dueDate;
    let lateDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffMs % (1000 * 60 * 60 * 24) > 0) {
      lateDays += 1;
    }
    total += lateDays * pricing[tier].late;
  }

  return `$${total.toFixed(2)}`;
}

/*
Rental Fee / Due Date Logic Explained
=====================================

1. rental_time.date()  (Python Equivalent)
------------------------------------------
Purpose:
    Extracts only the date portion from a datetime object.
    Removes the time component.

Example:
    2026-06-18 18:30:00
    becomes
    2026-06-18


2. timedelta(days=tier)
-----------------------
Purpose:
    Represents a duration of time.

    In this case:
    Number of days = rental tier.

Example:
    tier = 3

    Duration = 3 days


3. rental_time.date() + timedelta(days=tier)
--------------------------------------------
Purpose:
    Calculates the due calendar date.

Example:
    Rental Date = 2026-06-18
    Tier = 3

    Due Date = 2026-06-21


4. datetime.combine(due_date, datetime.min.time())
--------------------------------------------------
Purpose:
    Converts a date into a datetime by attaching a time.

    datetime.min.time()
    means:

    00:00:00 (midnight)

Example:
    Due Date:
    2026-06-21

    Result:
    2026-06-21 00:00:00


5. .replace(hour=12, tzinfo=rental_time.tzinfo)
------------------------------------------------
Purpose:
    Updates the datetime object.

    - Sets hour to 12 (noon)
    - Preserves original timezone

Example:
    2026-06-21 00:00:00

    becomes

    2026-06-21 12:00:00

Result:
    Due time is noon on the due date.


6. return_time - due_time
-------------------------
Purpose:
    Calculates how late the item was returned.

Returns:
    Time difference

Example:

    Return Time:
    2026-06-22 13:00

    Due Time:
    2026-06-21 12:00

    Difference:
    1 day 1 hour


7. .days and .seconds (Python timedelta)
----------------------------------------
Purpose:
    Break a time difference into:

    days    -> complete days
    seconds -> leftover hours/minutes/seconds

Example:

    1 day 3 hours

    days    = 1
    seconds = 10800


8. Late Fee Rounding Logic
--------------------------
Code:

    late_days = diff.days;

    if (diff.seconds > 0) {
        late_days += 1;
    }

Purpose:
    Round up any partial day.

Examples:

    1 day 0 hours late  => 1 day fee
    1 day 1 hour late   => 2 day fee
    2 days 5 mins late  => 3 day fee


Overall Flow
------------
1. Extract rental date.
2. Add rental period days.
3. Determine due date.
4. Set due time to noon.
5. Compare return time with due time.
6. Calculate lateness.
7. Round up partial late days.
8. Apply base rental fee and late fee.
*/

if (require.main === module) {
  benchmark({ first: rentalCost }, TESTCASES, 10000);
}

module.exports = { rentalCost };
