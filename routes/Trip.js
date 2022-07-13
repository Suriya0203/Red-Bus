const router =require("express").Router();
const bus=require("../model/Bus");
const user=require("../model/User")
const Bookings=require("../model/Bookings")
const auth=require("../middleware/tokenValidation")
const moment=require("moment")
const trip=require("../model/Trip")
const mongoose=require("mongoose");
const Trip = require("../model/Trip");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'suriyaprakash0203@gmail.com',
    pass: 'jtgmyxxqkuxmdhzj'
  }
});


router.post('/createtrip',auth,async(req,res)=>{
    try{
        console.log("suriya")
        const created_on = moment(new Date());
        const {
            operatorName, busId, departureTime, departureLocation,arrivalLocation,
            duration,Trip_date,fare
          } = req.body;
        // const check=await user.find({_id:req.payload._id})
        var check=await user.findById(req.user.id)
        console.log(check.is_admin)
        if(check.is_admin==="true"){
        // const find=await trip.find({number_plate:number_plate})
        const find=await trip.find({busId:busId})
        console.log(find)
        // if(find){
        //     res.status(401).json({
        //         message:"bus already excist"
        //     })
        // }
        const newBus = await bus.findById(busId);
        const availableSeats = Array.from(Array(newBus.capacity).keys())
            console.log(availableSeats)
        const data=await new trip({
            operatorName:operatorName,
            busId:busId,
            departureLocation:departureLocation,
            departureTime:departureTime,
            arrivalLocation:arrivalLocation,
            duration:duration,
            Trip_date:Trip_date,
            created_on:created_on,
            fare:fare, 
            availableSeats : availableSeats
        })
        data.save()
        res.status(200).json({
            status:"sucesss",
            data:data
        })
        }
        else{
            res.status(404).json({
                message:"you don't have a permission"
            })
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            erroe:err
        })
    }
})

router.get("/alltrip",auth,async(req,res)=>{
    try{
        var check=await user.findById(req.user.id)
        console.log(check.is_admin)
        if(check.is_admin==="no"){
            res.status(404).json({
                message:"you don'y have a permission"
            })
        }
        const data=await trip.find({})
        if(data){
            res.status(200).json({
                message:"success",
                data:data
            })
        }
        else{
            res.status(401).json({
                message:"no trips"
            })
        }

    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
})
router.delete('/canceltrip/:id/',auth,async(req,res)=>{
    try{
        console.log("suriya")
        const id = mongoose.Types.ObjectId(req.params.id.trim());
        var find=await Bookings.find({tripId:id})
        var mailList=[];

        // else{
        var check=await user.findById(req.user.id)
        console.log(check.is_admin)
        if(check.is_admin==="no"){
            res.status(404).json({
                message:"you don't have a permission"
            })
        }
        else{
            if(find){
            
                find.map((index)=>{
                     mailList.push(index.email)
                })
                var mailOptions = {
                 from: 'suriyaprakash0203@gmail.com',
                 to: mailList,
                 subject: 'Trip canceled',
                 text: 'You"r money will refund'
               };
             transporter.sendMail(mailOptions, function(error, info){
                 if (error) {
                   console.log(error);
                 } else {
                   console.log('Email sent: ' + info.response);
                 }
               });
             }
        // id=req.params.id.toString()
        // console.log(mongoose.Types.ObjectId.isValid(id));
        // ObjectId.fromString( id );
       
        const data=await Trip.find({_id:id})
        console.log(data)
        if(data){
            const delete_num=await Trip.findOneAndDelete({_id:id})
      
            res.status(200).json({
            message:"success"
        })
    }
        else{
            res.status(401).json({
                message:"No trip in this id"
            })
        }
    }}
    catch(err){
        console.log(err)
        res.status(500).json(
            {
                error:err
            }
        )
    }
})

router.get("/filtertripbyorigin",auth,async(req,res)=>{
    try{
        var check=await user.findById(req.user.id)
        // console.log(check.is_admin)
        // if(check.is_admin==="no"){
        //     res.status(404).json({
        //         message:"you don'y have a permission"
        //     })
        // }
        const data=await trip.find({departureLocation:req.body.origin})
        if(data){
            res.status(200).json({
                message:"success",
                data:data
            })
        }
        else{
            res.status(401).json({
                message:"no trips"
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

router.get("/filtertripbydestination",auth,async(req,res)=>{
    try{
        var check=await user.findById(req.user.id)
        console.log(check.is_admin)
        // if(check.is_admin==="no"){
        //     res.status(404).json({
        //         message:"you don'y have a permission"
        //     })
        // }
        const data=await trip.find({arrivalLocation:req.body.destination})
        if(data){
            res.status(200).json({
                message:"success",
                data:data
            })
        }
        else{
            res.status(401).json({
                message:"no trips"
            })
        }

    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
})


router.post('/getTrip', auth, async(req, res) => {
    console.log(req.body)
    try{
        var data = await trip.find({
            departureLocation : req.body.source, 
            arrivalLocation : req.body.destination
        })
        console.log(data);
        if(data) {
            res.status(200).json({
                message : "success", 
                data : data
            })
        }
        else{
            res.status(401).json({
                message:"no trips"
            })
        }
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
})

router.post('/getTripById', auth, async(req, res) => {
    console.log("hello", req.body)
    try{
        var data = await trip.findById(req.body.id)
        console.log(data);
        if(data) {
            res.status(200).json({
                message : "success", 
                data : data
            })
        }
        else{
            res.status(401).json({
                message:"no trips"
            })
        }
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
})

module.exports=router;
