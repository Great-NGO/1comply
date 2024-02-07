const app = require("./app");
const port = process.env.PORT || 8000;
const http = require("http");
const { connectToDB } = require("./config/db.config");
const { defineRelationships } = require('./model/relationships');
const server = http.createServer(app);

const startServer = () => {
    // // Define sequelize model relationships (After the models are created)
    defineRelationships()
    server.listen(port, () => {
        console.log(`ECommerce System for Student Entrepreneurs Server is listening on PORT ${port} `);
    })
}

// Call the ConnectToDB Method - Ensures connection to DB and tables are created
connectToDB()
    .then(() => {
        startServer()   //Call the startServer function which starts the server after database connection and relationship definition is successful.
    })
    .catch((err) => {
        console.log(`Failed to connect to Database and start Server.`, err);
    })


// If any error in starting server
server.on("error", (err) => {
    console.log(`Error Present: ${err}`);
    process.exit(1);
});

// If any warning
process.on('warning', (error) => {
    // console.warn(`WARNING `, error.stack);
    console.warn(`WARNING!! `, error);
})

// If any unhandledRejection in our process Event
process.on("unhandledRejection", (error) => {
    console.error("UNHANDLED REJECTION! Shutting down...", error);
    process.exit(1);
})
