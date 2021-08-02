import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    marginLeft: "15%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dragging: {
    padding: 4,
    width: 250,
    minHeight: 350,
    borderRadius: "4px",
  },
}));
