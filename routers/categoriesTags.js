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
        console.log("MongoDB active in categoriesTags");
    } catch (error) {
        console.log('Error finding database');
        throw error;
    }
});

function fillkeys() {
    db.collection("podcasts").find().toArray((err, result) => {

    })
}

// DOOR [ /categories ]
// * GET
// Lists either the categories or tags
router.get("/categories", (req, res) => {
    db.collection('categories').find().toArray(function(err, categories) {
        if (err) {
            console.log('Error finding categories');
            throw err;
        }

        // todo move this to an api
/*         categories.forEach((category) => {
            db.collection('podcasts').find({ categories: category._id }).toArray(function(err, result) {
                if (err) {
                    console.log('Error finding podcasts');
                    throw err;
                } else if (result.length == 0) {
                    category.count = 0;
                } else {
                    category.count = result.length
                }
            })
        }); */

        res.render('ct-list.ejs', { data: categories, type: 'Categories' });
    })
});

// DOOR [ /Categories/:id/count ]
// * GET
// API -- returns the count of a given elment
router.get("/Categories/:id/count", (req, res) => {
    console.log(req.params.id);
    try {
        db.collection('podcasts').find({ disciplines: req.params.id }).toArray(function (erro, result) {
            if (erro) {
                console.log('Error finding podcasts');
                throw erro ;
            } else {
                res.send({count: result.length});
            }
        });
    } catch (err) {
        res.send({count: "N/A"});
    }
});

router.get("/categories/:_id", (req, res) => {
    db.collection('categories').findOne({ _id: req.params._id }, function(err, category) {
        if (err) {
            console.log('Error finding categories');
            throw err;
        }
        res.render('ct-detials.ejs', { data: category });
    })
});

// DOOR [ /keywords ]
// * GET
// Tags index page
router.get('/keywords', (req, res) => {
    db.collection('keywords').find().toArray(function(err, keywords) {
        if (err) {
            console.log('Error finding keywords');
            throw err;
        }

        keywords = keywords.sort(sorter);
        // todo move below into api
/*         for (let keyword of keywords) {

            console.log(counted_keywords);
        } */
        res.render('ct-list.ejs', { data: keywords, type: 'Keywords' })    
    })
});

// DOOR [ /Keywords/:id/count ]
// * GET
// API -- returns the count of a given elment
router.get("/Keywords/:id/count", (req, res) => {
    console.log(req.params.id);
    try {
        db.collection('podcasts').find({ Tags: req.params.id }).toArray(function (erro, result) {
            if (erro) {
                console.log('Error finding podcasts');
                throw erro ;
            } else {
                res.send({count: result.length});
            }
        });
    } catch (err) {
        res.send({count: "N/A"});
    }
});

router.get("/keywords/:_id", (req, res) => {
    db.collection('keywords').findOne({ _id: req.params._id }, function(err, keyword) {
        if (err) {
            console.log('Error finding categories');
            throw err;
        }
        res.render('ct-detials.ejs', { data: keyword });
    })
});

function sorter(a, b) {
    // start at first char
    let i = 0;
            
    // if i is less than a's length and b's length, and if the two characters are the same, loop
    while (i < a._id.length - 1 && i < b._id.length - 1) {
        if (a._id[i] == b._id[i]) {
            i++;
        } else {
            break;
        }
    }

    // if we've reached the end of one or the other
    if (i == a._id.length || i == b._id.length) {
        if (i == a._id.length - 1 && i < b._id.length - 1) {
            // if end of a is reached, a should come first
            return 1;
        } else if (i < a._id.length - 1 && i == b._id.length - 1) {
            // if end of b is reached, b should come first
            return -1;
        } else {
            return a._id[i] - b._id[i];
        }
    } else {
        return a._id[i] - b._id[i]
    }
}

module.exports = router;
