import { gql } from "@apollo/client";

/**
 * gql query to get customers information
 * The query parameters we got straight from Canonic autogenerated documentation
 */
export const GET_CUSTOMERS_INFO = gql`
  query {
    customers {
      stripeCustomer {
        address
        balance
        email
        name
        phone
      }
      hubspotCustomer {
        properties
      }
    }
  }
`;
