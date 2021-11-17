//This is the root file, here we are configuring Apollo's graphql client and rendering App component.

// React and Apollo's dependencies
import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
import App from "./App";
import Container from "./components/Container";

const client = new ApolloClient({
  uri: "https://pr-dashboard.hem.staging.canonic.dev/graphql", //Replace this with your own cloned project's URI.
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <Container />
  </ApolloProvider>,
  document.getElementById("root")
);
