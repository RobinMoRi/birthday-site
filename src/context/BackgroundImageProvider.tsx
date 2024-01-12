import React, { createContext, useState, useEffect } from "react";
import moment from "moment-timezone";
import { dates } from "../dates";

export const BackgroundImageContext = createContext({
  backgroundImage: "xingxingmonkeyy.png",
});

export const BackgroundImageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [backgroundImage, setBackgroundImage] = useState("xingxingmonkeyy.png");

  useEffect(() => {
    const updateBackgroundImage = () => {
      const { birthdayStart, birthdayEnd } = dates.milestones;

      if (moment().isBetween(birthdayStart, birthdayEnd)) {
        setBackgroundImage("present.png");
      } else {
        setBackgroundImage("xingxingmonkeyy.png");
      }
    };

    updateBackgroundImage();
    const interval = setInterval(updateBackgroundImage, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundSize = "10%";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [backgroundImage]);

  return (
    <BackgroundImageContext.Provider value={{ backgroundImage }}>
      {children}
    </BackgroundImageContext.Provider>
  );
};
