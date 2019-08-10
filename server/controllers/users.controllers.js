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
