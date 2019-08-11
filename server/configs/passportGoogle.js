const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const { graphqlClient } = require('./graphqlClient');
const { userByPk } = require('../graphql/users/query');
const { insertUsers } = require('../graphql/users/mutation');

const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '8d9177f1-922f-4777-9308-b09a4b10f783s';

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: '548210758981-gmc489ulfdmkaj3ogdhi27kpvmtpjob9.apps.googleusercontent.com',
        clientSecret: '0Rf5_FOWWFrKoriRrtuxU651',
        callbackURL: '/auth/google/callback',
        proxy: true,
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
          userId: profile.id.toString(),
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photoURL: profile.photos[0].value.replace('sz=50', 'sz=128'),
        };
        const token = jwt.sign(
          {
            'https://hasura.io/jwt/claims': {
              'x-hasura-default-role': 'user',
              'x-hasura-allowed-roles': ['user'],
              'x-hasura-user-id': user.userId.toString(),
            },
          },
          '8d9177f1-922f-4777-9308-b09a4b10f783',
          {
            algorithm: 'HS256',
            expiresIn: '15h',
          },
        );
        graphqlClient
          .request(userByPk, {
            userId: user.userId.toString(),
            email: user.email,
          })
          .then((data) => {
            if (data.users_by_pk) {
              const currentUser = data.users_by_pk;
              return done(null, { currentUser, token });
            }
            return graphqlClient
              .request(insertUsers, {
                objects: [user],
              })
              .then((dataInsert) => {
                const currentUser = dataInsert.insert_users.returning[0];
                return done(null, { currentUser, token });
              });
          })
          .catch((err) => console.log(err));
      },
    ),
  );
  passport.use(
    new JwtStrategy(opts, (jwtpayload, done) => {
      console.log(jwtpayload, done, 'ngon');
    }),
  );
};
