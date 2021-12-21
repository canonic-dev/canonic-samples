//This component feeds the data that we fetch over graphQL to its child component 'Product'

//Importing React, Apollo, MaterialUI
import React, { useState, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { NOTIFY } from "../../gql/mutation";
import { loadStripe } from "@stripe/stripe-js";
import { Box, CircularProgress } from "@mui/material";

//Importing Prouct component and query to fetch products
import Product from "../product/Product.js";
import { GET_PRODUCTS } from "../../gql/query";

function Home({ isLoggedIn }) {
  const { data, loading: productsLoading } = useQuery(GET_PRODUCTS); //Pulling the data in from the Canonic Backend
  const products = useMemo(() => data?.products || [], [data?.products]); //Populating products variable with the fetch data

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API); //Replace this with your own Stripe API key
  const [loading, setLoading] = useState(); //Using this to disable the Buy now button until checkout completes
  const [notify] = useMutation(NOTIFY);
  const handleClick = async (price_api, title) => {
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
        cancelUrl: window.origin, //You can replace this with your domain
        successUrl: window.origin + `?session_id=${title}`, //Injecting the title of the product inside of the URL so we can use it to trigger a mutation
      });

      if (error) {
        setLoading(false);
      }
    } else alert("Please log in to continue");
  };

  useEffect(() => {
    //Using this useEffect hook to send a slack and email notification with the help of Canonic's email and slack integrations.
    const hasSuccessUrl = new URLSearchParams(window.location.search).get(
      "session_id"
    ); //This bit gets us the value of session_id from the URL
    if (hasSuccessUrl) {
      notify({ variables: { title: hasSuccessUrl } }); //Triggering a mutation if it exists
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "4rem",
        marginTop: "4rem",
      }}
    >
      {productsLoading && (
        <CircularProgress sx={{ position: "absolute", left: "50%" }} />
      )}
      {products.map((item, i) => {
        return (
          <Product
            key={i}
            id={item.id}
            title={item.title}
            image={item.image.url}
            price={item.price}
            rating={item.ratings}
            price_api={item.priceApiId}
            handleClick={handleClick}
            loading={loading}
          />
        );
      })}
    </Box>
  );
}

export default Home;
