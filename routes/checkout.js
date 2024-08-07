// routes/checkout.js

const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/checkout', checkoutController.checkout);
router.get('/all', checkoutController.getAllCheckouts);
router.get('/byServiceProvider/:serviceProviderId', checkoutController.getCheckoutsByServiceProvider);

module.exports = router;
