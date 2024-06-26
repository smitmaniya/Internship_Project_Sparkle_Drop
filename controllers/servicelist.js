const Service_List = require('../models/servicelist')



exports.addservice = async(req, res) => {
    const {Servicename,Description,Price} = req.body;
    
        try{
            let sname = new Service_List({
                Servicename,Description,Price
            })
            data = await sname.save();
            res.json(data);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }


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