const passportGoogle = require('passport');

require('../configs/passportGoogle')(passportGoogle);

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

exports.showToken = async (req, res) => {
  const OPTION_COOKIES = {
    signed: true,
    path: '/',
    domain: 'localhost',
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  };
  await res.cookie('token', req.body.token, OPTION_COOKIES);
  return res.redirect('/');
};
