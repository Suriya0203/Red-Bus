const router =require("express").Router();
const bus=require("../model/Bus");
const user=require("../model/User")
const auth=require("../middleware/tokenValidation")
const trip=require("../model/Trip")
const moment=require("moment");
const Bookings = require("../model/Bookings");
router.post('/createbooking',auth,async(req,res)=>{
    try{
        const created_on = moment(new Date());
        const {
            tripId, busId, name, age,gender,seatNumber,
          } = req.body;
        //const fare=
        const find=await trip.findById(tripId)
        if(find){
            const data = await Bookings.create(req.body)
            data.created_on=created_on
            data.userId=req.payload._id  
            data.save()  
            res.status(200).json({
                data:data
            })
        }
        else{
            res.status(401).json({
                message:"No trip in this ID"
            })
        }
    }
    catch(err){
        console.log(err)
        res.json(500).json(err)
    }
})

module.exports=router