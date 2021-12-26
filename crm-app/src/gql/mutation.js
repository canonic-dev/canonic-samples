import { gql } from "@apollo/client";

export const ADD_NOTE = gql`
  mutation updateCustomerMutation($_id: ID!, $notes: [CustomerNoteInput!]!) {
    # This mutation will add a new to note inside customer table's database.
    updateCustomer(_id: $_id, input: { notes: $notes }) {
      # We want to feed in array of object to $notes
      _id
      createdAt
      updatedAt
      name
      email
      phone
      company
      notes {
        description
      }
    }
  }
`;

export const ADD_DEAL = gql`
  mutation updateDealsMutation($_id: ID!, $deals: [ID!]!) {
    # This mutation adds a customer ID to the particular deal
    updateDeal(_id: $_id, input: { deals: $deals }) {
      # It expects array of _id.
      title
      amount
      dealOwner
      deals {
        _id
        name
        company
        phone
        email
      }
    }
  }
`;
