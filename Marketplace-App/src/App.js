//This is the parent componenet, basically used to pass the props

//Importing react
import React, { useState } from "react";

//Importing Header and Home component
import Header from "./components/header/Header";
import Home from "./components/home/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(); //Will be passing setIsLoggedIn to the header in order to get the login status

  return (
    <>
      {
        <div className="App">
          <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          <Home isLoggedIn={isLoggedIn} />
        </div>
      }
    </>
  );
}

export default App;
