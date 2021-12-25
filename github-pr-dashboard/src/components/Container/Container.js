//This component renders the columns and passes the filtered data to next component(List)

//React's and apollo's dependencies
import { React, useEffect, useState, useMemo, useCallback } from "react";
import { useQuery } from "@apollo/client";

//Material UI dependencies
import {
  Card,
  CardContent,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";

//Local dependencies
import List from "../List";
import { GET_CONTAINERS, GET_PR } from "../../gql/query";
import "./style.css";

const Container = () => {
  const { data: containerData } = useQuery(GET_CONTAINERS); // Fetching all 4 of our containers from graphQL
  const { loading, data: prData } = useQuery(GET_PR); //Fetching all of the PRs and loading state

  const [containers, setContainers] = useState(); //Using this state to populate the containers.

  useEffect(() => {
    if (containerData) {
      setContainers(containerData.containers); //Setting up the container state
    }
  }, [containerData]); //Re-rendering state whenever  Container data changes

  const pullRequests = useMemo(
    () => prData?.pullRequests?.map((item) => item.github)?.[0] || [],
    [prData?.pullRequests] //Mapping over the data and assigning it to 'pullRequests' variable
  );
  const opened = useMemo(
    () => pullRequests.filter((item) => item.state === "open"),
    [pullRequests] // Filtering and populating all the PRs with 'open' status
  );
  const closed = useMemo(
    () => pullRequests.filter((item) => item.state === "closed").slice(0, 15),
    [pullRequests] // Filtering and populating all the PRs with 'closed' status
  );
  const draft = useMemo(
    () => pullRequests.filter((item) => item.draft === true),
    [pullRequests] // Filtering and populating all the draft PRs
  );
  const assigned = useMemo(
    () =>
      pullRequests.filter(
        (item) => item.assignee !== null && item.assignee.login.length > 1
      ),
    [pullRequests] // Filtering and populating all the PRs who has assignee.
  );

  // We are using this util function to assign a background color based on the column's identifier.
  const setColor = useCallback((identifier) => {
    let color = "";
    switch (identifier) {
      case "merge":
        color = "#6fbf73";
        break;
      case "pending":
        color = "#4dabf5";
        break;
      case "assigned":
        color = "#ffcd38";
        break;
      case "review":
        color = "#ffa733";
        break;
      default:
        color = "";
    }
    return color;
  }, []);

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
              {/* The Stack is a Material UI component, it will display a content inside a square box */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 2,
                  py: 1,
                  mb: 2,
                  bgcolor: setColor(containerName.identifier), //Here we are calling the setColor function to dynamically assigning a background color based on name/identifier of the container.
                  color: "#FFFFFF",
                  borderRadius: "4px",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{
                    width: "100%",
                    paddingTop: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  {containerName.title}
                </Typography>
              </Stack>

              <CardContent className="cardContent">
                {/* There are in total 4 identifier created on the backend (merge,review,assigned,draft) based on that associating the PRs */}
                {containerName.identifier === "merge" && closed && (
                  <List
                    data={closed}
                    key={i}
                    identifier={containerName.identifier}
                  />
                )}
                {containerName.identifier === "review" && draft && (
                  <List
                    data={draft}
                    key={i}
                    identifier={containerName.identifier}
                  />
                )}
                {containerName.identifier === "assigned" && assigned && (
                  <List
                    data={assigned}
                    key={i}
                    identifier={containerName.identifier}
                  />
                )}
                {containerName.identifier === "pending" && opened && (
                  <List
                    data={opened}
                    key={i}
                    identifier={containerName.identifier}
                  />
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Container;
