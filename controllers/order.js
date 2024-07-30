const mongoose = require('mongoose');
const Order = require('../models/UserOrder');
const User = require('../models/user');
const ServiceProvider = require('../models/ServiceProvider');

// Helper function to generate a random 5-digit number
function generateOrderNumber() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    // Validate serviceProvider ID
    const serviceProvider = await ServiceProvider.findById(req.body.serviceProvider);
    if (!serviceProvider) {
      return res.status(400).json({ message: 'Invalid service provider ID' });
    }


    const order = new Order({
      orderNumber: generateOrderNumber(),
      serviceProvider: req.body.serviceProvider,
      date: req.body.date,
      customer: req.body.customer,
      time: req.body.time,
      amount: req.body.amount,
      destination: req.body.destination,
      //status: req.body.status || 'Remaining'
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrdersByServiceProvider = async (req, res) => {
  try {
    const serviceProviderId = req.params.id;
    const orders = await Order.find({ serviceProvider: serviceProviderId }).populate('serviceProvider').populate('customer');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const orders = await Order.find({ customer: userId }).populate('serviceProvider').populate('customer');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' });
    }

    if (req.body.orderNumber != null) {
      order.orderNumber = req.body.orderNumber;
    }
    if (req.body.date != null) {
      order.date = req.body.date;
    }
    if (req.body.customer != null) {
      order.customer = req.body.customer;
    }
    if (req.body.time != null) {
      order.time = req.body.time;
    }
    if (req.body.amount != null) {
      order.amount = req.body.amount;
    }
    if (req.body.destination != null) {
      order.destination = req.body.destination;
    }
    if (req.body.status != null) {
      order.status = req.body.status;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' });
    }

    await order.remove();
    res.json({ message: 'Deleted order' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get service provider stats by ID
exports.getServiceProviderStats = async (req, res) => {
  const serviceProviderId = req.params.id;

  try {
    const serviceProvider = await ServiceProvider.findById(serviceProviderId);
    if (!serviceProvider) {
      return res.status(404).json({ message: 'Service Provider not found' });
    }

    const totalOrders = await Order.countDocuments({ serviceProvider: new mongoose.Types.ObjectId(serviceProviderId) });
    const totalPayments = await Order.aggregate([
      { $match: { serviceProvider: new mongoose.Types.ObjectId(serviceProviderId) } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
    ]);
    const totalPendingOrders = await Order.countDocuments({ serviceProvider: new mongoose.Types.ObjectId(serviceProviderId), status: 'Remaining' });
    const totalCustomers = await Order.distinct('customer', { serviceProvider: new mongoose.Types.ObjectId(serviceProviderId) });

    res.json({
      totalOrders,
      totalPayments: totalPayments.length > 0 ? totalPayments[0].totalAmount : 0,
      totalPendingOrders,
      totalCustomers: totalCustomers.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
      const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while updating the order status' });
  }
};