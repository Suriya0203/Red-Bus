const router =require("express").Router();
const bus=require("../model/Bus");
const user=require("../model/User")
const auth=require("../middleware/tokenValidation")
const trip=require("../model/Trip")
const moment=require("moment");
const Bookings = require("../model/Bookings");
var mongoose = require('mongoose');
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
            data.userId=req.user.id 
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
router.get("/allbookings",auth,async(req,res)=>{
    try{
        const data = await Bookings.find({userId:req.user.id})
        if(data){
        res.status(200).json({
            message:"successs",
            data:data
        })}
        else{
            res.status(401).json({
                message:"no booking in this ID"
            })
        }
    }
    catch(err){
        res.send(500).json({
            error:err
        })
    }
})
router.delete("/deletebooking/:id",auth,async(req,res)=>{
    // const id=req.params.id.toString()
    // var Schema = mongoose.Schema;
    // var ObjectId = Schema.ObjectId; 
    // var id = new ObjectId(req.params.id);
    try{
    const id = mongoose.Types.ObjectId(req.params.id.trim());
    // const data=Bookings.find({_id:id})
    const data=await Bookings.findOne({_id:id})
    console.log(data)
    
    if(data){
        if(data.userId.toString()===req.user.id.toString()){
    data.delete()
    res.status(200).json({
        message:"success"
    })}
    else{
        res.status(401).json({
            message:"you'r not booking this id"
        })
    }
}
else{
    res.status(401).json({
        message:"No booking in this id"
    })
}}catch(err){
    res.status(500).json({
        error:err
    })
}
})
router.put('/updatebooking/:id',auth,async(req,res)=>{
    try{
        const {seatNo}=req.body
        const id = mongoose.Types.ObjectId(req.params.id.trim());
        const data=await Bookings.findOneAndUpdate({_id:id},
            {$set:{seatNumber:seatNo}})

        console.log(data)
        if(data){
        res.status(200).json(
            {
                message:"success",
                data:data
            }
        )}
        else{
            res.status(401).json({
                message:"No Booking in this ID"
            })
        } 
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
})
module.exports=router