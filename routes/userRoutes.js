const express = require('express');
const { getAllUsers , getServiceProviders} = require('../controllers/userController.js');
const auth = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.get('/all', auth, getAllUsers);

module.exports = router;
