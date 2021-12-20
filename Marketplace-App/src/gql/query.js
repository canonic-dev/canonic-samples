import { gql } from "@apollo/client";

//Oauth with Google query
export const LOGIN_WITH_GOOGLE = gql`
  query {
    getLoginUrlsForLogin {
      #This query is used to access all the 0auth integrations you have used, in this instance only Google is used.
      GOOGLE #Fetching Google Oauth from Canonic
    }
  }
`;

export const GET_PRODUCTS = gql`
  query {
    products {
      #Fetching the field from Product table
      title
      _id
      price
      ratings
      priceApiId #priceApiID contains product_price_id that you get from Stripe when you enable client only checkout, each product will have a unique ID
      image {
        url
        name
      }
    }
  }
`;
