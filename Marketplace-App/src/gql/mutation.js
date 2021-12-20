import { gql } from "@apollo/client";

export const LOGIN_WITH_GOOGLE_MUTATION = gql`
  mutation Login($code: String!, $service: String!) {
    #This mutation is used to get logged in user's details
    loginForLogin(code: $code, service: $service) {
      #We feed in code which we get after user successfully signs in, services are the 0auth services we are using such as Google,Github and Facebook.
      token
      user {
        email
        firstName
        lastName
        avatar {
          url
        }
      }
    }
  }
`;
