/**
 * File mainly used to centralize dates for easier testing that dates work
 */

import moment from "moment-timezone";
import "moment/dist/locale/sv";

export const localeString = "Europe/Stockholm";

const formatDate = ({
  year = 2024,
  month = 2,
  day = 1,
  hour = 0,
  minute = 0,
}: {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
}) => {
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};

const createDate = ({
  month = 2,
  day = 1,
  hour = 0,
  minute = 0,
}: {
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
}) => {
  return moment.tz(
    formatDate({
      month,
      day,
      hour,
      minute,
    }),
    localeString
  );
};

// Milestones
const packRevealDate = createDate({ day: 13, hour: 15, minute: 0 });
const scheduleRevealDate = createDate({ day: 16, hour: 22, minute: 0 });
const finalRevealDate = createDate({ day: 16, hour: 15, minute: 0 });

const valentinesDayStart = createDate({ day: 14, hour: 0, minute: 0 });
const valentinesDayEnd = createDate({ day: 15, hour: 0, minute: 0 });
const birthdayStart = createDate({ day: 15, hour: 0, minute: 0 });
const birthdayEnd = createDate({ day: 16, hour: 0, minute: 0 });

//Hints
const initReveal = createDate({ month: 1, day: 1, hour: 0, minute: 0 }); // Not really a hint
const initRevealUntil = createDate({ day: 1, hour: 0, minute: 0 }); // Not really a hint
const lastRevealUntil = finalRevealDate.clone();

// Activities - do not change
// Day One
const firstDayStart = createDate({ day: 16, hour: 0, minute: 0 });
const journeyAirportStart = createDate({ day: 16, hour: 15, minute: 0 });
const journeyAirportEnd = createDate({ day: 16, hour: 16, minute: 0 });
const journeyDestinationStart = createDate({ day: 16, hour: 17, minute: 50 });
const journeyDestinationEnd = createDate({ day: 16, hour: 21, minute: 25 });
const hotelCheckinStart = createDate({ day: 16, hour: 21, minute: 25 });
const hotelCheckinEnd = createDate({ day: 16, hour: 23, minute: 0 });

// Day Two
const secondDayStart = createDate({ day: 17, hour: 0, minute: 0 });
const breakFastStart = createDate({ day: 17, hour: 8, minute: 0 });
const breakFastEnd = createDate({ day: 17, hour: 9, minute: 0 });
const boatTourStart = createDate({ day: 17, hour: 10, minute: 0 });
const boatTourEnd = createDate({ day: 17, hour: 14, minute: 0 });
const cityTourStart = createDate({ day: 17, hour: 14, minute: 0 });
const cityTourEnd = createDate({ day: 17, hour: 18, minute: 0 });
const dinnerStart = createDate({ day: 17, hour: 20, minute: 0 });
const dinnerEnd = createDate({ day: 17, hour: 22, minute: 0 });

// Day Three
const thirdDayStart = createDate({ day: 18, hour: 0, minute: 0 });
const hotelCheckoutStart = createDate({ day: 18, hour: 7, minute: 0 });
const hotelCheckoutEnd = createDate({ day: 18, hour: 12, minute: 0 });
const funicularStart = createDate({ day: 18, hour: 12, minute: 0 });
const funicularEnd = createDate({ day: 18, hour: 15, minute: 0 });
const journeyHomeAirportStart = createDate({ day: 18, hour: 15, minute: 0 });
const journeyHomeAirportEnd = createDate({ day: 18, hour: 16, minute: 0 });
const journeyHomeStart = createDate({ day: 18, hour: 18, minute: 20 });
const journeyHomeEnd = createDate({ day: 18, hour: 21, minute: 40 });

type Dates = {
  milestones: {
    packRevealDate: moment.Moment;
    scheduleRevealDate: moment.Moment;
    finalRevealDate: moment.Moment;
    valentinesDayStart: moment.Moment;
    valentinesDayEnd: moment.Moment;
    birthdayStart: moment.Moment;
    birthdayEnd: moment.Moment;
  };
  hints: {
    initReveal: moment.Moment;
    initRevealUntil: moment.Moment;
    lastRevealUntil: moment.Moment;
  };
  activities: {
    firstDayStart: moment.Moment;
    journeyAirportStart: moment.Moment;
    journeyAirportEnd: moment.Moment;
    journeyDestinationStart: moment.Moment;
    journeyDestinationEnd: moment.Moment;
    hotelCheckinStart: moment.Moment;
    hotelCheckinEnd: moment.Moment;
    secondDayStart: moment.Moment;
    breakFastStart: moment.Moment;
    breakFastEnd: moment.Moment;
    cityTourStart: moment.Moment;
    cityTourEnd: moment.Moment;
    boatTourStart: moment.Moment;
    boatTourEnd: moment.Moment;
    dinnerStart: moment.Moment;
    dinnerEnd: moment.Moment;
    thirdDayStart: moment.Moment;
    hotelCheckoutStart: moment.Moment;
    hotelCheckoutEnd: moment.Moment;
    funicularStart: moment.Moment;
    funicularEnd: moment.Moment;
    journeyHomeAirportStart: moment.Moment;
    journeyHomeAirportEnd: moment.Moment;
    journeyHomeStart: moment.Moment;
    journeyHomeEnd: moment.Moment;
  };
};

export const dates: Dates = {
  milestones: {
    packRevealDate,
    scheduleRevealDate,
    finalRevealDate,
    valentinesDayStart,
    valentinesDayEnd,
    birthdayStart,
    birthdayEnd,
  },
  hints: { initReveal, initRevealUntil, lastRevealUntil },
  activities: {
    firstDayStart,
    journeyAirportStart,
    journeyAirportEnd,
    journeyDestinationStart,
    journeyDestinationEnd,
    hotelCheckinStart,
    hotelCheckinEnd,
    secondDayStart,
    breakFastStart,
    breakFastEnd,
    cityTourStart,
    cityTourEnd,
    boatTourStart,
    boatTourEnd,
    dinnerStart,
    dinnerEnd,
    thirdDayStart,
    hotelCheckoutStart,
    hotelCheckoutEnd,
    funicularStart,
    funicularEnd,
    journeyHomeAirportStart,
    journeyHomeAirportEnd,
    journeyHomeStart,
    journeyHomeEnd,
  },
};
