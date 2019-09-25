const firebase = require('firebase-admin');

exports.login = async (req, res) => {
  const { token } = req.body;
  firebase
    .auth()
    .verifyIdToken(req.body.token)
    .then((decodedToken) => {
      if (decodedToken) {
        res.cookie('token', token);
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
