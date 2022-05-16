if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const fs = require('fs')
const fileHelpers = require('../modules/fileHelpers.js');

const { MongoClient, Db } = require("mongodb");
const URL = process.env.MONGOURI;
const client = new MongoClient(URL);
const dbName = process.env.dbname // name of database for mongoDB

// access database and set up object for reference
/**
 * @type {Db} MongoDB database Object
 */
let db;
client.connect((err, result) => {
    if (err) {
        console.log('Error connecting to MongoDB');
        throw err;
    }
    try {
        db = result.db(dbName);
        console.log("MongoDB active in podAPI");
    } catch (error) {
        console.log('Error finding database');
        throw error;
    }
});

// DOOR [ /podcasts/api/newest ]
// * GET
// Gets info on the 10 newest podcast episodes
router.get("/newest", (req, res) => {
    // designate response type
    res.contentType("application/json");

    db.collection("podcasts").find().sort({ _id: -1 }).limit(10).toArray((err, result) => {
        if (err) {
            fileHelpers.errorMan(err.errno, res, req.url);
        } else {
            res.status(200);
            res.send(result);
        }
    });
});

// DOOR [ /api/pods/data/:fileName ]
// *GET
router.get("/data/:fileName", (req, res) => {
    // designate response type
    res.contentType("application/json");
    let fileName = `${POD_PATH}/${req.params.fileName}.json`;

    // checks to read the file
    if (fs.existsSync(fileName)) {
        fs.readFile(fileName, (err, data) => {
            // if there's an error, 
            if (err) {
                // ...call error handler function
                fileHelpers.errorMan(err.errno, res, req.url);
            } else {
                // otherwise, send the parsed data and an OK signal
                res.status(200);
                res.send(data.toString());
            }
        });
    } else {
        fileHelpers.errorMan(404, res, req.url);
    }
});

module.exports = router;