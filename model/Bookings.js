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
        type : String, 
        required : true, 
    }, 
    dateOfBooking : {
        type : String, 
        required : true, 
    }, 
    departureDetails : {
        from : {
            type : String, 
            required : true, 
        },
        to : {
            type : String, 
            required : true, 
        }, 
        date : {
            type : String, 
            required : true, 
        }, 
        time : {
            type : String, 
            required : true, 
        }, 
    }, 
    returnDetails : {
        from : {
            type : String, 
            required : true, 
        },
        to : {
                type : String, 
                required : true, 
        }, 
        date : {
            type : String, 
            required : true, 
        }, 
        time : {
            type : String, 
            required : true, 
        }, 
    },
})
module.exports = Bookings