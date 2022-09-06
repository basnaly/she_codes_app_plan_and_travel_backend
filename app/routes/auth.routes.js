const { verifyRegister: verifyRegister } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/authJwt");
const { validateOldPassword } = require("../middlewares/verifyPassword");
const tripController = require("../controllers/trip.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/register",
        [
            verifyRegister.validatePassword,
            verifyRegister.checkDuplicateEmail,
            
        ],
        controller.register
    );
    
    app.post("/api/auth/login", controller.login)

    app.get("/api/auth/check-user", 
        verifyToken, 
        controller.sendUserEmail
    );

    app.post("/api/auth/change-password",
        verifyToken,
        validateOldPassword,
        verifyRegister.validatePassword,
        controller.changePassword
    );

    app.delete("/api/auth/delete-account",
        verifyToken,
        controller.deleteAccount,
        tripController.deleteData
    );

    app.post("/api/auth/save-contact-form",
        controller.saveContactForm
    );
};