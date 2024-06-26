const express = require('express');
const { register, login , changePassword, resetPassword,forgotPassword } = require('../controllers/authController.js');
const { getAllUsers, getServiceProviders} = require('../controllers/userController.js');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all', getAllUsers);
router.get('/all-service-providers', getServiceProviders);
// Change password
router.post('/change-password',auth, changePassword);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password', resetPassword);

module.exports = router;
