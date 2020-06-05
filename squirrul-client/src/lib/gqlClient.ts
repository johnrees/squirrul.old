import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const uri = process.env.REACT_APP_GRAPHQL_ENDPOINT || "";

const httpLink = new HttpLink({
  uri,
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_ADMIN_SECRET,
  },
});

const wsLink = new WebSocketLink({
  uri: uri.replace("http", "ws"),
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const gqlClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
