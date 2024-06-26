const User = require('../models/user');
const ServiceProviderData = require('../models/ServiceProvider')

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
};

const getServiceProviders = async (req, res) => {
    try {
        const serviceProviders = await ServiceProviderData.find();
        res.json(serviceProviders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllUsers,getServiceProviders
};