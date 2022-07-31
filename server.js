const express = require("express");
const cors = require("cors");

require('dotenv').config();
const app = express();

let corsOptions = {
    origin: "http://localhost:8086"
};

app.use(cors(corsOptions)); 

app.use(express.json()); 

app.use(express.urlencoded({ extended: true})); 

const db = require("./app/models"); // index.js


db.mongoose.connect(process.env.MONGO_URI, 
    { useNewUrlParser: true, 
    //    useUnifieldTopology: true 
    }
).then(() => {
        console.log("Successfully connect to MongoDB");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    })

app.get("/", (req, res) => { // get req
    res.json({ message: "Hello"}); // send respons
})

require("./app/routes/auth.routes")(app); // urls

const PORT = process.env.PORT || 8085; // set port, listen for requests

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
})

