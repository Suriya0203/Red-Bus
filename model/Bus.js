const mongoose = require('mongoose');

const Bus = mongoose.model('Bus', {
    number_plate:{
        type:String,
        required:true
    },
    travels_name:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    created_on:{
        type:Date
    },
    rating:{
        type:String
    }
})
module.exports = Bus