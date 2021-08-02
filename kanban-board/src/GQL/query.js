import { gql } from "@apollo/client";

// This query fetches columns from the backend built in Canonic.
export const GET_COLUMN = gql`
  query {
    columns {
      _id
      title
      taskIds {
        content
        _id
        description
      }
    }
  }
`;
