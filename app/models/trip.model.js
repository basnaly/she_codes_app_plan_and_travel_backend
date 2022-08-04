const mongoose = require("mongoose");
const Trip = mongoose.model(
    "Trip",
    new mongoose.Schema({
        createUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        city: String,
        accomodations: [
            {
                accomodation: String,
                currency: String,
                dateFrom: Date,
                dateTo: Date,
                id: mongoose.Schema.Types.ObjectId,
                notes: String,
                price: Number,
            }
        ],
        comments: [
            {
                comment: String,
                id: mongoose.Schema.Types.ObjectId,
            }
        ],
        expences: [
            {
                currency: String,
                date: Date,
                id: mongoose.Schema.Types.ObjectId,
                notes: String,
                payment: String,
                price: Number,
                product: String,
            }
        ],
        period: [
            {
                from: Date,
                to: Date,
            }
        ],
        preparations: [
            {
                category: String,
                checked: Boolean,
                id: mongoose.Schema.Types.ObjectId,
                index: Number,
                note: String,
            }
        ],
        transportations: [
            {
                currency: String,
                date: Date,
                id: mongoose.Schema.Types.ObjectId,
                notes: String,
                price: Number,
                transport: String,
            }
        ],
        visitings: [
            {
                date: Date,
                id: mongoose.Schema.Types.ObjectId,
                notes: String,
                visit: String,
            }
        ],
    })
);

module.exports = Trip;