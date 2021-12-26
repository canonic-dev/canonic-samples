import "./App.css";
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import ProductList from "./components/Product List/ProductList";

function App() {
  return (
    <div className="App">
      <Box
        sx={{
          margin: "20px 30px 0px 30px",
        }}
      >
        <Header></Header>
        <ProductList></ProductList>
      </Box>
    </div>
  );
}

export default App;
