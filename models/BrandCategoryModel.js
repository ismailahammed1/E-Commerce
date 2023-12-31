const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var BrandCategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
   
},
{Timestamp:true},
);

//Export the model
module.exports = mongoose.model('BrandCategory', BrandCategorySchema);
