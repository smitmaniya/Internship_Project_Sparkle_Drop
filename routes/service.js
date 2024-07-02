const express = require('express');
const { service_provider_profile_data} = require('../controllers/service_provider.js');
const {addService,getAllServices, deleteService,updateService} = require('../controllers/servicelist.js')
const auth = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/profile-data',service_provider_profile_data);
router.get('/alllist', getAllServices);
router.post('/addservice', addService);
router.delete('/deleteservice/:id',deleteService);
router.put('/updateservice/:id',updateService);

module.exports = router;
