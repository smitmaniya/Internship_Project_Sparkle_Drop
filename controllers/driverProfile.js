const Driver = require('../models/driverProfileModel.js');
const upload = require('../upload');

const createDriverProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }

        const { name, country, address, city, province, postalCode, phoneNumber } = req.body;

        try {
            const driver = new Driver({
                name,
                country,
                address,
                city,
                province,
                postalCode,
                phoneNumber,
                profileImage: req.file ? `/uploads/${req.file.filename}` : null
            });

            const data = await driver.save();
            res.status(201).json(data);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
};

const getAllDriver = async (req, res) => {
    try {
        const users = await Driver.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    createDriverProfile,getAllDriver
};