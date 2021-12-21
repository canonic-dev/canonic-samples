//This component will render the top app bar.

//Importing React,Apollo,MaterialUI
import React, { useEffect, useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

//Importing query and mutations declared in gql directory
import { LOGIN_WITH_GOOGLE } from "../../gql/query";
import { LOGIN_WITH_GOOGLE_MUTATION } from "../../gql/mutation";

function Header({ setIsLoggedIn, isLoggedIn }) {
  const [accessToken, setAccessToken] = useState(); //Using this state to Access token, using it to maintain sessions.
  const { data, loading: loginDataLoading } = useQuery(LOGIN_WITH_GOOGLE); //Query for Google 0auth link
  const [loginMutation, { data: mutationData }] = useMutation(
    LOGIN_WITH_GOOGLE_MUTATION
  ); //This mutation will pull in the user's details after they have logged in.
  useEffect(() => {
    const urlCode = new URLSearchParams(window.location.search).get("code"); //We receive a code after a successful sign in, here pulling that code from the URL
    if (urlCode) {
      loginMutation({ variables: { code: urlCode, service: "GOOGLE" } }); //Feeding in the code along with servive to the mutation.
    }
  }, []);
  useEffect(() => {
    setAccessToken(mutationData?.loginForLogin?.token);
    setIsLoggedIn(mutationData?.loginForLogin?.user);
    if (accessToken) localStorage.setItem("_id", accessToken); //Using browser's local storage to store the access token so a session could be maintained.
  }, [accessToken, mutationData, setIsLoggedIn]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  });

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  });

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  });

  const onLogout = useCallback(() => {
    localStorage.removeItem("_id"); //Removing  the access token after user logs out
  });

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Marketplace
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              {}
              {loginDataLoading ? (
                <CircularProgress color="secondary" /> // Showing a progress bar while log in completed
              ) : !isLoggedIn && !localStorage.getItem("_id") ? ( //Conditionally rendering login or user avatar depending on state of isLoggedIn
                <a href={data?.getLoginUrlsForLogin?.GOOGLE}>
                  <Button variant="contained" startIcon={<GoogleIcon />}>
                    <span sx={{ textDecoration: "none" }}>Login</span>
                  </Button>
                </a>
              ) : (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {isLoggedIn?.avatar?.url ? (
                    <Avatar alt="User" src={isLoggedIn.avatar.url} />
                  ) : (
                    <Avatar src="/broken-image.jpg" />
                  )}
                </IconButton>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <a
                    onClick={onLogout}
                    href={`https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.origin}`}
                  >
                    Logout
                  </a>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
