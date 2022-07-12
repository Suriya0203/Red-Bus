const mongoose = require('mongoose');

const Bookings = mongoose.model('Bookings', {
    passengerDetails : [
		{
			name : {
                type : String, 
                required : true, 
            }, 
            age : {
                type : Number, 
                required : true,  
            }, 
            gender : {
                type : String, 
                required : true, 
            }, 
        }
    ], 
    email : {
        type : String, 
        required : true, 
    }, 
    phoneNumber : {
        type : String, 
        required : true, 
    }, 
    fare : {
        type : Number, 
        required : true, 
    }, 
    busId : {
        type : mongoose.Types.ObjectId, 
        required : true, 
    }, 
    dateOfBooking : {
        type : Date, 
        // required : true, 
    }, 
    tripId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    seatNumber:{
        type:[], 
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        // required:true
    }
})
module.exports = Bookings
