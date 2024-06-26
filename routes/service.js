const express = require('express');
const { service_provider_profile_data,listofserviceproviders} = require('../controllers/service_provider.js');
const {addservice, removeservice,updateservice} = require('../controllers/servicelist.js')
const auth = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/profile-data',service_provider_profile_data);
//router.get('/alllist', listofserviceproviders);
router.post('/addservice', addservice);
router.delete('/deleteservice/:id',removeservice);
router.put('/updateservice/:id',updateservice);

module.exports = router;
