import { dates } from "./dates";

type Activity = {
  title: string;
  subtitle: string;
  startTime: moment.Moment;
  endTime: moment.Moment;
};

export type Schedule = {
  id: number;
  day: moment.Moment;
  activities: Activity[];
};

export const schedule: Schedule[] = [
  {
    id: 0,
    day: dates.activities.firstDayStart,
    activities: [
      {
        title: "Åk till flygplats",
        subtitle: "",
        startTime: dates.activities.journeyAirportStart,
        endTime: dates.activities.journeyAirportEnd,
      },
      {
        title: "Flyg till destination",
        subtitle: "",
        startTime: dates.activities.journeyDestinationStart,
        endTime: dates.activities.journeyDestinationEnd,
      },
      {
        title: "Åk till hotell och check-in",
        subtitle: "",
        startTime: dates.activities.hotelCheckinStart,
        endTime: dates.activities.hotelCheckinEnd,
      },
    ],
  },
  {
    id: 1,
    day: dates.activities.secondDayStart,
    activities: [
      {
        title: "Frukost",
        subtitle: "",
        startTime: dates.activities.breakFastStart,
        endTime: dates.activities.breakFastEnd,
      },
      {
        title: "Stadsvandring",
        subtitle: "Sköna skor",
        startTime: dates.activities.cityTourStart,
        endTime: dates.activities.cityTourEnd,
      },
      {
        title: "Båttur",
        subtitle: "Kan kräva lite varmare kläder",
        startTime: dates.activities.boatTourStart,
        endTime: dates.activities.boatTourEnd,
      },
      {
        title: "Middag",
        subtitle: "Lite finare kläder",
        startTime: dates.activities.dinnerStart,
        endTime: dates.activities.dinnerEnd,
      },
    ],
  },
  {
    id: 2,
    day: dates.activities.thirdDayStart,
    activities: [
      {
        title: "Utcheckning hotell",
        subtitle: "",
        startTime: dates.activities.hotelCheckoutStart,
        endTime: dates.activities.hotelCheckoutEnd,
      },
      {
        title: "Linbana",
        subtitle: "Kan kräva lite varmare och skönare kläder",
        startTime: dates.activities.funicularStart,
        endTime: dates.activities.funicularEnd,
      },
      {
        title: "Åk till flygplats",
        subtitle: "",
        startTime: dates.activities.journeyHomeAirportStart,
        endTime: dates.activities.journeyHomeAirportEnd,
      },
      {
        title: "Flyg hem",
        subtitle: "",
        startTime: dates.activities.journeyHomeStart,
        endTime: dates.activities.journeyHomeEnd,
      },
    ],
  },
];
