import moment from "moment-timezone";
import HintsPage from "./pages/HintsPage";
import RevealPage from "./pages/RevealPage";
import { Container } from "@mui/system";
import { useWindowSize } from "react-use";
import CustomConfetti from "./components/CustomConfetti";
import { dates } from "./dates";
import { useTime } from "./context/TimeProvider";

const valentinesDayStart = dates.milestones.valentinesDayStart;
const valentinesDayEnd = dates.milestones.valentinesDayEnd;
const birthdayStart = dates.milestones.birthdayStart;
const birthdayEnd = dates.milestones.birthdayEnd;

function App({ revealTime }: { revealTime: moment.Moment }) {
  const { currentTime } = useTime();
  const { width, height } = useWindowSize();

  if (!currentTime) return null;

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
        <HintsPage endTime={revealTime} />
      ) : (
        <RevealPage />
      )}
    </Container>
  );
}

export default App;
