import { gql } from "@apollo/client";

export const GET_VERSIONS = gql`
  query {
    versions {
      version
      date
      description {
        details
        types {
          label
          value
        }
      }
    }
  }
`;
