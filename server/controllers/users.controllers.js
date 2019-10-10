const firebase = require('firebase-admin');

exports.login = async (req, res) => {
  const { token } = req.body;
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  firebase
    .auth()
    .verifyIdToken(token)
    .then((decodedIdToken) => {
      if (decodedIdToken) {
        firebase
          .auth()
          .createSessionCookie(token, { expiresIn })
          .then((sessionCookie) => {
            const options = {
              signed: true,
              maxAge: expiresIn,
              domain: 'nextjs-graphql-firebase-redux-zea5pv464a-uc.a.run.app',
              httpOnly: true,
            };
            res.cookie('token', sessionCookie, options);
            res.json({ token });
          });
      }
    });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/account/login');
};
