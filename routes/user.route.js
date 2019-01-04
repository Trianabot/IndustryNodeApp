const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.get('/testuser', user_controller.testuser);

router.post('/registeruser', user_controller.register_user);

router.post('/authenticate', user_controller.authenticate_user);

module.exports = router;