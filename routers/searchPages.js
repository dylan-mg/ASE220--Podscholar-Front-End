if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()

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
        console.log("MongoDB active in searchPages");
    } catch (error) {
        console.log('Error finding database');
        throw error;
    }
});

// DOOR [ /search ]
// * GET
// Loads search with no params
router.get("/", (req, res) => {
    res.render("search.ejs");
});


module.exports = router;