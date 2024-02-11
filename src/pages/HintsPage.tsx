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
import { dates } from "../dates";
import { useTime } from "../context/TimeProvider";

export type Hint = {
  hint: string;
  revealTime: moment.Moment;
  revealUntil: moment.Moment;
};

const initHint: Hint = {
  hint: `Varje dag från och med ${dates.hints.initRevealUntil.format(
    "D MMMM"
  )} kommer du få en ny ledtråd här. Lösningen presenteras ${dates.milestones.finalRevealDate.format(
    "D MMMM"
  )}, kl ${dates.milestones.finalRevealDate.format("HH:mm")}`,
  revealTime: dates.hints.initReveal,
  revealUntil: dates.hints.initRevealUntil,
};

export function createHints() {
  const hintsStrings: string[] = [
    // "I de äldstas fotspår: I forntidens skugga, där jättar steg, vilar hemligheter tunga som berg.",
    // "Ur dimmornas bok: I sagornas värld, där dimman dansar, viskar naturen om en plats fjärran.",
    // "Tidens vittne: Där århundraden samlas och berättar i tystnad om evighetens röst.",
    // "Vattnets sång: Lyssna till strömmarnas viskningar, de bär på hemligheter från djupa dalar.",
    // "Väktarens blick: De ståtliga väktarna som skådar över havet, vaktar en port till det förgångna.",
    // "Naturens katedral: Där gröna spiror reser sig mot skyn, i harmoni med stenens kör.",
    // "Livets labyrint: Följ stigarna som vindlar likt livets gång, där varje korsning bär en historia.",
    // "Molnens lekplats: Skåda ovan, där molnen formar skulpturer i en himmelsk trädgård.",
    // "Regnets rytm: Känn dropparnas trumslag mot marken, en symfoni av naturen själv.",
    // "Fiskarens dröm: Där hav möter land, och guld glimmar i nätens djup.",
    // "Fjordarnas famn: I vikarnas vagga vilar minnen av en tid då landet formades.",
    // "Nattens fyrverkeri: När himlen flammar i norrsken, avslöjas en värld bortom vår.",
    // "Stadens hjärta: Där kullersten möter havsbris, och historien viskar i varje gränd.",
    // "De sju bergs hemlighet: Nära nu, de vakar tyst – en ledtråd i sig själva, sju talismaner.",
    "Där nordens ljus och havets djup dansar i harmoni, startar vår färd mot en stad insvept i dimmans och historiens slöja.",
    "Vi söker en plats där gammal handel och nya vägar möts, där ekot av medeltida samtal fortfarande hörs.",
    "I en stad där sjöfararnas sånger blandas med moderna melodier, letar vi efter spår av gamla berättelser.",
    "Vi reser mot en plats där naturens kraftfulla vakter speglar sig i vattendragen, i en stad där varje droppe berättar en historia.",
    "I skuggan av historiska handelshus och nutida ambitioner, ligger vår destination, där tidens tand sätter sina spår.",
    "Vår färd leder oss till en hamn där forntid möter framtid, där vatten och vind spelar huvudrollen.",
    "I en värld där gammalt trä och nya tankar förenas, letar vi efter en stad som värnar om både sitt förflutna och sin framtid.",
    "Vi söker en plats där höjderna vittnar om historiens djup och där vattnets röst leder oss framåt.",
    "Mot en stad vi styr, där fiskarnas arv fortfarande andas genom gatorna, och där nutidens äventyr tar sin början.",
    "I skuggan av sjöfararnas minnen och nutidens strävanden, når vi en plats där varje gata har sin egen saga att berätta.",
    "Där hav möter land, i en stad omgiven av naturens stolthet, söker vi spår av en tid då segel var maktens symbol.",
    "Vi anländer till en plats där forntidens handelsvägar fortfarande känns i stenens och vattnets viskningar.",
    "I vår sökning efter svaret, kommer vi till en stad känd för sitt väder, där himlen gråter lika ofta som den ler.",
    "Vi närmar oss en stad där det gamla möter det nya i en symfoni av kultur och natur, där regnet sjunger sin egen melodi.",
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
    hint: "Sista ledtråden: Vi befinner oss i en stad omgiven av majestätiska höjder, där historien och naturen går hand i hand.",
    revealTime: hints[hints.length - 1].revealUntil.clone(),
    revealUntil: dates.hints.lastRevealUntil,
  });

  return hints;
}

function HintsPage({ endTime }: { endTime: moment.Moment }) {
  const [hints, _] = useState<Hint[]>(createHints());
  const [currentHint, setCurrentHint] = useState<Hint>(initHint);
  const [nextHint, setNextHint] = useState<Hint | null>(initHint);
  const { currentTime } = useTime();

  const getCurrentHint = () => {
    if (!currentTime) return hints[0];
    return (
      hints.find(
        (el) =>
          currentTime.isAfter(el.revealTime) &&
          currentTime.isBefore(el.revealUntil)
      ) || hints[0]
    );
  };

  const getNextHint = () => {
    if (!currentTime) return null;
    return (
      hints[
        hints.findIndex(
          (el) =>
            currentTime.isAfter(el.revealTime) &&
            currentTime.isBefore(el.revealUntil)
        ) + 1
      ] || null
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
              {currentTime?.format("ddd DD MMM, HH:mm")}
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
          {nextHint ? (
            <Stack>
              <Typography variant="caption">Nästa ledtråd:</Typography>
              <CountDown
                startTime={currentTime}
                endTime={nextHint.revealTime}
              />
            </Stack>
          ) : null}
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
