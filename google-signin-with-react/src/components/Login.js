import React from "react";
import { useQuery, gql } from "@apollo/client";

const LOGIN_URLS_QUERY = gql`
  query Login {
    getLoginUrlsForUser {
      GOOGLE
    }
  }
`;

function Login() {
  const { loading, error, data } = useQuery(LOGIN_URLS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <a href={data?.getLoginUrlsForUser?.GOOGLE}>LOGIN with Google</a>;
}

export default Login;
