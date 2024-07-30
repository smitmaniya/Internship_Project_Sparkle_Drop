const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    quantity: { type: Number, default: 1 },
    subtotal: { type: Number, required: true },
    // Add other fields as needed
    deliveryOption: {
        type: String,
        enum: ['standard', 'priority'],
        //required: true
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service_Provider',
       // required: true
    },
    userAddress: {
        type: String,
        //required: true
    },
    cardNumber: String,
    cvv: String,
    expiry: String,
    county: String,
    zip: String,
    nickName: String,
    deliveryFee: Number,
    status: {
        type: String,
        enum: ['Pending', 'Active', 'Completed'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
