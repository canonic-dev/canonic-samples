import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const UpvoteButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "upvoted",
})(({ upvoted }) => ({
  fontWeight: "bold",
  ...(upvoted && {
    color: "#da552f",
    borderColor: "#da552f",
    "&:hover": {
      backgroundColor: "#fff",
      borderColor: "#da552f",
    },
  }),
  ...(!upvoted && {
    color: "#767676",
    borderColor: "#767676",
    "&:hover": {
      backgroundColor: "#fff",
      borderColor: "#da552f",
    },
  }),
}));

export default UpvoteButton;
