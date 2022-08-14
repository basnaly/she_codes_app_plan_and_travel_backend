const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
	try {
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
		});

		const result = await user.save();

		let token = jwt.sign(
			{ id: user.id, username: user.username, email: user.email },
			config.secret,
			{
				expiresIn: 86400, //24 hours
			}
		);

		res.status(200).send({
			id: user._id,
			username: user.username,
			email: user.email,
			accessToken: token,
			message: "You registered!",
		});

	} catch (e) {
		console.log(e)
		res.status(500).send({ message: e });
	}
};

exports.login = async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
		}).exec();

		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}

		let passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password!",
			});
		}

		let token = jwt.sign(
			{ id: user.id, username: user.username, email: user.email },
			config.secret,
			{
				expiresIn: 86400, //24 hours
			}

		);

		res.status(200).send({
			id: user._id,
			username: user.username,
			email: user.email,
			accessToken: token,
		});

	} catch (e) {
		res.status(500).send({ message: err });
	}
};

exports.sendUserEmail = (req, res) => {
	res.status(200).send({
		id: req.userId,
		username: req.username,
		email: req.email,
	});
};
