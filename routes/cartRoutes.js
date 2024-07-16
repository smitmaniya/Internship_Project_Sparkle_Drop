const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
//const authenticateUser = require('../middlewares/authMiddleware.js');

// Add service to cart
router.post('/add',  cartController.addToCart);

// Get user's cart items
router.get('/getiteam', cartController.getCartItems);

module.exports = router;
