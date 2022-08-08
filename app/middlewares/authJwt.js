const jwt = require("jsonwebtoken");
const config = require("../config/auth.config"); // to bcript password 

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"]; //verify token from request header
	if (!token) {
		return res.status(403).send({ message: "You should login!" });
	}
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "You should login again!" });
		}
		req.userId = decoded.id;   // save userId
		req.email = decoded.email;  // and email from decoded {} to request
		next()
	});
};

const authJwt = {
	verifyToken,	
};

module.exports = authJwt;