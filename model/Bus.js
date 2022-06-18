const mongoose = require('mongoose');

const Bus = mongoose.model('Bus', {
    operatorName : {
        type : String, 
        required : true, 
    },
    busId : {
        type : String, 
        required : true, 
    }, 
    departureTime : {
    type : String, 
    required : true, 
    }, 
    seats : {
            type : Number,
    required : true, 
    }, 
    busType : {
        type : String, 
    required : true,   
    }, 
        rating : {
            type : Number, 
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
    duration : {
        type : Number, 
        required : true, 
    },
    images : {
        type : String, 
        required : true, 
    }, 
    liveTracking : {
        type : boolean, 
        required : true, 
    }, 
    cancellable : {
        type : boolean, 
        required : true, 
    }    
})
module.exports = Bus