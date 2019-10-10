const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');

const withEnv = {
  publicRuntimeConfig: {
    HASURA_GRAPHQL_ENGINE_HOSTNAME: 'nextjs-graphql-firebase-redux.herokuapp.com',
    expiresIn: 60 * 60 * 24 * 5 * 1000,
  },
};
module.exports = withPlugins([withCSS, withOffline, withEnv]);
