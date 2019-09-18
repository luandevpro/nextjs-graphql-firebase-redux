const passportLocal = require('passport');
const passportGoogle = require('passport');
const passportFacebook = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { graphqlClient } = require('../configs/graphqlClient');
const { users } = require('../graphql/users/query');
const { insertUsers } = require('../graphql/users/mutation');

require('../configs/passportLocal')(passportLocal);
require('../configs/passportGoogle')(passportGoogle);
require('../configs/passportFacebook')(passportFacebook);

exports.signup = async (req, res) => {
  const user = {
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
  };

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(user.password, salt);

  graphqlClient
    .request(users, {
      email: user.email,
    })
    .then((data) => {
      if (data.users[0]) {
        return res.json({ message: 'Email đã tồn tại' });
      }
      return graphqlClient
        .request(insertUsers, {
          objects: [
            {
              displayName: user.displayName,
              email: user.email,
              password: hashPassword,
            },
          ],
        })
        .then(() => {
          return res.json({ message: 'Đăng kí thành công' });
        });
    });
};

exports.login = async (req, res) => {
  passportLocal.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json({
        message: info ? info.message : 'Login failed',
        user,
      });
    }
    return req.login(user, { session: false }, (errors) => {
      if (errors) {
        res.json({ error: errors });
      }
      const OPTION_COOKIES = {
        signed: true,
        path: '/',
        domain: 'localhost',
        expires: new Date(Date.now() + 9000000000000000),
        httpOnly: true,
      };
      const token = jwt.sign(
        {
          'https://hasura.io/jwt/claims': {
            'x-hasura-default-role': 'user',
            'x-hasura-allowed-roles': ['user'],
            'x-hasura-user-id': user.userId.toString(),
          },
        },
        process.env.HASURA_GRAPHQL_JWT_SECRET_KEY,
        {
          algorithm: process.env.HASURA_GRAPHQL_JWT_SECRET_TYPE,
          expiresIn: process.env.JWT_TOKEN_EXPIRES,
        },
      );

      res.cookie('token', token, OPTION_COOKIES);
      return res.json({ user, token });
    });
  })(req, res);
};

exports.showLoginGoogle = (req, res, next) => {
  passportGoogle.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
};

exports.showLoginGoogleCallback = async (req, res) => {
  const OPTION_COOKIES = {
    signed: true,
    path: '/',
    domain: 'localhost',
    expires: new Date(Date.now() + 9000000000000000),
    httpOnly: true,
  };
  await res.cookie('token', req.user.token, OPTION_COOKIES);
  return res.redirect('/');
};

exports.showLoginFacebook = (req, res, next) => {
  passportFacebook.authenticate('facebook', { scope: ['email'] })(req, res, next);
};

exports.showLoginFacebookCallback = async (req, res) => {
  const OPTION_COOKIES = {
    signed: true,
    path: '/',
    domain: 'localhost',
    expires: new Date(Date.now() + 9000000000000000),
    httpOnly: true,
  };
  await res.cookie('token', req.user.token, OPTION_COOKIES);
  return res.redirect('/');
};

exports.logout = async (req, res) => {
  await res.clearCookie('token');
  return res.redirect('/login');
};
