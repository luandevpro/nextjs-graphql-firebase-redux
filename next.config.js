const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');

const withEnv = {
  publicRuntimeConfig: {
    HASURA_GRAPHQL_ENGINE_HOSTNAME: 'nextjs-graphql-firebase-redux.herokuapp.com',
  },
};
module.exports = withPlugins([withCSS, withOffline, withEnv]);
