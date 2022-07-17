const mongoose = require('mongoose');

const Trip = mongoose.model('Trip', {
    operatorName : {
        type : String, 
        required : true, 
    },
    busId : {
        type : mongoose.Types.ObjectId, 
        required : true, 
    }, 
    departureTime : {
        type : String, 
        required : true, 
    }, 
    departureLocation : {
        type : String, 
        required : true, 
    }, 
    arrivalLocation : {
        type : String, 
        required : true, 
    }, 
    fare:{
        type:Number,
        required:true
    },
    duration : {
        type : Number, 
        required : true, 
    },
    liveTracking : {
        type : String, 
    }, 
    Trip_date:{
        type:Date,
        required:true
    },
    created_on:{
        type :Date
    }, 
    bookedSeats : {
        type : [], 
        default : []
    }, 
    availableSeats : {
        type : [], 
        default : []
    }
})
module.exports = Trip