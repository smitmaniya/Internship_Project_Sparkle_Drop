const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    quantity: { type: Number, default: 1 },
    subtotal: { type: Number, required: true },
    // Add other fields as needed
});

module.exports = mongoose.model('CartItem', cartItemSchema);
