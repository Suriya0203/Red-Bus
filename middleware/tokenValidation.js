const jwt = require("jsonwebtoken");

var jwtSecret = "mysecrettoken";

module.exports = function (req, res, next) {
	try {
    const token = req.header("x-auth-token");
    console.log(token)
	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied" });
	}
	
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.user = decoded.user;
        console.log(req.user.id)
		// console.log(req.user.id)
		next();
	} catch (err) {
        console.log(err)
		res.status(401).json({ msg: "Token is not valid" });
	}
};