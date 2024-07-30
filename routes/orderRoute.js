// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');


// Routes
router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
//router.get('/serviceProvider/:name', orderController.getOrdersByServiceProviderName);
router.get('/:id', orderController.getOrderById);
router.patch('/:id', orderController.updateOrder);
router.get('/service-provider/:id', orderController.getOrdersByServiceProvider); 
router.delete('/:id', orderController.deleteOrder);
router.get('/stats/:id', orderController.getServiceProviderStats);
router.put('/order/:orderId/status', orderController.updateOrderStatus);
router.post('/user/order', orderController.getOrdersByUser);



module.exports = router;
