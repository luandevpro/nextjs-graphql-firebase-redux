import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const HASURA_GRAPHQL_ENGINE_HOSTNAME = 'cjs-chat.herokuapp.com';
const GRAPHQL_ENDPOINT = `https://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
const WEBSOCKET_ENDPOINT = `wss://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

function initialApollo(ACCESS_TOKEN) {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  const wsLink = new WebSocketLink({
    uri: WEBSOCKET_ENDPOINT,
    options: {
      lazy: true,
      reconnect: true,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
}

export default initialApollo;
