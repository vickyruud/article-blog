import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

const GRAPHQL_ENDPOINT =
  "https://gql-technical-assignment.herokuapp.com/graphql";

const BlogApolloProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default BlogApolloProvider;
