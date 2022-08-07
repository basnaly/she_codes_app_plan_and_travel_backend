const mongoose = require("mongoose");
const Trip = mongoose.model(
    "Trip",
    new mongoose.Schema({
        createUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        city: String,
        accommodations: [
            {
                accommodation: String,
                currency: String,
                dateFrom: Date,
                dateTo: Date,
                id: Number,
                notes: String,
                price: Number,
            }
        ],
        comments: [
            {
                comment: String,
                id: Number,
            }
        ],
        expences: [
            {
                currency: String,
                date: Date,
                id: Number,
                notes: String,
                payment: String,
                price: Number,
                product: String,
            }
        ],
        period: {
                from: Date,
                to: Date,
            },
        preparations: [
            {
                category: String,
                checked: Boolean,
                id: Number,
                index: Number,
                note: String,
            }
        ],
        transportations: [
            {
                currency: String,
                date: Date,
                id: Number,
                notes: String,
                price: Number,
                transport: String,
            }
        ],
        visitings: [
            {
                date: Date,
                id: Number,
                notes: String,
                visit: String,
            }
        ],
    })
);

module.exports = Trip;