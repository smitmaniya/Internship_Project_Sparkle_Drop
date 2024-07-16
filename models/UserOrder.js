// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  serviceProvider:{type:mongoose.Schema.Types.ObjectId,ref: 'Service_Provider', required: true},
  date: Date,
  customer: String,
  time: String,
  amount: Number,
  destination: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'Service_Provider' },
  status: {
    type: String,
    enum: ['pending', 'inprogress', 'completed'],
    default: 'pending'
}
});

module.exports = mongoose.model('Order', orderSchema);
