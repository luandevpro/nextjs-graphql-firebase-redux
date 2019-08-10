const express = require('express');
const userController = require('../controllers/users.controllers');
const fileController = require('../controllers/file.controllers');

const router = express.Router();

router.route('/api/login').post(userController.showToken);

router.route('/api/upload').post(fileController.uploadSingle, fileController.uploadFile);

module.exports = router;
