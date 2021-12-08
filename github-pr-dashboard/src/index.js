//This is the root file, here we are configuring Apollo's graphql client and rendering App component.

// React and Apollo's dependencies
import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

//Local dependencies
import Container from "./components/Container";
import "./index.css";

const client = new ApolloClient({
  uri: "https://github-pr-dashboard-d3d.can.canonic.dev/graphql", //Replace this with your own cloned project's URI.
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <Container />
  </ApolloProvider>,
  document.getElementById("root")
);
