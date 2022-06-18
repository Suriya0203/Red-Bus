const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getAccess = require('../middleware/tokenValidation')


router.post("/signup", async (req, res)=>{
    try{
        const Users = await User.findOne({'email' : req.body.email})
        if(Users === null)
        {
            const salt = await bcrypt.genSalt(10);
            await bcrypt.hash(req.body.password, salt, async (err, hashedPassword)=>{
                if(err) {console.log(err)}
                const newUser = await new User({
                    name : req.body.name, 
                    email : req.body.email, 
                    password : hashedPassword,
                    age : req.body.age, 
                    gender : req.body.gender, 
                    profileImg : req.body.profileImg
                });
                const user = await newUser.save();
                res.status(200).json({
                    "user" : user
                })
            })
        }
        else{
            res.status(402).json({
                message : "Already have an account"
            })
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            message : err
        });
    }
});


router.post("/signin", async (req, res)=>{
    try{
        const user = await User.findOne({email : req.body.email});
        !user && res.status(404).json({
            message : "User not found"
        })
        if(user !== null)
        {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json({
                message : "Invalid Password"
            })
            if(validPassword !== false)
            {
                const token = jwt.sign({_id : user._id}, process.env.JWT_KEY, {expiresIn:"24h"});
                const Users = await User.find({'email' : req.body.email})
                if(Users!==null){
                    return res.status(200).json({"token": token, "user" : Users})
                }
            }
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err);
    }
    
})

module.exports = router;