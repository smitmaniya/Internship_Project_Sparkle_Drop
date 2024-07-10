const ServiceProvider = require('../models/serviceProviderProfileModel');
const upload = require('../upload'); // Adjust the path according to your project structure

// Create Service Provider Profile
const createServiceProviderProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }

        const { companyName, country, address, city, province, postalCode, phoneNumber, description } = req.body;

        try {
            const serviceProvider = new ServiceProvider({
                companyName,
                country,
                address,
                city,
                province,
                postalCode,
                phoneNumber,
                licenceImg: req.file ? `/uploads/${req.file.filename}` : null,
                description
            });

            const data = await serviceProvider.save();
            res.status(201).json(data);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
};

// Update Service Provider Profile
const updateServiceProviderProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }

        const { id } = req.params;
        const { companyName, country, address, city, province, postalCode, phoneNumber, description } = req.body;

        try {
            const updateData = {
                companyName,
                country,
                address,
                city,
                province,
                postalCode,
                phoneNumber,
                description
            };

            if (req.file) {
                updateData.licenceImg = `/uploads/${req.file.filename}`;
            }

            const serviceProvider = await ServiceProvider.findByIdAndUpdate(id, updateData, { new: true });

            if (!serviceProvider) {
                return res.status(404).json({ msg: 'Service Provider not found' });
            }

            res.json(serviceProvider);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
};

// Get All Service Providers
const getAllServiceProviders = async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find();
        res.json(serviceProviders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createServiceProviderProfile,
    updateServiceProviderProfile,
    getAllServiceProviders
};
