import { Card, CardHeader, Container, Typography } from "@mui/material";
import { useTime } from "../context/TimeProvider";

const Map = ({ revealTime }: { revealTime: moment.Moment }) => {
  const { currentTime } = useTime();
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {revealTime.isBefore(currentTime) ? (
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1UGtlTragqaATZoKsDY6K2V_0rZXGxwk&ehbc=2E312F&noprof=1"
          width="100%"
          height="80%"
        ></iframe>
      ) : (
        <Card>
          <CardHeader
            title={<Typography variant="h6">Karta</Typography>}
            subheader={
              <Typography variant="caption" color="text.secondary">
                Håll utkik här, en karta med sevärdheter att presenteras{" "}
                {revealTime.locale("sv").format("dddd DD MMMM")}
              </Typography>
            }
          />
        </Card>
      )}
    </Container>
  );
};

export default Map;
