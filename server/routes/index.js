const express = require('express');
const passportGoogle = require('passport');
const userController = require('../controllers/users.controllers');
const fileController = require('../controllers/file.controllers');

const router = express.Router();

require('../configs/passportGoogle')(passportGoogle);

router.route('/auth/google').get(userController.showLoginGoogle);

router
  .route('/auth/google/callback')
  .get(
    passportGoogle.authenticate('google', { session: false }),
    userController.showLoginGoogleCallback,
  );

router.route('/api/login').post(userController.showToken);

router.route('/api/upload').post(fileController.uploadSingle, fileController.uploadFile);

module.exports = router;
