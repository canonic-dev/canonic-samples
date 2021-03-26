import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

import Home from "./components/Home";
import Login from "./components/Login";

import "./App.css";

const LOGIN_MUTATION = gql`
  mutation Login($code: String!, $service: String!) {
    loginForUser(code: $code, service: $service) {
      token
      user {
        _id
        createdAt
        updatedAt
        email
        firstName
        lastName
        avatar {
          url
          name
        }
      }
    }
  }
`;

function App() {
  const [loginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    const urlCode = new URLSearchParams(window.location.search).get("code");
    if (urlCode) {
      loginMutation({ variables: { code: urlCode, service: "GOOGLE" } });
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {!data?.loginForUser?.token ? (
        <Login />
      ) : (
        <Home user={data?.loginForUser?.user} />
      )}
    </>
  );
}

export default App;
