import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import AddIcon from "@material-ui/icons/Add";
import LoopIcon from "@material-ui/icons/Loop";
import { TextField, Grid, Button } from "@material-ui/core";
import { UPDATE_COLUMN, ADD_TASK } from "../../GQL/mutations";
import { useStyles } from "./style";

const NewTask = ({ taskIds, columnId, columnNumber, columnTitle }) => {
  const classes = useStyles();
  const [updateColumn, { loading: UCLoading }] = useMutation(UPDATE_COLUMN);
  const [createTask, { data, loading: ATLoading }] = useMutation(ADD_TASK);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  // Sets up the content
  const handleOnChange = (event) => {
    setContent(event.target.value);
  };

  // Sets up the description
  const handleOnChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  // Function to fire the mutation with data gather from input fields
  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (content) {
      createTask({
        variables: {
          content: content,
          description: description,
        },
      });
    }
    setContent("");
    setDescription("");
  };
  // Updating the column's taskIds array with recently created task's id
  useEffect(() => {
    if (data) {
      if (data.createTask) {
        updateColumn({
          variables: {
            _id: columnId,
            title: columnTitle,
            taskIds: [...taskIds[columnNumber], data.createTask._id],
          },
        });
      }
    }
  }, [data]);
  return (
    <div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AddIcon />
          </Grid>
          <Grid item>
            <TextField
              value={content}
              id={`input-with-icon-grid${columnNumber}`}
              label="Add a new task"
              onChange={handleOnChange}
            />
            <br />
            <TextField
              value={description}
              id={`input-with-icon-grid${columnNumber + 1}`}
              label="description (optional)"
              onChange={handleOnChangeDescription}
            />
          </Grid>
        </Grid>
        <Button
          onClick={handleOnSubmit}
          style={{
            marginTop: 5,
          }}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={UCLoading || ATLoading ? <LoopIcon /> : <AddIcon />}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default NewTask;
