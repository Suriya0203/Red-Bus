
const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name : {
	type : String, 
	required : true, 
    }, 
    email : {
        type : String, 
        required : true,
    },
    password : {
        type : String, 
        required : true,
    },
    age : {
        type : String, 
        required : true, 
    }, 
    gender : {
        type : String, 
        required : true, 
    }, 
    phonenum:{
        type:String
    },
    profileImg : {
        type : String, 
        required : true,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" 
    },
    is_admin:{
        type: String,
        default:"no",
        required:true
    }

})
module.exports = User 