import { React, useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Fade,
  Modal,
  Grid,
  Paper,
  Button,
  Backdrop,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Notes from "../Notes";
import Tickets from "../Tickets";
import Deals from "../Deals";
import DetailsCard from "../DetailsCard";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function Modals({ data, open, setIsOpen }) {
  const [openAdd, setOpenAdd] = useState(false); //Using this show/hide the Add notes text field.
  const [displayNotes, setDisplayNotes] = useState(); // Using this state to store all the notes from data prop
  const handleClose = useCallback(() => {
    setIsOpen(!open); // We are getting this state as props and on close it will hide the modal.
  }, [open, setIsOpen]);

  useEffect(() => {
    //Using useEffect hook to populate displayNotes state with notes from data props.
    data && setDisplayNotes(data.notes);
  }, [data]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {data && (
          <Fade in={open}>
            <Grid
              container
              spacing={1}
              sx={{
                width: "95%",
                height: "95%",
                backgroundColor: "white",
                position: "absolute",
                top: "4%",
                left: "3%",
              }}
            >
              <Grid item xs={3} sx={{ padding: "5px" }}>
                <DetailsCard
                  name={data.name}
                  company={data.company}
                  email={data.email}
                  phone={data.phone}
                  labels={data.labels}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ backgroundColor: "lightgray", padding: "5px" }}
              >
                <Item sx={{ backgroundColor: "inherit", marginTop: "2rem" }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Notes
                  </Typography>
                  {!openAdd && (
                    <Box sx={{ flexGrow: 1 }}>
                      <Paper
                        elevation={1}
                        sx={{
                          padding: "2rem",
                          height: "30rem",
                          overflow: "auto",
                        }}
                      >
                        {displayNotes?.map((note) => (
                          <List>
                            <ListItem sx={{ borderBottom: "1px solid black" }}>
                              <ListItemText>{note.description}</ListItemText>
                            </ListItem>
                          </List>
                        ))}
                        {!openAdd && (
                          <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{ marginTop: "1rem" }}
                            onClick={() => setOpenAdd(true)}
                            color="success"
                          >
                            Add a note
                          </Button>
                        )}
                      </Paper>
                    </Box>
                  )}
                  {openAdd && (
                    <Notes
                      setOpenAdd={setOpenAdd}
                      _id={data._id}
                      noteDescription={data?.notes?.map((item) => ({
                        description: item.description,
                      }))}
                      setDisplayNotes={setDisplayNotes}
                    />
                  )}
                </Item>
              </Grid>
              <Grid item xs={3} sx={{ padding: "5px", marginTop: "2rem" }}>
                <Item>
                  <Typography variant="h6" gutterBottom component="div">
                    Deals
                  </Typography>
                  <Typography variant="p" gutterBottom component="div">
                    Track the revenue opportunities associated with this record
                  </Typography>
                  <Deals userId={data._id} />
                </Item>
                <Item sx={{ marginTop: "2rem" }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Tickets
                  </Typography>
                  <Typography variant="p" gutterBottom component="div">
                    Track the customer requests associated with this record
                  </Typography>
                  <Tickets />
                </Item>
              </Grid>
            </Grid>
          </Fade>
        )}
      </Modal>
    </div>
  );
}
