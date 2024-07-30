const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
//const authenticateUser = require('../middlewares/authMiddleware.js');

// Add service to cart
router.post('/add',  cartController.addToCart);
router.post('/checkout', cartController.checkout);


// Get user's cart items
router.get('/getiteam', cartController.getCartItems);
router.post('/remove-from-cart', cartController.removeFromCart);
router.get('/get-cart-items-by-provider', cartController.getCartItemsByServiceProvider);
module.exports = router;
