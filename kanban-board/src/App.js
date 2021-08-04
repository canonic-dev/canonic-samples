import React from "react";
import Wrapper from "./components/Wrapper";
import "./App.css";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { Helmet } from "react-helmet";

//Connecting with the Canonic API
const client = new ApolloClient({
  uri: "https://kanban-eei635.hem.canonic.dev/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Helmet>
        <title>Kanban Board</title>
      </Helmet>
      <div className="App" style={{ height: "100vh" }}>
        <Wrapper />
      </div>
    </ApolloProvider>
  );
}

export default App;
