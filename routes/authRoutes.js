const express = require('express');
const { register, login } = require('../controllers/authController.js');
const { getAllUsers, getServiceProviders} = require('../controllers/userController.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all', getAllUsers);
router.get('/all-service-providers', getServiceProviders);

module.exports = router;
