import { useRef, useState } from "react";
import { Box, TextField, Grid, Paper, Stack, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

const Tickets = () => {
  const [addTicket, setAddTicket] = useState(false); // This state trigger show/hide of the text field that adds a title of the ticket.
  const [addedTicketStatus, setAddedTicketStatus] = useState(false); //This state is used to enable/disable the 'Add' button
  const ticketNameRef = useRef(); //using the useRef to pass it as inputRef to the text field
  const handleAdd = () => {
    //THis onclick handler is placed on 'Add' button
    let data = {
      //In this function we will be making a POST request to to Asana using their API to create a ticket. Note - here you will need title of the ticket and workspace ID or parent ID or project ID, we are passing in workspace ID
      data: {
        name: ticketNameRef.current.value,
        workspace: process.env.REACT_APP_ASANA_WORKSPACE, //Replace this with your Asana workspace ID
      },
    };
    if (!addedTicketStatus)
      fetch("https://app.asana.com/api/1.0/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.REACT_APP_ASANA_KEY, //Replace this with your API key
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => setAddedTicketStatus(true));
  };
  const handleClose = () => {
    // This onClick handler is placed on 'Close' button
    setAddTicket(false); // Hides the text field.
    setAddedTicketStatus(false); // Removes the disable status from the button
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {!addTicket && (
        <Button
          variant="outlined"
          color="success"
          onClick={() => setAddTicket(true)}
        >
          Add a ticket to Asana
        </Button>
      )}
      {addTicket && (
        <Paper elevation={6} sx={{ padding: "2rem" }}>
          <Stack spacing={2}>
            <Grid container sx={{ marginTop: "1rem" }}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ticket name"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  inputRef={ticketNameRef}
                />
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                startIcon={addedTicketStatus ? <DoneIcon /> : <AddIcon />}
                variant="outlined"
                color="success"
                onClick={handleAdd}
                disabled={addedTicketStatus}
              >
                {addedTicketStatus ? "Added" : "Add"}
              </Button>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Close
              </Button>
            </Grid>
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default Tickets;
