const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');

const withEnv = {
  publicRuntimeConfig: {
    HASURA_GRAPHQL_ENGINE_HOSTNAME: 'nextjs-graphql-firebase-redux.herokuapp.com',
    SIGNED_COOKIE: 'gOEfwTuUzvxzyRq4SEuMMgSSJ1uOEIhhgXawHbK7t',
    EXPIRES_IN: 60 * 60 * 24 * 5 * 1000,
    DOMAIN:
      process.env.NODE_ENV !== 'production'
        ? 'localhost'
        : 'nextjs-graphql-firebase-redux-zea5pv464a-an.a.run.app',
  },
};

module.exports = withPlugins([withCSS, withOffline, withEnv]);
