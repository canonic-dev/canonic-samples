import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_COLUMN } from "../../GQL/mutations";
import { GET_COLUMN } from "../../GQL/query";
import Column from "../Column";

const Board = () => {
  const [columns, setColumns] = useState(null);
  const [taskIds, setTaskIds] = useState(null);
  const [updateColumn] = useMutation(UPDATE_COLUMN);
  const column = useQuery(GET_COLUMN);
  // After data has been loaded code, useEffect is called to assign column state
  useEffect(() => {
    if (column.data) {
      if (column.data.columns) {
        setColumns(column.data.columns);
      }
    }
  }, [column.data]);
  // useeffect is called to filter the list of task ids from column.
  useEffect(() => {
    if (columns) {
      let someData = Object.entries(columns).map(([columnId, column], index) =>
        column.taskIds.map((item) => item._id)
      );
      setTaskIds(someData);
    }
  }, [columns]);

  // React-beautiful-DND's code that is responsible for drag and drop.
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.taskIds];
      const destItems = [...destColumn.taskIds];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          taskIds: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          taskIds: destItems,
        },
      });
      let sour = sourceItems.map((item) => item._id);
      let dest = destItems.map((item) => item._id);
      // Calling mutation to update the backend after drag and drop has changed task's positions
      updateColumn({
        variables: {
          _id: columns[source.droppableId]._id,
          title: columns[source.droppableId].title,
          taskIds: sour,
        },
      });
      updateColumn({
        variables: {
          _id: columns[destination.droppableId]._id,
          title: columns[destination.droppableId].title,
          taskIds: dest,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.taskIds];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          taskIds: copiedItems,
        },
      });
      let moved = copiedItems.map((item) => item._id);
      //calling Mutation to update in-cloumn drag and drop position change
      updateColumn({
        variables: {
          _id: column._id,
          title: column.title,
          taskIds: moved,
        },
      });
    }
  };
  return (
    <Column
      column={column}
      columns={columns}
      onDragEnd={onDragEnd}
      setColumns={setColumns}
      taskIds={taskIds}
    />
  );
};
export default Board;
