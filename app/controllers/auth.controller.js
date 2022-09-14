const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const ContactForm = require("../models/contactForm.model");

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
				expiresIn: 172800, // 48 hours
			}
		);

		res.status(200).send({
			id: user._id,
			username: user.username,
			email: user.email,
			accessToken: token,
			message: "You registered!",
		});

	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Something went wrong" });
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
				expiresIn: 172800, 
			}

		);

		res.status(200).send({
			id: user._id,
			username: user.username,
			email: user.email,
			accessToken: token,
		});

	} catch (error) {
		res.status(500).send({ message: "Something went wrong" });
	}
};

exports.sendUserEmail = (req, res) => {
	res.status(200).send({
		id: req.userId,
		username: req.username,
		email: req.email,
	});
};

exports.changePassword = async (req, res) => {

	try {
		const result = await User.updateOne(
			{
				_id: req.userId
			},
			{
				password: bcrypt.hashSync(req.body.password, 8),
			})

		if (result.modifiedCount === 1) {
			res.status(200).send({
				message: 'The password was updated!'
			})
		} else {
			res.status(400).send({
				message: 'Nothing was updated!'
			})
		}   
	} 
	catch (error) {
		res.status(500).send({ message: "Something went wrong" });
	}
};

exports.deleteAccount = async (req, res, next) => {

	try {

		const result = await User.deleteOne({
			_id: req.userId
		})

		if (result.deletedCount === 1) {
            next()
        } else {
            res.status(500).send({message: 'User was not deleted!'})
        }

	} catch(error) {
		console.log(error);
		res.status(500).send({ message: "Something went wrong" });
	}
};

exports.saveContactForm = async (req, res) => {

	try {
		const contactForm = new ContactForm({
			name: req.body.username,
			email: req.body.email,
			subject: req.body.subject,
			textarea: req.body.textarea,
			date: new Date(),
		});
		
		const result = await contactForm.save();

		res.status(200).send({
			message: "Your form has been sent!",
		});

	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Something went wrong" });
	}
};