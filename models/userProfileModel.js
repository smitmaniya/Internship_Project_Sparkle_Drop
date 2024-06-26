const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    }
});

module.exports = mongoose.model('User_Profile', UserProfileSchema);
