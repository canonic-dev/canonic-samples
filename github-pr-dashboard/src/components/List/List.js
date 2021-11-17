// This component displays the list of PRs

//React's and apollo's dependencies
import { React, useState, useCallback } from "react";

//Material UI's dependencies
import { Avatar, Paper, Typography } from "@mui/material";

//Local dependencies
import Modals from "../Modal";
import "./style.css";

const List = ({ data }) => {
  const [isOpen, setIsOpen] = useState(); // Using this state to keep track of onClick function to open a modal
  const [modalData, setModalData] = useState(); // Using this state to store the clicked upon PR's data.

  const handleClick = useCallback((pr) => {
    //Handle click function to listens to onClick event and sets 'setIsOpen' to true which is needed to open and close the modal
    setIsOpen(true);
    setModalData(pr); //This data is used in Modal to display more info about the particular PR
  }, []);

  return (
    <>
      {/* Mapping over the PR data prop we received from 'Container' component */}
      {data.map((item, i) => (
        <Paper
          elevation={3}
          sx={{ padding: 2, margin: 2, cursor: "pointer" }}
          key={i}
          onClick={() => handleClick(item)}
        >
          <Typography variant="body1" color="text.secondary">
            {/* Displays the PR's title */}
            {item.title}
          </Typography>
          <div className="avatar">
            {/* Displays the user's profile picture */}
            <Avatar
              alt={item.user.login}
              src={item.user.avatar_url}
              sx={{ width: 24, height: 24 }}
            />
            {/* Displays their username */}
            <Typography variant="body2" sx={{ ml: 1 }}>
              {item.user.login}
            </Typography>
          </div>
        </Paper>
      ))}
      <Modals open={isOpen} setOpen={setIsOpen} pr={modalData} />
    </>
  );
};

export default List;
