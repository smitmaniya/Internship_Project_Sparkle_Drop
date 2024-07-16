// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new Error();
        }
        req.user = user; // Attach user object to request for use in controllers
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

