import React from "react";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import Roadmap from "./components/Roadmap";

import "./App.css";

/**
 * Connecting with the backend using apollo client
 */
const client = new ApolloClient({
  // make sure you update the URI here to point to your backend
  uri: "https://roadmap-35a418.can.canonic.dev/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <div className="wrapper-heading">Roadmap</div>
        <Roadmap />
      </div>
    </ApolloProvider>
  );
}

export default App;
