const Service_List = require('../models/servicelist')
const Service = require('../models/Service')
const ServiceProvider = require('../models/ServiceProvider')


exports.addService = async (req, res) => {
    const { serviceProviderId, services } = req.body;

    try {
        const serviceProvider = await ServiceProvider.findById(serviceProviderId);
        if (!serviceProvider) {
            return res.status(404).json({ error: 'Service provider not found' });
        }

        const serviceEntries = services.map(service => ({
            serviceProviderId,
            name: service.name,
            type: service.type,
            description: service.description,
            price: service.price,
            profileImg: service.profileImg,
            createdDate: service.createdDate || new Date()
        }));

        await Service.insertMany(serviceEntries);

        res.status(201).json({ message: 'Services added successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while adding the services' });
    }
};


exports.getAllServices = async (req, res) => {
    const { serviceProviderId } = req.body;

    try {
        const services = await Service.find({ serviceProviderId });
        res.status(200).json(services);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the services' });
    }
};

// Update Service by Service ID
exports.updateService = async (req, res) => {
    const { serviceId } = req.params;
    const updateData = req.body;

    try {
        const service = await Service.findByIdAndUpdate(serviceId, updateData, { new: true });
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while updating the service' });
    }
};

// Delete Service by Service ID
exports.deleteService = async (req, res) => {
    const { serviceId } = req.params;

    try {
        const service = await Service.findByIdAndDelete(serviceId);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while deleting the service' });
    }
};

/*
exports.removeservice = async(req, res) => {
    const serviceId = req.params.id;
try{
   const slist = await Service_List.findByIdAndDelete(serviceId);
   if(slist){
    //console.log("service Removed",slist);
   // res.json(slist);
    res.status(500).send("Service Deleted");
   }
}catch(error) {
        console.error('Error removing service:', error);
}
};

exports.updateservice = async(req, res) =>{
    const serviceId = req.params.id;
    const {Servicename,Description,Price} = req.body;
    
 try{
    const updatedService = await Service_List.findByIdAndUpdate(
        serviceId,
        { Servicename, Description,Price },
        {
          new: true, // Return the updated document
          runValidators: true // Ensure the update adheres to the schema
        }
      );
  
      if (!updatedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      res.json(updatedService);

 }
catch (error) {
    res.status(500).json({ message: error.message });
  }
} 
*/