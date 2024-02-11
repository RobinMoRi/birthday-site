import { useEffect, useState } from "react";
import { createHints, Hint } from "./HintsPage";
import { useTime } from "../context/TimeProvider";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CardActionsNav from "../components/CardActionsNav";

const allHints = createHints();

const PreviousHints = () => {
  const { currentTime } = useTime();
  const [hints, setHints] = useState<Hint[]>([]);

  useEffect(() => {
    const newHints = [...allHints]
      .sort((a, b) => {
        return b.revealTime.diff(a.revealTime);
      })
      .filter((hint) => hint.revealTime.isBefore(currentTime));
    newHints.pop();
    setHints(newHints);
  }, [currentTime]);
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 340 }}>
        <CardHeader
          title={<Typography variant="h6">Tidigare Ledtrådar</Typography>}
        />
        <CardContent
          sx={{
            maxHeight: 400,
            overflow: "scroll",
          }}
        >
          <Stack spacing={2}>
            {hints.map((hint) => {
              return (
                <Typography
                  key={hint.hint}
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic" }}
                >
                  <b>{hint.revealTime.format("ddd DD/MM")}</b>: {hint.hint}
                </Typography>
              );
            })}
          </Stack>
        </CardContent>
        <CardActionsNav pack activity />
      </Card>
    </Container>
  );
};

export default PreviousHints;
