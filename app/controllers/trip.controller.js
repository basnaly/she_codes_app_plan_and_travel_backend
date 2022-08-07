const db = require("../models");
const Trip = db.trip;

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

    catch(e) {
        res.status(500).end('Error to create new trip ' + e)
    }   
}

exports.getListTrips = async (req, res) => {

    try {
        const result = await Trip.find({ // query to mongo, find all trips of user
            createUser: req.userId //createUser is from model, req.userId is from authJwt
        }).select('_id city').exec() // select columns from trip model

        let mappedListTrips = result.map(el => { // change _id to id
            return {
                id: el._id,
                city: el.city 
            }
        })

        res.status(200).send({
			listTrips: mappedListTrips,
		});
    }
    
    catch(e) {
        res.status(500).end('Error to retrieve list trips ' + e)
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
                message: 'The trip was succesefully deleted!'})
        } else {
            res.status(500).send('Nothing was deleted')
        }
    }

    catch(e) {
        res.status(500).end('Error to delete the trip ' + e)
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

    catch(e) {
        res.status(500).end('Error to recieve trip data' + e)
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
                message: 'Nothing was updated'
            })
        }    
    }

    catch(e) {
        res.status(500).end('Error to update trip data' + e)
    }
}