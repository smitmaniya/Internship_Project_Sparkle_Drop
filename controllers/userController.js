const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
};

const getServiceProviders = async (req, res) => {
    try {
        const serviceProviders = await User.find({ role: 2 });
        res.json(serviceProviders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllUsers,getServiceProviders
};