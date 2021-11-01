import { gql } from "@apollo/client";

/**
 * gql query to get roadmap
 * The query parameters we got straight from Canonic autogenerated documentation
 */
export const GET_ROADMAP = gql`
  query {
    roadmaps {
      _id
      title
      description
      upvotes {
        upvotes
      }
      stage {
        value
      }
    }
  }
`;
