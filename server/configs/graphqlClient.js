const { GraphQLClient } = require('graphql-request');

exports.graphqlClient = new GraphQLClient(process.env.HASURA_GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
});
