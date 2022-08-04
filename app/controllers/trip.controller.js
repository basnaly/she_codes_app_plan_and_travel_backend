const db = require("../models");
const Trip = db.trip;

exports.createNewTrip = async (req, res) => {

    try {
        const trip = new Trip({
            ...req.body.trip,
            createUser: req.userId,
        });

        const createNewTrip = await trip.save();

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
        const listTrips = await Trip.find({ // query to mongo, find all trips of user
            createUser: req.userId //createUser is from model, req.userId is from authJwt
        }).select('_id city').exec() // select columns from trip model

        let mappedListTrips = listTrips.map(el => { // change _id to id
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
        const deleteTrip = await Trip.deleteOne({
            _id: req.query.tripId, // request: query: tripId from client
            createUser: req.userId
        })

        console.log(deleteTrip)

        if (deleteTrip.deletedCount === 1) {
            res.status(200).send('The trip was successefully deleted!')
        } else {
            res.status(500).send('Nothing was deleted')
        }
    }

    catch(e) {
        res.status(500).end('Error to delete the trip ' + e)
    } 
}

