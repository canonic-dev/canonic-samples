import { gql } from "@apollo/client";
export const GET_CUSTOMERS = gql`
  #This query will return the all the fields of Customer table.
  query {
    customers {
      name
      _id
      createdAt
      updatedAt
      email
      phone
      company
      labels
      notes {
        description
      }
    }
  }
`;

export const GET_DEALS = gql`
  # We are using this query primarily to append new user ID to deal  with all the previous user IDs.
  query {
    deals {
      _id
      createdAt
      updatedAt
      title
      amount
      dealOwner
      deals {
        _id
        createdAt
        updatedAt
        name
      }
    }
  }
`;
