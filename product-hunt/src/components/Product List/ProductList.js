import React from "react";
import ProductItem from "./components/Product Item";
import { Typography, Box, List, Divider } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://product-hunt-18dcc2.can.canonic.dev/api/products`)
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
            <Box key={product._id}>
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
