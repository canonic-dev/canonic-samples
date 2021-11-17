import React from "react";
import { Header } from "semantic-ui-react";

import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header as="h3">Analytics Dashboard connected with Postgres</Header>
      </header>
      <div className="App-main">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
