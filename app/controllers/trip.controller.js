const db = require("../models");
const Trip = db.trip;

const months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

exports.createNewTrip = async (req, res) => {

    try {
        const trip = new Trip({
            ...req.body.trip,
            createUser: req.userId, 
        });

        const result = await trip.save();

            res.status(200).send({
                message: "The trip was created!",
            });
        }

    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }   
}

exports.getListTrips = async (req, res) => {

    try {
        const result = await Trip.find({ // query to mongo, find all trips of user
            createUser: req.userId //createUser is from model, req.userId is from authJwt
        }).select('_id city period').exec() // select columns from trip model
        console.log(result)

        let mappedListTrips = result.map(el => { // change _id to id

            let period = 'Current';

            let today = new Date()
            let startTrip = new Date(el.period.from)
            let endTrip = new Date(el.period.to)

            if (today.getTime() > endTrip.getTime()) {
                period = 'Past'
            }
            else if (today.getTime() < startTrip.getTime()) {
                period = 'Future'
            }

            let startingTrip = months[el.period.from.getMonth()] + ' ' + el.period.from.getFullYear();

            return {
                id: el._id,
                city: el.city,
                period,
                startingTrip
            }
        })

        res.status(200).send({
			listTrips: mappedListTrips,
		});
    }
    
    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }
}

exports.deleteTrip = async (req, res) => {

    try {
        const result = await Trip.deleteOne({
            _id: req.query.tripId, // request: query: tripId from client
            createUser: req.userId
        })

        console.log(result)

        if (result.deletedCount === 1) {
            res.status(200).send({
                message: 'The trip was deleted!'})
        } else {
            res.status(500).send('Nothing was deleted!')
        }
    }

    catch(error) {
		res.status(500).send({ message: "Something went wrong" });
    } 
}

exports.getTripData = async (req, res) => {

    try {
        const result = await Trip.findOne({
            _id: req.query.tripId,
            createUser: req.userId 
        }).select("-_id -__v -createUser")
        
        res.status(200).send({
			trip: result,
		});
    }

    catch(error) {
		res.status(500).send({ message: "Something went wrong" });
    }
}

exports.updateTripData = async (req, res) => {
    try {
        const result = await Trip.updateOne(
        {
            _id: req.query.tripId,
            createUser: req.userId
        }, 
        {
            ...req.body.trip,
            createUser: req.userId,
        }) // rewrite createUser to avoid hacking

        if (result.modifiedCount === 1) {
            res.status(200).send({
                message: 'Trip was updated!'
            })
        } else {
            res.status(400).send({
                message: 'Nothing was updated!'
            })
        }    
    }

    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }
}

exports.deleteData = async (req, res) => {

    try {
        const result = await Trip.deleteMany({
            createUser: req.userId
        })

        console.log(result)

        res.status(200).send({
                message: 'Account was deleted!'
        })     
    }

    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    } 
}