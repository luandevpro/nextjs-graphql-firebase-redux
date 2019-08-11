import fetch from 'isomorphic-unfetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const HASURA_GRAPHQL_ENGINE_HOSTNAME = 'next-node-hasura-graphql.herokuapp.com';
const GRAPHQL_ENDPOINT = `https://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
const WEBSOCKET_ENDPOINT = `wss://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

function create(initialState, { getToken }) {
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState, options) {
  if (!process.browser) {
    return create(initialState, options);
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
