const firebase = require('firebase-admin');
const getConfig = require('next/config').default;

const { publicRuntimeConfig } = getConfig();

exports.login = async (req, res) => {
  const { token } = req.body;
  const expiresIn = parseInt(publicRuntimeConfig.EXPIRES_IN, 10);
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
              domain: publicRuntimeConfig.DOMAIN.toString(),
              httpOnly: true,
            };
            res.cookie('token', sessionCookie, options);
            res.json({ token });
          });
      }
    });
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.clearCookie('token').sendStatus(200);
  res.redirect('/account/login');
};
