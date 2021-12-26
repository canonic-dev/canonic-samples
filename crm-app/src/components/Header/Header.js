//This will display a app bar on top of the page.
import React from "react";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textAlign: "center",
            }}
          >
            CRM
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
