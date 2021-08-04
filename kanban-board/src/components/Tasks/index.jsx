import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Fade, Backdrop, Modal } from "@material-ui/core";
import { useStyles } from "./style";
const Tasks = ({ columns, column }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {columns &&
        column.taskIds &&
        column.taskIds.map((item, index) => {
          return (
            <Draggable key={item._id} draggableId={item._id} index={index}>
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: snapshot.isDragging
                        ? "#19267a"
                        : "#3f51b5",
                      ...provided.draggableProps.style,
                    }}
                    className={classes.card}
                    onClick={handleOpen}
                  >
                    {item.content}{" "}
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <div className={classes.paper}>
                          <h2 id="transition-modal-title">{item.content}</h2>
                          {item.description ? (
                            <p id="transition-modal-description">
                              {item.description}
                            </p>
                          ) : (
                            <p id="transition-modal-description">
                              No description available
                            </p>
                          )}
                        </div>
                      </Fade>
                    </Modal>
                  </div>
                );
              }}
            </Draggable>
          );
        })}
    </div>
  );
};

export default Tasks;
