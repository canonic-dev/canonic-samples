import React, { useState } from "react";
import ProductItem from "./components/Product Item";
import { Typography, Box, List, Divider } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    fetch(`https://ph-clone.hem.staging.canonic.dev/api/products`)
      .then((res) => res.json())
      .then((json) => json?.data)
      .then((products) =>
        Array.isArray(products) ? setProducts(products) : null
      );
  }, []);

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          marginTop: 3,
          marginBottom: 2,
          color: "#4b587c",
          "&:hover": {
            color: "#da552f",
          },
        }}
      >
        Products
      </Typography>

      <List>
        {products.map((product) => {
          return (
            <Box>
              <ProductItem {...product}></ProductItem>
              <Divider />
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

export default ProductList;
