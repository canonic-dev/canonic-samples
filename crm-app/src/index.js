import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import ContentTable from "./components/ContentTable";
import Header from "./components/Header";
import "./index.css";

const client = new ApolloClient({
  uri: "https://crm-app.can.canonic.dev/graphql", // Replace this URI with your cloned project's URI
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Header />
      <ContentTable />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
