// Import React and Bootstrap dependencies
import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import InformationTable from "./components/Information Table/InformationTable";

import "./App.css";

/**
 * Connecting with the backend using apollo client
 */
const client = new ApolloClient({
  // make sure you update the URI here to point to your backend
  uri: "https://customer-information.can.canonic.dev/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* Header */}
        <Navbar className="mb-5 navbar-custom" variant="dark" sticky="top">
          <Container>
            <Navbar.Brand href="#home">Customer Information</Navbar.Brand>
          </Container>
        </Navbar>
        {/* Middle Container to hold our Table */}
        <Container>
          <InformationTable></InformationTable>
        </Container>
        {/* Footer */}
        <Container className="mt-3 pb-3 fw-bolder">
          Canonic ©2021 Created by Canonic Inc
        </Container>
      </div>
    </ApolloProvider>
  );
}

export default App;
