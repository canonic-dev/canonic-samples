import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import InformationTable from "./components/Information Table/InformationTable";

import "./App.css";

/**
 * Connecting with the backend using apollo client
 */
const client = new ApolloClient({
  // make sure you update the URI here to point to your backend
  uri: "https://stripe-integration.hem.staging.canonic.dev/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
