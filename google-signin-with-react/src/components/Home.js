import React from "react";

function Home({ user }) {
  return <div>Hi, you're logged in! You're email is {user.email}</div>;
}

export default Home;
