import React from "react";
import Board from "../Board";
import clsx from "clsx";
import { useStyles } from "./style";
import { Typography, Toolbar, AppBar, CssBaseline } from "@material-ui/core";

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ backgroundClip: "#354bd4" }}
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <Typography variant="h6" noWrap style={{ margin: "0 auto" }}>
            THE KANBAN BOARD
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={clsx(classes.content)}>
        <div className={classes.drawerHeader} />
        <Board />
      </main>
    </div>
  );
}
