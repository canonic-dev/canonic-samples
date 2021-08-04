import React from "react";
import Tasks from "../Tasks";
import NewTasks from "../NewTask";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./style";
const Column = ({ column, columns, onDragEnd, setColumns, taskIds }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {column.loading ? (
        <CircularProgress />
      ) : (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {columns &&
            Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div className={classes.column} key={columnId}>
                  <h2>{column.title}</h2>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "#eaecfa"
                                : "#eaecfa",
                            }}
                            className={classes.dragging}
                          >
                            <Tasks columns={columns} column={column} />
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                  {columns && (
                    <NewTasks
                      taskIds={taskIds}
                      columnId={column._id}
                      columnNumber={columnId}
                      columnTitle={column.title}
                    />
                  )}
                </div>
              );
            })}
        </DragDropContext>
      )}
    </div>
  );
};

export default Column;
