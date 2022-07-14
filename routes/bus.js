const router =require("express").Router();
const bus=require("../model/Bus");
const user=require("../model/User")
const auth=require("../middleware/tokenValidation")
const moment=require("moment")
router.post("/addbus",auth,async(req,res)=>{
    console.log("suriya")
    try{
        const created_on = moment(new Date());
        const {
            number_plate, travels_name, year, capacity,
          } = req.body;

        console.log(req.body.NumberPlate)
        // const check=await user.find({_id:req.payload._id})
        let check=await user.findById(req.user.id)
        console.log(check.is_admin)
        if(check.is_admin==="true"){
        // const find=await bus.findOne({number_plate:number_plate})
        // console.log(find.model)
        // if(find._id===undefined){
       
        const data=await new bus({
            number_plate:number_plate,
            travels_name:travels_name,
            year:year,
            capacity:capacity,
            created_on:created_on
        })
        data.save()
        res.status(200).json({
            status:"sucesss",
            data:data
        })}
        // }}}
        else{
            res.status(404).json({
                message:"you don't have a permission"
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

router.get("/allbus",auth,async(req,res)=>{
    try{
        let check=await user.findById(req.user.id)
        console.log(check.is_admin)
        if(check.is_admin==="no"){
            res.status(404).json({
                message:"you don'y have a permission"
            })
        }
        const data=await bus.find({})
        if(data){
            res.status(200).json({
                message:"success",
                data:data
            })
        }
        else{
            res.status(401).json({
                message:"no buses"
            })
        }

    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
})

router.post('/getBusById', auth, async(req, res) => {
    console.log("hello", req.body)
    try{
        let data = await bus.findById(req.body.id)
        console.log(data);
        if(data) {
            res.status(200).json({
                message : "success", 
                data : data
            })
        }
        else{
            res.status(401).json({
                message:"no bus"
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
