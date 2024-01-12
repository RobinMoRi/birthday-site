import { Button, CardActions } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

function CardActionsNav({
  pack = false,
  activity = false,
}: {
  pack?: boolean;
  activity?: boolean;
}) {
  return (
    <CardActions sx={{ display: "flex", justifyContent: "center" }}>
      {pack ? (
        <Button
          startIcon={<ChecklistIcon />}
          size="small"
          variant="outlined"
          href="/packlista"
        >
          Packlista
        </Button>
      ) : null}
      {activity ? (
        <Button
          startIcon={<LocalActivityIcon />}
          size="small"
          variant="outlined"
          href="/aktiviteter"
        >
          Aktiviteter
        </Button>
      ) : null}
    </CardActions>
  );
}

export default CardActionsNav;
