const Joi=require('joi')

const authSchema=Joi.object({
    //email:Joi.string().email().lowercase().required(),
    //phoneNumber:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
})
module.exports=authSchema;