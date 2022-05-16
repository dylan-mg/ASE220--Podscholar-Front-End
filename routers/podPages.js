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
        console.log("MongoDB active in podPages");
    } catch (error) {
        console.log('Error finding database');
        throw error;
    }
});

// DOOR [ /podcasts/create ]
// * GET
// Upload page for podcasts
router.get('/create', (req, res) => {
    db.collection("categories").find().toArray((err, result) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("upload.ejs", { categs: result });
        }
    });
});

// * POST
// creates a new podcast, in future will be multipart/form, for now,
router.post('/create', (req, res) => {
    console.log();
    setTimeout(() => {
        res.json({ destination: "/" });
    }, 404);
});


// DOOR [ /podcasts/:id ]
// * GET
// Loads the page for a given podcast, if it exists
router.get('/:podcast_title', (req, res) => {
    var title = req.params.podcast_title;
    db.collection('podcasts').findOne({ _id: title }, function(err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.render('detail.ejs', { podcast: result });
    })
})

module.exports = router