import React from "react";
import moment from "moment-timezone";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

enum Unit {
  MONTHS = "månader",
  DAYS = "dagar",
  HOURS = "timmar",
  MINUTES = "minuter",
  SECONDS = "sekunder",
}

const units = [Unit.MONTHS, Unit.DAYS, Unit.HOURS, Unit.MINUTES, Unit.SECONDS];

function CountDown({
  startTime,
  endTime,
}: {
  startTime: moment.Moment;
  endTime: moment.Moment;
}) {
  console.debug(startTime, endTime);
  return (
    <Stack direction="row" spacing={1}>
      {units.map((unit, idx) => {
        const diff = moment.duration(endTime.diff(startTime));
        let unitDiff = 0;
        if (unit === Unit.MONTHS) unitDiff = diff.months();
        if (unit === Unit.DAYS) unitDiff = diff.days();
        if (unit === Unit.HOURS) unitDiff = diff.hours();
        if (unit === Unit.MINUTES) unitDiff = diff.minutes();
        if (unit === Unit.SECONDS) unitDiff = diff.seconds();
        return (
          <React.Fragment key={unit}>
            <Stack alignItems="center">
              <Typography>{unitDiff}</Typography>
              <Typography variant="caption" color="text.secondary">
                {unit}
              </Typography>
            </Stack>
            {idx === units.length - 1 ? null : (
              <Typography color="text.secondary">:</Typography>
            )}
          </React.Fragment>
        );
      })}
    </Stack>
  );
}

export default CountDown;
