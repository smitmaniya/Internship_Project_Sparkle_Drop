const mongoose = require("mongoose");

const serviceschema = new mongoose.Schema ({
Servicename:{
    type: String,
    enum : [0,1,2,3],
    default : 0 ,
    required:true  //0 is washing , 1 is dring , 2 is folding ,3 is ironing

},
Description:{
    type:String,
    required:true
},
createdAt: 
{ type: Date, 
  default: Date.now 
},
Price:{
    type:Number,
    required:true
}
});





module.exports = mongoose.model('Service_List', serviceschema);