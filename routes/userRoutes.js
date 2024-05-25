const express = require('express');
const { getUser } = require('../controllers/userController.js');
const auth = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.get('/all', auth, getUser);

module.exports = router;
