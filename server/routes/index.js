const express = require('express');
const passportGoogle = require('passport');
const passportFacebook = require('passport');
const userController = require('../controllers/users.controllers');
const fileController = require('../controllers/file.controllers');

const router = express.Router();

require('../configs/passportGoogle')(passportGoogle);
require('../configs/passportFacebook')(passportFacebook);

router.route('/auth/signup').post(userController.signup);
router.route('/auth/login').post(userController.login);

router.route('/auth/google').get(userController.showLoginGoogle);
router
  .route('/auth/google/callback')
  .get(
    passportGoogle.authenticate('google', { session: false }),
    userController.showLoginGoogleCallback,
  );

router.route('/auth/facebook').get(userController.showLoginFacebook);
router
  .route('/auth/facebook/callback')
  .get(
    passportFacebook.authenticate('facebook', { session: false }),
    userController.showLoginFacebookCallback,
  );

router.route('/logout').get(userController.logout);

router.route('/api/upload').post(fileController.uploadSingle, fileController.uploadFile);

module.exports = router;
