import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

import CardActionsNav from "../components/CardActionsNav";

function RevealPage() {
  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardHeader
        title={
          <Stack>
            <Typography variant="h6">Vi ska till Bergen!</Typography>
          </Stack>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image="https://content.api.news/v3/images/bin/2227940d253cc2bd4dd5a69819049563"
        alt="Bergen image"
      />
      <CardContent>
        <Stack spacing={2}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            Här, i en stad känd för sin fuktiga atmosfär och dess rikliga
            naturresurser, där bergen är en del av stadsbilden, har vi nått vårt
            slutmål: Bergen.
          </Typography>
        </Stack>
      </CardContent>
      <CardActionsNav pack activity />
    </Card>
  );
}

export default RevealPage;
