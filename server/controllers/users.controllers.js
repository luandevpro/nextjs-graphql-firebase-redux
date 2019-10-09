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
              path: '/',
              maxAge: expiresIn,
              httpOnly: true,
            };
            res.cookie('token', sessionCookie, options);
            res.json({ token });
          });
      }
    });
};

exports.logout = async (req, res) => {
  await res.clearCookie('token');
  return res.redirect('/account/login');
};
