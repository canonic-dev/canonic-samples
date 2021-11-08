import InformationTable from "./components/Information Table/InformationTable";
import { Container, Navbar } from "react-bootstrap";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar bg="secondary" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="#home">Customer Information</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <InformationTable></InformationTable>
      </Container>
      <Container className="mt-5">
        <div>Canonic ©2021 Created by Canonic Inc</div>
      </Container>
    </div>
  );
}

export default App;
