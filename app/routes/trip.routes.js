const controller = require("../controllers/trip.controller");
const { verifyToken } = require("../middlewares/authJwt");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post("/api/trip/create", verifyToken, controller.createNewTrip);

	app.get("/api/trip/list-trips", verifyToken, controller.getListTrips);

	app.delete("/api/trip/delete-trip", verifyToken, controller.deleteTrip);

	app.get("/api/trip/trip-data", verifyToken, controller.getTripData);

	app.post("/api/trip/trip-data", verifyToken, controller.updateTripData);
};
