const express = require('express');
const { getAllUsers , getServiceProviders} = require('../controllers/userController.js');
const { createUserProfile, updateUserProfile, getAllCustomer } = require('../controllers/userProfileController');
const auth = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.get('/all', auth, getAllUsers);
router.post('/create-user', createUserProfile);
router.put('/update-user/:id', updateUserProfile);
router.get('/get-users', getAllCustomer);


module.exports = router;
