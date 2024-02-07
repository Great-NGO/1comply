// MySQL Config files
const Sequelize = require('sequelize');
let { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, NODE_ENV } = require('../utils/secrets');
const { MYSQLDATABASE, MYSQLHOST, MYSQLPASSWORD, MYSQLPORT, MYSQLUSER, MYSQLDATABASE_STAGING, MYSQLHOST_STAGING, MYSQLPASSWORD_STAGING, MYSQLUSER_STAGING, MYSQLPORT_STAGING } = process.env;
const sequelizeErd = require('sequelize-erd');
const { writeFileSync } = require('fs');
const { log } = require('../utils/logging');
let DBPORT;

// I want to work with my cloud mysql account
// NODE_ENV === "development" ? NODE_ENV = "staging" : NODE_ENV;

// If app environment variable is set to production, use production mysql details else use staging
if (NODE_ENV === "production") {
    DB_NAME = MYSQLDATABASE;
    DB_USERNAME = MYSQLUSER;
    DB_PASSWORD = MYSQLPASSWORD;
    DBPORT = MYSQLPORT;
    DB_HOST = MYSQLHOST;
} else if (NODE_ENV === "staging") {
    DB_NAME = MYSQLDATABASE_STAGING;
    DB_USERNAME = MYSQLUSER_STAGING;
    DB_PASSWORD = MYSQLPASSWORD_STAGING;
    DBPORT = MYSQLPORT_STAGING || 3306;
    DB_HOST = MYSQLHOST_STAGING;
}

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DBPORT,
    dialect: 'mysql',
    logging: (...msg) => log(msg),     //To disable logging (true/false)
    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 10000,
    //     acquire: 30000
    // },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        initialAutoIncrement: 100,      //Set the Initial Auto Increment for all tables
    }
})

const connectToDB = async () => {
    try {
        // Use the authenticate method from sequelize to check connection
        await sequelize.authenticate();
        await sequelize.sync({})   //Synchronize all models at once/Create the tables

        // await sequelize.sync({ force: false })   //Synchronize all models at once
        // await sequelize.sync({ alter: true})   //Synchronize and modify all models at once

        // Create ERD diagram based on Sequelize models using sequelizeErd (This will just show the tabkes and won't show the associations in the ERD cos the define relationship hasn't been used yet.)
        // const svg = await sequelizeErd({ source: sequelize })
        // writeFileSync('./erd.svg', svg);
        console.log(`Connected to '${DB_NAME}' Database successfully.`);

    } catch (error) {
        console.log(`Database connection and synchronization failed!`, error);
        throw new Error(error)      //Throw error - the actual error, hence the new Error class
    }
}

module.exports = {
    sequelize,
    connectToDB
}