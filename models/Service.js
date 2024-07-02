const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service_Provider',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    profileImg: {
        type: String,
        required: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Service', ServiceSchema);
