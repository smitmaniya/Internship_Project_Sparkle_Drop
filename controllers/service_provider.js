const Service_Provider = require('../models/ServiceProvider');



const service_provider_profile_data = async (req, res) => {
    const { company_name, country, address, city, province, postalCode,cnumber,service_name,description,email } = req.body;

    try {
        let service = new Service_Provider({
            
            company_name,
            country,
            address,
            city,
            province,
            postalCode,
            cnumber,
            service_name,
            description,
            email
            
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