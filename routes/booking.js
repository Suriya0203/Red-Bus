const router =require("express").Router();
const bus=require("../model/Bus");
const user=require("../model/User")
const auth=require("../middleware/tokenValidation")
const trip=require("../model/Trip")
const moment=require("moment");
const Bookings = require("../model/Bookings");
var mongoose = require('mongoose');
const authSchema=require('../Helpers/BookingValidation');
const Trip = require("../model/Trip");
const { body, validationResult } = require("express-validator");
router.post('/createbooking',auth,async(req,res)=>{
    console.log(req.body)
    try{
        const created_on = moment(new Date());
        const {
            passengerDetails, email, phoneNumber, tripId, fare, busId, seatNumber,
          } = req.body.email;
        //const fare=
        console.log(busId, email)
        var oldbookings = [];
        oldbookings = await Bookings.find({'busId' : busId, 'email' : email})
        console.log("old bookings",oldbookings.passengerDetails);

        
        const find=await trip.findById(tripId)
        console.log(find);
        if(find && oldbookings.length === 0){
            var seats = [];
            for(var i=0; i<find.bookedSeats; i++)
            {
                seats.push(find.bookedSeats[i])
            }
            for(var i =0; i<seatNumber.length; i++)
            {
                seats.push(seatNumber[i]);
            }
            console.log("seats", seats);

            var delSeats = [];
            for(var i=0; i< find.availableSeats.length; i++)
            {
                delSeats.push(find.availableSeats[i])
            }
            console.log("delSeats", delSeats)

            for(var i=0; i<seatNumber.length; i++)
            {
                const index = delSeats.indexOf(parseInt(seatNumber[i]-1));
                if(index > -1)
                {
                    delSeats.splice(index, 1)
                }
            }
            console.log("delSeats", delSeats)
            const val = await trip.findOneAndUpdate({'_id' : tripId}, 
                {bookedSeats : seats})

            const val2 = await trip.findOneAndUpdate({'_id' : tripId}, 
                {availableSeats : delSeats})
            
            const data = await Bookings.create(req.body.email)    
            data.created_on=created_on
            data.userId=req.user.id 
            data.save()  
            res.status(200).json({
                data:data
            })
        }
        else{
            if(oldbookings.length !== 0)
            {
                res.status(400).json({
                    message : "You've already booked a ticket"
                })
            }else{
            res.status(401).json({
                message:"No trip in this ID"
            })}
        }
    }
    catch(err){
        if(err.isJoi===true){
            res.status(422).json({
                msg:"Invalid credentials"
            })
        }
        console.log(err)
        res.status(500).json(err)
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

///

router.get("/getbookings/:id",auth,async(req,res)=>{
    try{
        console.log("suriya")
        const data = await Bookings.find({tripId:req.params.id})
        console.log(data)
        
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
router.get('/getticket',auth,async(req,res)=>{
    try{
        const data=await Bookings.find({userId:req.user.id})
        console.log(data)
        if(data){
            console.log(data.tripId)
            const second_data=await Bookings.findOne({userId:req.user.id})
            const id = mongoose.Types.ObjectId(second_data.tripId);
            

            console.log(second_data.tripId,'-----',id)
            const trip_data=await Trip.find({_id:id})
            res.status(200).json({
                data:data,
                trip:trip_data
            })
        }
        else{
            res.json({
                msg:"You not Book enything"
            })
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            msg:"server error"
        })
    }
})

module.exports=router

