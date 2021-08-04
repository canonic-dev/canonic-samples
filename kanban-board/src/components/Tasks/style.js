import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  card: {
    userSelect: "none",
    padding: 16,
    margin: "0 0 8px 0",
    minHeight: "50px",
    borderRadius: "4px",
    color: "white",
  },
}));
