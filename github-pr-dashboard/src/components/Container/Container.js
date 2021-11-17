//This component renders the columns and passes the filtered data to next component(List)

//React's and apollo's dependencies
import { React, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

//Material UI dependencies
import {
  Card,
  CardContent,
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";

//Local dependencies
import List from "../List";
import { GET_CONTAINERS, GET_PR } from "../../gql/query";
import "./style.css";

const Container = () => {
  const { data: containerData } = useQuery(GET_CONTAINERS); // Fetching all 4 of our containers from graphQL
  const { loading, data: prData } = useQuery(GET_PR); //Fetching all of the PRs and loading state

  const [containers, setContainers] = useState(); //Using this state to populate the containers.
  const [opened, setOpened] = useState(); //Using this state to store 'open' status PRs
  const [closed, setClosed] = useState(); //Using this state to store 'closed' status PRs
  const [assigned, setAssigned] = useState(); //Using this state to store prs that have someone assigned to it.
  const [draft, setDraft] = useState(); //Using this state to store the draft PRs
  useEffect(() => {
    if (containerData) {
      setContainers(containerData.containers); //Setting up the container state
    }
    if (prData) {
      const pullRequests = prData.pullRequests.map((item) => item.github);

      const openPr = pullRequests[0].filter((item) => item.state === "open");
      setOpened(openPr); // Filtering and populating all the PRs with 'open' status

      const closedPr = pullRequests[0]
        .filter((item) => item.state === "closed")
        .slice(0, 15);
      setClosed(closedPr); // Filtering and populating all the PRs with 'closed' status

      const draftPr = pullRequests[0].filter((item) => item.draft === true);
      setDraft(draftPr); // Filtering and populating all the draft PRs

      const assignedPr = pullRequests[0].filter(
        (item) => item.assignee !== null && item.assignee.login.length > 1
      );
      setAssigned(assignedPr); // Filtering and populating all the PRs who has assignee.
    }
  }, [prData, containerData]); //Re-rendering state whenever PR or Container data changes

  return (
    <>
      {/* The Box component by the MaterialUI is responsible for display the header */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              textAlign="center"
              width="100%"
            >
              Github PR Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="container">
        {/* Checking if all the PRs has been loaded in */}
        {loading && (
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            marginBottom="5rem"
          >
            Loading......
          </Typography>
        )}
        {/* Mapping over the container data to display each container and display its corresponding PRs */}
        {!loading &&
          containers &&
          containers.map((containerName, i) => (
            <Card className="card" key={i}>
              <Typography gutterBottom variant="h5" component="div">
                {containerName.title}
              </Typography>
              <CardContent className="cardContent">
                {/* There are in total 4 identifier created on the backend (merge,review,assigned,draft) based on that associating the PRs */}
                {containerName.identifier === "merge" && closed && (
                  <List data={closed} key={i} />
                )}
                {containerName.identifier === "review" && draft && (
                  <List data={draft} key={i} />
                )}
                {containerName.identifier === "assigned" && assigned && (
                  <List data={assigned} key={i} />
                )}
                {containerName.identifier === "pending" && opened && (
                  <List data={opened} key={i} />
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Container;
