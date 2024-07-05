const express = require('express');
//const { getAllDrivers , getServiceProviders} = require('../controllers/userController.js');
const { createDriverProfile,getAllDriver } = require('../controllers/driverProfile');
const auth = require('../middlewares/authMiddleware.js');
const router = express.Router();

 router.get('/alldrivers', auth, getAllDriver);
 router.post('/create-driver', createDriverProfile);
// router.put('/update-user/:id', updateUserProfile);
// router.get('/get-users', getAllCustomer);


module.exports = router;
