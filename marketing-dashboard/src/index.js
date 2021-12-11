import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

/**
 * Connecting with the backend using apollo client
 */
const client = new ApolloClient({
  // Make sure you update the URI here to point to your backend
  uri: "https://marketing-ii.hem.staging.canonic.dev/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
