import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import UI from "./components/UI";

//Connecting with the Canonic API
const client = new ApolloClient({
  uri: "https://release-notes-app.can.canonic.dev/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App" style={{ height: "100vh" }}>
        <UI />
      </div>
    </ApolloProvider>
  );
}

export default App;
