const mongoose = require("mongoose");
const ContactForm = mongoose.model(
    "ContactForm",
    new mongoose.Schema({
        name: String,
        email: String,
        subject: String,
        textarea: String,
        date: Date,
    })
);

module.exports = ContactForm;