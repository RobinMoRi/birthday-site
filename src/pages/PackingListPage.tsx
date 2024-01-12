import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Container,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemText,
  TextField,
  IconButton,
  InputAdornment,
  Chip,
  Fade,
  Grid,
  Collapse,
} from "@mui/material";
import { useEffect, useState } from "react";
import CardActionsNav from "../components/CardActionsNav";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { TransitionGroup } from "react-transition-group";
import { PackItem, defaultPackingList } from "../packinglist";
import moment from "moment-timezone";

function PackingListPage({
  revealTime,
  show = false,
}: {
  revealTime: moment.Moment;
  show?: boolean;
}) {
  const [items, setItems] = useState<PackItem[]>(() => {
    const saved = localStorage.getItem("items");
    return saved !== null ? JSON.parse(saved) : defaultPackingList;
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleToggle = (idx: number) => {
    setItems((prev) => {
      return [...prev].map((el, elIdx) => {
        if (elIdx === idx) {
          return { ...el, packed: !el.packed };
        }
        return el;
      });
    });
  };

  const handleAddItem = () => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems.push({ item: newItem, packed: false });
      setNewItem("");
      return newItems;
    });
  };

  const handleToggleSelectedItems = (itemIdx: number) => {
    setSelectedItems((prev) => {
      let newSelection = [...prev];
      if ([...prev].includes(itemIdx)) {
        const idx = newSelection.indexOf(itemIdx);
        newSelection.splice(idx, 1);
      } else {
        newSelection.push(itemIdx);
      }
      return newSelection;
    });
  };

  const handleDeleteItems = () => {
    setItems((prev) => {
      return prev.filter((_, index) => !selectedItems.includes(index));
    });
    setSelectedItems([]);
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
      <Card sx={{ maxWidth: 340 }}>
        <CardHeader
          title={<Typography variant="h6">Packlista</Typography>}
          subheader={
            <Stack>
              {show ? (
                <>
                  <Typography variant="caption" color="text.secondary">
                    Väska under sätet: (40 x 30 x 15 cm)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Handbage 8kg: (55 x 40 x 23 cm)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Lägg gärna till fler saker att packa ner (går att lägga till
                    längs ned i listan)
                  </Typography>
                  <Grid container>
                    <Grid item xs={6}>
                      <Fade in={selectedItems.length > 0}>
                        <Chip
                          label="Ta bort object"
                          onDelete={handleDeleteItems}
                          deleteIcon={<DeleteIcon />}
                          variant="outlined"
                          color="error"
                        />
                      </Fade>
                    </Grid>
                    <Grid item xs={6}>
                      <Fade in={selectedItems.length > 0}>
                        <Chip
                          label="Avmarkera alla"
                          onDelete={() => setSelectedItems([])}
                          deleteIcon={<CheckBoxOutlineBlankIcon />}
                          variant="outlined"
                        />
                      </Fade>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  Håll utkik här, en packlista kommer att presenteras{" "}
                  {revealTime.locale("sv").format("dddd DD MMMM")}
                </Typography>
              )}
            </Stack>
          }
        />
        {show ? (
          <CardContent
            sx={{
              maxHeight: 400,
              overflow: "scroll",
            }}
          >
            <List
              dense
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <TransitionGroup>
                {items.map((value, idx) => {
                  const labelId = `checkbox-list-secondary-label-${value.item}`;
                  return (
                    <Collapse key={`collapse-${value.item}-${idx}`}>
                      <ListItem
                        key={`${value.item}-${idx}`}
                        disablePadding
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            onChange={() => handleToggle(idx)}
                            checked={value.packed}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        }
                      >
                        <ListItemButton
                          selected={selectedItems.includes(idx)}
                          onClick={() => handleToggleSelectedItems(idx)}
                        >
                          <ListItemText
                            sx={{
                              textDecoration: value.packed
                                ? "line-through"
                                : null,
                            }}
                            id={labelId}
                            primary={
                              <Typography
                                color={
                                  value.packed
                                    ? "text.secondary"
                                    : "text.primary"
                                }
                                variant="caption"
                              >
                                {value.item}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    </Collapse>
                  );
                })}
              </TransitionGroup>
              <ListItem>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={newItem}
                  size="small"
                  fullWidth
                  onChange={(ev) => setNewItem(ev.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="add" onClick={handleAddItem}>
                          <PostAddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
            </List>
          </CardContent>
        ) : null}
        <CardActionsNav activity />
      </Card>
    </Container>
  );
}

export default PackingListPage;
