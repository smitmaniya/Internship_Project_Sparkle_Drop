// models/Checkout.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceProviderSchema = new Schema({
    id: { type: Schema.Types.ObjectId, ref: 'Service_Provider', required: true },
    company_name: { type: String, required: true },
    address: { type: String, required: true }
});

const ServiceSchema = new Schema({
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    serviceProvider: { type: ServiceProviderSchema, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true }
});

const CheckoutSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    services: [ServiceSchema],
    userAddress: { type: String, required: true },
    deliveryOption: { type: String, required: true },
    paymentDetails: {
        cardNumber: { type: String, required: true },
        cvv: { type: String, required: true },
        expiry: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true },
        nickName: { type: String, required: true }
    },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Checkout', CheckoutSchema);
