import React from "react";
import { Avatar, Box, Divider } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#da552f",
            width: 50,
            height: 50,
            fontWeight: 900,
            fontSize: "1.5rem",
          }}
        >
          P
        </Avatar>
      </Box>
      <Divider variant="fullWidth" />
    </Box>
  );
};

export default Header;
