const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.register = (req, res) => {

    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        
        let token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
            expiresIn: 86400 //24 hours
        });

        res.status(200).send({
            id: user._id,
            email: user.email,
            accessToken: token,
            message: "You registered!"
        });
    });
};

exports.login = (req, res) => {

    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            let token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
                expiresIn: 86400 //24 hours
            });
            
            res.status(200).send({
                id: user._id,
                email: user.email,
                accessToken: token
            });
        });
};