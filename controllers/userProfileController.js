const User = require('../models/userProfileModel');

const upload = require('../upload'); // Adjust the path according to your project structure

// Create User
const createUserProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }

        const { name, country, address, city, province, postalCode, phoneNumber } = req.body;

        try {
            const user = new User({
                name,
                country,
                address,
                city,
                province,
                postalCode,
                phoneNumber,
                profileImage: req.file ? `/uploads/${req.file.filename}` : null
            });

            const data = await user.save();
            res.status(201).json(data);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
};

// Update User
const updateUserProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }

        const { id } = req.params;
        const { name, address, city, province, country, postalCode, phoneNumber } = req.body;

        try {
            const updateData = {
                name,
                address,
                city,
                province,
                country,
                postalCode,
                phoneNumber
            };

            if (req.file) {
                updateData.profileImage = `/uploads/${req.file.filename}`;
            }

            const user = await User.findByIdAndUpdate(id, updateData, { new: true });

            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
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
