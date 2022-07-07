const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth=require("../middleware/tokenValidation")
const getAccess = require('../middleware/tokenValidation')
var jwtSecret = process.env.JWT_KEY
const { check, validationResult } = require("express-validator");
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

		const { name, email, password,age,gender,profileImg } = req.body;

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
                age,gender,profileImg 
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
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);
module.exports = router;