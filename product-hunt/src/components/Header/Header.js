import React from "react";
import { Avatar, Button, Box, Divider } from "@mui/material";

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
          margin: 2,
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
        <Button
          variant="outlined"
          size="medium"
          sx={{
            color: "#da552f",
            borderColor: "#da552f",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#da552f",
              borderColor: "#fff",
              color: "#fff",
              boxShadow: "none",
            },
          }}
        >
          Submit
        </Button>
      </Box>
      <Divider variant="middle" />
    </Box>
  );
};

export default Header;
