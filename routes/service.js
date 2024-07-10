const express = require('express');
const { service_provider_profile_data} = require('../controllers/service_provider.js');
const {addService,getAllServices, deleteService,updateService} = require('../controllers/servicelist.js')
const {
    createServiceProviderProfile,
    updateServiceProviderProfile,
    getAllServiceProviders
} = require('../controllers/serviceProviderProfileController');


const auth = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/profile-data',service_provider_profile_data);
router.get('/alllist', getAllServices);
router.post('/addservice', addService);
router.delete('/deleteservice/:id',deleteService);
router.put('/updateservice/:id',updateService);

router.post('/CreateServiceProviderprofile', createServiceProviderProfile);
router.put('/:id', updateServiceProviderProfile);
router.get('/getallserviceprovider', getAllServiceProviders);

module.exports = router;
