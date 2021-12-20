//This component feeds the data that we fetch over graphQL to its child component 'Product'

//Importing React, Apollo, MaterialUI
import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";

//Importing Prouct component and query to fetch products
import Product from "../product/Product.js";
import { GET_PRODUCTS } from "../../gql/query";

function Home({ isLoggedIn }) {
  const { data, loading: productsLoading } = useQuery(GET_PRODUCTS); //Pulling the data in from the Canonic Backend
  const products = useMemo(() => data?.products || [], [data?.products]); //Populating products variable with the fetch data

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
            isLoggedIn={isLoggedIn} //Passing on logged in status
          />
        );
      })}
    </Box>
  );
}

export default Home;
