const firebase = require('firebase-admin');

exports.login = async (req, res) => {
  const { token } = req.body;
  firebase
    .auth()
    .verifyIdToken(req.body.token)
    .then((decodedToken) => {
      if (decodedToken) {
        const OPTION_COOKIES = {
          signed: true,
          path: '/',
          domain: 'localhost',
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        };
        res.cookie('token', token, OPTION_COOKIES);
        res.json({ token });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logout = async (req, res) => {
  await res.clearCookie('token');
  return res.redirect('/login');
};
