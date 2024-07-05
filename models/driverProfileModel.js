const mongoose = require('mongoose');

const DriverProfileSchema = new mongoose.Schema({
    name: {
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
    profileImage: {
        type: String,  // Store the image URL or path
        required: false
    }
});

module.exports = mongoose.model('Driver_Profile', DriverProfileSchema);
