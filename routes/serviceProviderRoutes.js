
const express = require('express');
const { findServiceProvidersInRange } = require('../controllers/serviceProviderController');
const { service_provider_profile_data } = require('../controllers/service_provider');
const router = express.Router();

router.get('/find-service-providers/:userId', findServiceProvidersInRange);
router.post('/add-service-provider', service_provider_profile_data);

module.exports = router;
