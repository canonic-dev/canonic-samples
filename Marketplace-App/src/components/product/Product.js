//This component will display individual card for each product.

//Importing React,Stripe, and Material UI
import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
} from "@mui/material";

function Product({
  title,
  price,
  rating,
  image,
  price_api,
  handleClick,
  loading,
}) {
  return (
    <Card
      sx={{
        maxHeight: 450,
        minWidth: 100,
        width: "25%",
        margin: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "start",
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        height="auto"
        image={image}
        sx={{ objectFit: "contain", maxHeight: "200px" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          ${price}
        </Typography>
        <Rating name="read-only" value={rating} readOnly />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleClick(price_api, title)} //Here listening for onClick function in order to trigger Stripe's client only checkout
          disabled={loading}
        >
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;
