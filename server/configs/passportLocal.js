// config/passport-local.js
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { users } = require('../graphql/users/query');
const { graphqlClient } = require('./graphqlClient');

const { ExtractJwt } = passportJWT;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.HASURA_GRAPHQL_JWT_SECRET_KEY;

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        graphqlClient
          .request(users, {
            email,
          })
          .then((data) => {
            if (data.users[0]) {
              bcrypt.compare(password, data.users[0].password).then((isMatched) => {
                if (!isMatched) {
                  return done(null, false, { message: 'Password incorrect' });
                }
                return done(null, data.users[0]);
              });
            } else {
              return done(null, false, { message: 'Incorrect username.' });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    ),
  );
};
