import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import CountDown from "../components/CountDown";
import CardActionsNav from "../components/CardActionsNav";

const localeString = "Europe/Stockholm";

type Hint = {
  hint: string;
  revealTime: moment.Moment;
  revealUntil: moment.Moment;
};

const initHint: Hint = {
  hint: "Varje dag från och med 1 februari kommer du få en ny ledtråd här. Lösningen presenteras 16 februari, kl 15:00",
  revealTime: moment.tz("2024-01-01 00:00", localeString),
  revealUntil: moment.tz("2024-02-01 00:00", localeString),
};

function createHints() {
  const hintsStrings: string[] = [
    "I de äldstas fotspår: I forntidens skugga, där jättar steg, vilar hemligheter tunga som berg.",
    "Ur dimmornas bok: I sagornas värld, där dimman dansar, viskar naturen om en plats fjärran.",
    "Tidens vittne: Där århundraden samlas och berättar i tystnad om evighetens röst.",
    "Vattnets sång: Lyssna till strömmarnas viskningar, de bär på hemligheter från djupa dalar.",
    "Väktarens blick: De ståtliga väktarna som skådar över havet, vaktar en port till det förgångna.",
    "Naturens katedral: Där gröna spiror reser sig mot skyn, i harmoni med stenens kör.",
    "Livets labyrint: Följ stigarna som vindlar likt livets gång, där varje korsning bär en historia.",
    "Molnens lekplats: Skåda ovan, där molnen formar skulpturer i en himmelsk trädgård.",
    "Regnets rytm: Känn dropparnas trumslag mot marken, en symfoni av naturen själv.",
    "Fiskarens dröm: Där hav möter land, och guld glimmar i nätens djup.",
    "Fjordarnas famn: I vikarnas vagga vilar minnen av en tid då landet formades.",
    "Nattens fyrverkeri: När himlen flammar i norrsken, avslöjas en värld bortom vår.",
    "Stadens hjärta: Där kullersten möter havsbris, och historien viskar i varje gränd.",
    "De sju bergs hemlighet: Nära nu, de vakar tyst – en ledtråd i sig själva, sju talismaner.",
  ];
  const hints: Hint[] = [];

  hints.push(initHint);

  let today = hints[0].revealUntil.clone();

  for (let hint of hintsStrings) {
    let tomorrow = today.clone().add(1, "days");
    const hintObj: Hint = {
      hint: hint,
      revealTime: today,
      revealUntil: tomorrow,
    };
    hints.push(hintObj);
    today = tomorrow;
  }

  hints.push({
    hint: "Nordens andetag: Där hav möter himmel och marken talar i uråldriga viskningar, finner du en hamn för själen, en stad gömd bland titaners vila.",
    revealTime: hints[hints.length - 1].revealUntil.clone(),
    revealUntil: moment.tz("2024-02-16 15:00", localeString),
  });

  return hints;
}

function HintsPage({
  currentTime,
  endTime,
}: {
  currentTime: moment.Moment;
  endTime: moment.Moment;
}) {
  const [hints, _] = useState<Hint[]>(createHints());
  const [currentHint, setCurrentHint] = useState<Hint>(initHint);
  const [nextHint, setNextHint] = useState<Hint>(initHint);

  const getCurrentHint = () => {
    return (
      hints.find(
        (el) =>
          currentTime.isAfter(el.revealTime) &&
          currentTime.isBefore(el.revealUntil)
      ) || hints[0]
    );
  };

  const getNextHint = () => {
    return (
      hints[
        hints.findIndex(
          (el) =>
            currentTime.isAfter(el.revealTime) &&
            currentTime.isBefore(el.revealUntil)
        ) + 1
      ] || hints[0]
    );
  };

  useEffect(() => {
    setCurrentHint(getCurrentHint());
    setNextHint(getNextHint());
  }, [currentTime]);

  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardHeader
        title={
          <Stack>
            <Typography variant="h6">Dagens Ledtråd</Typography>
            <Typography color="text.secondary">
              {moment().format("ddd DD MMM")}
            </Typography>
          </Stack>
        }
      />
      <CardContent>
        <Stack spacing={2}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            {currentHint?.hint}
          </Typography>
          <Stack>
            <Typography variant="caption">Nästa ledtråd:</Typography>
            <CountDown startTime={currentTime} endTime={nextHint.revealTime} />
          </Stack>
          <Stack>
            <Typography variant="caption">Lösningen presenteras om:</Typography>

            <CountDown startTime={currentTime} endTime={endTime} />
          </Stack>
        </Stack>
      </CardContent>
      <CardActionsNav pack activity />
    </Card>
  );
}

export default HintsPage;
