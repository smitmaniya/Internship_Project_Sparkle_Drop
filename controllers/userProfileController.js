const User = require('../models/userProfileModel');

// Create User
const createUserProfile = async (req, res) => {
    const { name, email, address, city, province, postalCode, phoneNumber } = req.body;

    try {
        const user = new User({
            name,
            email,
            address,
            city,
            province,
            postalCode,
            phoneNumber
        });

        const data = await user.save();
        res.status(201).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update User
const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, address, city, province, postalCode, phoneNumber } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, {
            name,
            email,
            address,
            city,
            province,
            postalCode,
            phoneNumber
        }, { new: true });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get All Users
const getAllCustomer = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createUserProfile,
    updateUserProfile,
    getAllCustomer
};
