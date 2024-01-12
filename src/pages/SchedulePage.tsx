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
import { Schedule, schedule } from "../schedule";

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
