const { Timestamp } = require('mongodb');
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        require:true,
    },
    brand:{
        type:String,
        require:true,
    },
    quantity:{
        type:Number,
        require:true,
    },
    sold:{
        type:Number,
        default:0,
    },
    images:[{
        public_id:String,
        url:String,
    },],
    color:[],
    tags:String,
    rating:[{
        star:Number,
        comment:String,
        postedby:{
            type:mongoose.Schema.Types.ObjectId,ref:"user"
        },
    }],
    totalrating:{
        type:String,
        default:0,
    },
},
{Timestamp:true},
);

//Export the model
module.exports = mongoose.model('Product', productSchema);