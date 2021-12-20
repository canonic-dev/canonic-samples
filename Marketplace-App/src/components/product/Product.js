//This component will display individual card for each product.

//Importing React,Stripe, and Material UI
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
} from "@mui/material";

function Product({ title, price, rating, image, price_api, isLoggedIn }) {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API); //Replace this with your own Stripe API key
  const [loading, setLoading] = useState(); //Using this to disable the Buy now button until checkout completes
  const handleClick = async () => {
    //This fuction perform Stripe's client only checkout.
    if (isLoggedIn) {
      //Check if user is signed in.
      setLoading(true);
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: price_api, //This is unique product_price_id we get from stripe, in here I am using Canonic's CMS holds this ID
            quantity: 1,
          },
        ],
        mode: "payment",
        cancelUrl: "https://canonic-marketplace.netlify.app/", //You can replace this with your domain
        successUrl: "https://canonic-marketplace.netlify.app/", //You can replace this with your domain
      });
      if (error) {
        setLoading(false);
        console.log("The error ", error);
      }
    } else alert("Please log in to continue");
  };
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
        alt="title"
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
          onClick={handleClick} //Here listening for onClick function in order to trigger Stripe's client only checkout
          disabled={loading}
        >
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;
