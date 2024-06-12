const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [0, 1, 2],// 0 for User, 1 for Driver, 2 for Service Provider
        default: 0 // Default role is 'User'
    }
});

module.exports = mongoose.model('User', UserSchema);
