const express = require('express');
const { service_provider_profile_data} = require('../controllers/service_provider.js');
const auth = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/profile-data',service_provider_profile_data);

module.exports = router;
