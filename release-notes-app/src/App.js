import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { Helmet } from "react-helmet";

import UI from "./components/ui";

//Connecting with the Canonic API
const client = new ApolloClient({
  uri: "https://release-notes-app.can.canonic.dev/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Helmet>
        <title>The Release Notes App</title>
      </Helmet>
      <div className="App" style={{ height: "100vh" }}>
        <UI />
      </div>
    </ApolloProvider>
  );
}

export default App;
