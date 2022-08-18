const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.validateOldPassword = async (req, res, next) => {

    try {
        const user = await User.findOne({
            _id: req.userId
        }).exec();

		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}

		let passwordIsValid = bcrypt.compareSync(
			req.body.oldPassword, // from UI
			user.password
		);

        if (!passwordIsValid) {
			return res.status(404).send({
				message: "The old password is not valid!",
			});
		}
        next()

    } catch (error) {
		res.status(500).send({ message: "Something went wrong" });
    }
}