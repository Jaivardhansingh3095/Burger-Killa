const express = require('express');

const authController = require('../controller/authController');

const { signup } = authController;

const router = express.Router();

router.post('/signup', signup);

module.exports = router;
