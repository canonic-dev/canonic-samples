import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { Box, TextField, Grid, Paper, Stack, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { ADD_NOTE } from "../../gql/mutation";
const Notes = ({ _id, noteDescription, setOpenAdd, setDisplayNotes }) => {
  const descriptionRef = useRef(); // Using useRef to pass it as input ref in text field
  const [addNote] = useMutation(ADD_NOTE); // Calling in the mutation to add a note.

  const handleClick = () => {
    //This onclick function is placed at 'Save' button.
    let description = descriptionRef.current.value; //Grabs the value of text field
    if (description.replace(/\s+/g, " ").length) {
      addNote({
        variables: {
          _id,
          notes: [...noteDescription, { description }], // Returns a new array consisting of all the older note with a new note.
        },
      });
      setDisplayNotes((oldList) => [...oldList, { description }]); //Updates the state with same data so it will re-render the state
      setOpenAdd(false); //Closes the text field
    }
  };
  const handleClose = () => {
    setOpenAdd(false); //Closes the text field
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={6} sx={{ padding: "2rem" }}>
        <Stack spacing={2}>
          <Grid container sx={{ marginTop: "1rem" }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
                rows={2}
                sx={{ width: "100%" }}
                inputRef={descriptionRef}
              />
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <LoadingButton
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              sx={{ width: "25%" }}
              onClick={handleClick}
              color="success"
            >
              Save
            </LoadingButton>
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "25%" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Grid>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Notes;
