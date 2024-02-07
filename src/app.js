require('dotenv');
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const { NODE_ENV } = require('./utils/secrets');
const multer = require("multer");

const app = express();

// Middlewares    
app.disable('x-powered-by');
// app.use(helmet())   //HTTP Header security middleware

app.use(morgan('dev'));     //HTTP middleware
app.use(express.json());    //To allow json requests 
app.use(express.urlencoded({ extended: false }))  //Decode requests from forms (To allow objects to be sent from forms or not using the query string (qs))
app.use(cookieParser())

// To prevent cors error
app.use(cors())


if (!fs.existsSync('./uploads')) {
    fs.mkdirSync("./uploads")
}
 
// For API endpoint (home route)
app.get("/", (req, res) => {
    res.status(200).json({
        status: "IComply Backend Server ACTIVE!",
        type: `${req.method} request`
    })
})

// For API endpoint (/api/v1 route)
app.get("/api/v1", (req, res) => {
    res.status(200).json({
        status: "IComply V1 Backend Server ACTIVE!",
        type: `${req.method} request`
    })
})

/** ROUTES - Return all the routes from our routes directory */
app.use("/api/v1", require('./src/api/v1/routes/index'));

// General (Custom) Error middleware handler - This error handler is also used by express async handler method as it calls the next method which looks for the next error handler middleware 
app.use((error, req, res, next) => {

    let err = error;    //Clone the error parameter into the err variable
    // // If error is a multer Error, the status is 400 and the error is the error message
    if (err instanceof multer.MulterError) {
        err.status = 400;
        err.error = err.message;
    }

    return res.status(err.status || 500).json({
        error: err.error || "Internal Server Error.",
        errorMessage: err.message || "Something went wrong.",
        success: false,
        status: err.status || 500
    })
})

// Return 404 JSON response for undefined requests
app.use("*", (req, res) => {
    res.status(404).send({ error: "Endpoint does not exist", success: false, status: 404 });
})

module.exports = app;
