import { useState, useEffect } from "react";
import moment from "moment-timezone";
import HintsPage from "./pages/HintsPage";
import RevealPage from "./pages/RevealPage";
import { Container } from "@mui/system";
import { useWindowSize } from "react-use";
import CustomConfetti from "./components/CustomConfetti";
import { dates } from "./dates";

const valentinesDayStart = dates.milestones.valentinesDayStart;
const valentinesDayEnd = dates.milestones.valentinesDayEnd;
const birthdayStart = dates.milestones.birthdayStart;
const birthdayEnd = dates.milestones.birthdayEnd;

function App({ revealTime }: { revealTime: moment.Moment }) {
  const [currentTime, setCurrentTime] = useState(moment());
  const { width, height } = useWindowSize();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {currentTime.isAfter(birthdayStart) &&
      currentTime.isBefore(birthdayEnd) ? (
        <CustomConfetti width={width} height={height} />
      ) : null}
      {currentTime.isAfter(valentinesDayStart) &&
      currentTime.isBefore(valentinesDayEnd) ? (
        <CustomConfetti width={width} height={height} drawHearts />
      ) : null}
      {currentTime.isBefore(revealTime) ? (
        <HintsPage endTime={revealTime} currentTime={currentTime} />
      ) : (
        <RevealPage />
      )}
    </Container>
  );
}

export default App;
