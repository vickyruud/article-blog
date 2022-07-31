import { gql } from "@apollo/client";

export const GET_MORE_ARTICLES = gql`
  query ($page: Int!) {
    retrievePageArticles(page: $page) {
      id
      author
      createdAt
      score
      updatedAt
      title
      text
      type
      url
    }
  }
`;

export const GET_FIRST_ARTICLES = gql`
  query {
    firstPageArticles {
      id
      author
      createdAt
      score
      updatedAt
      title
      text
      type
      url
    }
  }
`;
