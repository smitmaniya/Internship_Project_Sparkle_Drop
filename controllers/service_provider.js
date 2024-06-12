const Service_Provider = require('../models/ServiceProvider');
const service_provider_profile_data = async (req, res) => {
    const { company_name, email, address, city, province, zip_code,cnumber,service_name,price } = req.body;

    try {
        let service = new Service_Provider({
            company_name,
            email,
            address,
            city,
            province,
            zip_code,
            cnumber,
            //service_name,
            price
        });

        data = await service.save();
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    service_provider_profile_data
};