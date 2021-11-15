import React from "react";
import UpvoteButton from "./Upvote Button";
import { Avatar, Box } from "@mui/material";
import { ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const ProductItem = ({
  name,
  description,
  tags,
  brandImage,
  upvotes = "999",
  isUpvoted = false,
}) => {
  const [upvoted, setUpvoted] = React.useState(isUpvoted);

  const handleUpvote = () => {
    setUpvoted(!upvoted);
  };

  const tagNames = tags.map((tag) => {
    return tag.label;
  });

  return (
    <ListItem disableGutters>
      <Avatar
        alt={name}
        src={brandImage.url ?? "notPresent"}
        sx={{ width: 80, height: 80, bgcolor: "#4b587c", marginRight: 2 }}
        variant="square"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <ListItemText
          primary={name}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: "bold",
            letterSpacing: 0,
            color: "#21293c",
          }}
          secondary={description}
          secondaryTypographyProps={{ color: "#4b587c" }}
        ></ListItemText>
        <ListItemText
          primary={tagNames.join(" ・ ")}
          primaryTypographyProps={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 0,
            color: "#21293c",
          }}
        ></ListItemText>
      </Box>
      <ListItemSecondaryAction>
        {" "}
        <UpvoteButton
          upvoted={upvoted}
          variant="outlined"
          disableRipple="true"
          onClick={handleUpvote}
          startIcon={<ArrowDropUpIcon />}
        >
          {upvotes}
        </UpvoteButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ProductItem;
