const express = require('express');
const userController = require('../controllers/users.controllers');

const router = express.Router();

router.route('/api/login').post(userController.showToken);

module.exports = router;
