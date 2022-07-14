const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth=require("../middleware/tokenValidation")
const getAccess = require('../middleware/tokenValidation')
const  jwtSecret = process.env.JWT_KEY
const { check, validationResult } = require("express-validator");

const authSchema=require('../Helpers/BookingValidation')
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
router.post(
	"/signin",
	
	async (req, res) => {
        console.log(req.body.email)
		// const errors = validationResult(req);
		// console.log(errors)
// 
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ errors: errors.array() });
		// }
	
		const { email, password } = req.body;
		// const result=await authSchema.validateAsync(req.body)
		// console.log(result)
		console.log("suriya")
        console.log(email)
		try {
			// See if user exists
			let user = await User.findOne({ email });

			if (!user) {
				return res
					.status(401)
					.json({ msg: "Invalid Credentials"});
			}

			const isMatch = await bcrypt.compare(password, user.password);
			console.log(isMatch)
			if (!isMatch) {
				console.log(1234)
				return res
					.status(400)
					.json({ msg: "Invalid Credentials"});
			}

			//Return jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: "5 days" }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			if(err.isJoi===true){
				res.status(422).json({
					msg:"Invalid credentials"
				})
			}
			console.error(err);
			res.status(500).send("Server error");
		}
	}
);
router.post(
	"/signup",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter password with 6 or more characters"
		).isLength({ min: 5 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password,age,gender,is_admin } = req.body;

		try {
			// See if user exists
			let user = await User.findOne({ email });

			if (user) {
				res.status(400).json({ errors: [{ msg: "User already exists" }] });
			}
			user = new User({
				name,
				email,
				password,
                age,gender,
				is_admin
			});

			//Encrypt Password
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			//Return jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 3 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.log(err)
			res.status(500).send("Server error");
		}
	}
);
router.post("/changepassword",auth,async (req,res)=>{
	try{
		const user=await User.findById(req.user.id)
		const isMatch = await bcrypt.compare(req.body.CurrentPassword, user.password);
		if(isMatch){
				//Encrypt Passwordconsole
				console.log("suriya")

				const salt = await bcrypt.genSalt(10);

				Newpassword = await bcrypt.hash(req.body.NewPassword, salt);
			console.log(Newpassword)
			let data=await User.findByIdAndUpdate(req.user.id,{
				$set:{password:Newpassword}
			  })
			  console.log(data)
			  res.json({
				  data:data	
			  })
			
		}
		else{
			res.json({
				message:"password doesn't match"
			})
		}
	}catch(err){
		res.json({
			error:err
		})
	}
})
module.exports = router;