const router =require("express").Router();
const bus=require("../model/Bus");
const user=require("../model/User")
const auth=require("../middleware/tokenValidation")
const moment=require("moment")
const trip=require("../model/Trip")
const mongoose=require("mongoose")
router.post('/createtrip',auth,async(req,res)=>{
    try{
        const created_on = moment(new Date());
        const {
            operatorName, busId, departureTime, departureLocation,arrivalLocation,
            duration,Trip_date,fare
          } = req.body;
        // const check=await user.find({_id:req.payload._id})
        var check=await user.findById(req.payload._id)
        console.log(check.is_admin)
        if(check.is_admin==="true"){
        // const find=await trip.find({number_plate:number_plate})
        // if(find){
        //     res.status(401).json({
        //         message:"bus already excist"
        //     })
        // }
        const data=await new trip({
            operatorName:operatorName,
            busId:busId,
            departureLocation:departureLocation,
            departureTime:departureTime,
            arrivalLocation:arrivalLocation,
            duration:duration,
            Trip_date:Trip_date,
            created_on:created_on,
            fare:fare
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
        res.status(500).json({
            erroe:err
        })
    }
})

router.get("/alltrip",auth,async(req,res)=>{
    try{
        var check=await user.findById(req.payload._id)
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
        var check=await user.findById(req.payload._id)
        console.log(check.is_admin)
        if(check.is_admin==="no"){
            res.status(404).json({
                message:"you don'y have a permission"
            })
        }
        // id=req.params.id.toString()
        // console.log(mongoose.Types.ObjectId.isValid(id));
        // ObjectId.fromString( id );
        const id = mongoose.Types.ObjectId(req.params.id.trim());
        const data=await Bookings.findOne({_id:id})
        console.log(data)
        if(data){
        data.delete()
        res.status(200).json({
            message:"success"
        })
    }
        else{
            res.status(401).json({
                message:"No trip in this id"
            })
        }
    }
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
        var check=await user.findById(req.payload._id)
        console.log(check.is_admin)
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
        res.status(500).json({
            error:err
        })
    }
})

router.get("/filtertripbydestination",auth,async(req,res)=>{
    try{
        var check=await user.findById(req.payload._id)
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

module.exports=router;