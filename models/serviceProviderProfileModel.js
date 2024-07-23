const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    licenceImg: {
        type: String,
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
