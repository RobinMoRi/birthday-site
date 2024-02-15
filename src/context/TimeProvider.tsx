import React, { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";

interface TimeContextProps {
  currentTime: moment.Moment | null;
}

type WorldTimeApi = {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from?: null;
  dst_offset: string;
  dst_until?: null;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
};

const TimeContext = createContext<TimeContextProps>({
  currentTime: null,
});

export const TimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTime, setCurrentTime] = useState<moment.Moment | null>(null);

  useEffect(() => {
    const fetchTime = async () => {
      // Replace with your API call
      const response = await fetch(
        "http://worldtimeapi.org/api/timezone/Europe/Stockholm"
      );
      const data: WorldTimeApi = await response.json();
      const fetchedTime = moment(data.datetime);
      setCurrentTime(fetchedTime);
    };

    // Fetch time from the API initially and then every hour
    fetchTime();
    const fetchInterval = setInterval(() => {
      fetchTime();
    }, 3600000); // 3600000 milliseconds = 1 hour

    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    // Update currentTime every second
    const updateInterval = setInterval(() => {
      if (currentTime) {
        setCurrentTime(currentTime.clone().add(1, "seconds"));
      }
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [currentTime]);

  return (
    <TimeContext.Provider value={{ currentTime }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => useContext(TimeContext);
