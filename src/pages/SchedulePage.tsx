import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Container,
  IconButton,
  Box,
} from "@mui/material";
import moment from "moment-timezone";
import CardActionsNav from "../components/CardActionsNav";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useEffect, useState } from "react";

type Activity = {
  title: string;
  subtitle: string;
  startTime: moment.Moment;
  endTime: moment.Moment;
};

type Schedule = {
  id: number;
  day: moment.Moment;
  activities: Activity[];
};

const schedule: Schedule[] = [
  {
    id: 0,
    day: moment.tz("2024-02-16 00:00", "Europe/Stockholm"),
    activities: [
      {
        title: "Åk till flygplats",
        subtitle: "",
        startTime: moment.tz("2024-02-16 15:00", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-16 16:00", "Europe/Stockholm"),
      },
      {
        title: "Flyg till destination",
        subtitle: "",
        startTime: moment.tz("2024-02-16 17:50", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-16 21:25", "Europe/Stockholm"),
      },
      {
        title: "Åk till hotell och check-in",
        subtitle: "",
        startTime: moment.tz("2024-02-16 21:25", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-16 23:00", "Europe/Stockholm"),
      },
    ],
  },
  {
    id: 1,
    day: moment.tz("2024-02-17 00:00", "Europe/Stockholm"),
    activities: [
      {
        title: "Frukost",
        subtitle: "",
        startTime: moment.tz("2024-02-17 10:00", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-17 11:00", "Europe/Stockholm"),
      },
      {
        title: "Stadsvandring",
        subtitle: "Sköna skor",
        startTime: moment.tz("2024-02-17 11:00", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-17 14:00", "Europe/Stockholm"),
      },
      {
        title: "Båttur",
        subtitle: "Kan kräva lite varmare kläder",
        startTime: moment.tz("2024-02-17 14:00", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-17 18:00", "Europe/Stockholm"),
      },
      {
        title: "Middag",
        subtitle: "Lite finare kläder",
        startTime: moment.tz("2024-02-17 20:00", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-17 22:00", "Europe/Stockholm"),
      },
    ],
  },
  {
    id: 2,
    day: moment.tz("2024-02-18 00:00", "Europe/Stockholm"),
    activities: [
      {
        title: "Utcheckning hotell",
        subtitle: "",
        startTime: moment.tz("2024-02-18 07:00", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-18 12:00", "Europe/Stockholm"),
      },
      {
        title: "Linbana",
        subtitle: "Kan kräva lite varmare och skönare kläder",
        startTime: moment.tz("2024-02-18 12:00", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-18 15:00", "Europe/Stockholm"),
      },
      {
        title: "Åk till flygplats",
        subtitle: "",
        startTime: moment.tz("2024-02-18 15:00", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-18 16:00", "Europe/Stockholm"),
      },
      {
        title: "Flyg hem",
        subtitle: "",
        startTime: moment.tz("2024-02-18 18:20", "Europe/Stockholm"),
        endTime: moment.tz("2024-02-18 21:40", "Europe/Stockholm"),
      },
    ],
  },
];

function SchedulePage({
  revealTime,
  show = false,
}: {
  revealTime: moment.Moment;
  show?: boolean;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentDay, setCurrentDay] = useState<Schedule>(schedule[0]);

  useEffect(() => {
    setCurrentDay(schedule.find((el) => el.id === currentIdx) || schedule[0]);
  }, [currentIdx]);

  const ChangeDayHandler = (next: boolean = true) => {
    if (currentIdx === 0 && !next) {
      setCurrentIdx(2);
      return;
    }
    if (currentIdx === 2 && next) {
      setCurrentIdx(0);
      return;
    }
    if (next) {
      setCurrentIdx((prev) => prev + 1);
      return;
    }
    setCurrentIdx((prev) => prev - 1);
  };
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Stack direction="row">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => ChangeDayHandler(false)}>
            <NavigateBeforeIcon />
          </IconButton>
        </Box>
        <Card
          sx={{
            width: 340,
            // height: 400,
          }}
        >
          <CardHeader
            title={
              <Stack>
                <Typography variant="h6">Aktiviteter</Typography>
              </Stack>
            }
            subheader={
              <Typography variant="caption" color="text.secondary">
                {show
                  ? currentDay.day.format("ddd DD/MM yyyy")
                  : `Helgens inbokade aktiviteter kommer att presenteras här ${revealTime
                      .locale("sv")
                      .format("dddd DD MMMM")}`}
              </Typography>
            }
          />
          {show ? (
            <CardContent>
              <Stack spacing={2}>
                {currentDay.activities.map((activity) => {
                  return (
                    <Box>
                      <Stack direction="row" spacing={2}>
                        <Typography variant="caption" color="text.secondary">
                          {activity.startTime.format("HH:mm")}-
                          {activity.endTime.format("HH:mm")}
                        </Typography>
                        <Stack>
                          <Typography variant="caption">
                            {activity.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.subtitle}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            </CardContent>
          ) : null}
          <CardActionsNav pack />
        </Card>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => ChangeDayHandler()}>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Stack>
    </Container>
  );
}

export default SchedulePage;
