const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, email) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            if (email) {
                res.status(400).send({ message: "Failed! Email is already in use!" })
                return
            }
            next();
        });
};

validatePassword = (req, res, next) => {
    let password = req.body.password;
    const validationError = 'The password must contain lower and upper case letters, numbers and symbols, 8-12 letters';
    let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*-_])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*-_]{8,12}$/;
    const found = password.match(regularExpression);  
    if (!found) {
        res.status(500).send({ message: validationError });
        return
    }
    next();
};

const verifyRegister = {
    validatePassword,
    checkDuplicateEmail,
};

module.exports = verifyRegister;