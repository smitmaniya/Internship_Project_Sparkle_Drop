const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        unique: true
    },
    cnumber: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
       required: true
    },
    price: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Service_Provider', ServiceProviderSchema);
