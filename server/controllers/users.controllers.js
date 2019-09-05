const passportGoogle = require('passport');
const passportLocal = require('passport');
const jwt = require('jsonwebtoken');
require('../configs/passportGoogle')(passportGoogle);
require('../configs/passportLocal')(passportLocal);

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

exports.login = (req, res) => {
  passportLocal.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user,
      });
    }
    req.login(user, { session: false }, (errors) => {
      if (errors) {
        res.send(err);
      }
      {
        const payload = {
          id: user._id,
          email: user.email,
        };
        jwt.sign(
          payload,
          process.env.HASURA_GRAPHQL_JWT_SECRET_KEY,
          { expiresIn: '1h' },
          (error, token) => {
            if (error) {
              return res.json(err);
            }
            return res.json({ user, token });
          },
        );
      }
    });
  })(req, res);
};

exports.logout = async (req, res) => {
  await res.clearCookie('token');
  return res.redirect('/login');
};
