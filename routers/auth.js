if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const authHelper = require('../modules/authHelper.js');
const vh = require('../modules/verifyHelper.js');
const bcrypt = require("bcrypt");
const { MongoClient, Db } = require("mongodb");

const dbName = process.env.dbname; // name of database for mongoDB
const URL = process.env.MONGOURI;
const MESSAGES = {
    alreadyExists: "An Email with this account already exists",
    failedRegEX: "Please Enter a valid Email",
    dbLookup: "Error with Connecting To Database, please try again"
}


// access database and set up object for reference
/**
 * @type {Db} MongoDB database Object
 */
let db;
MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Error connecting to MongoDB');
        throw err;
    }
    try {
        db = client.db(dbName);
        console.log("MongoDB active in auth.js");
    } catch (error) {
        console.log('Error finding database');
        throw error;
    }
});

// DOOR [ /sign/out ]
// * GET
// Signs a user out, destroys the session, redirects
router.get("/out", (req, res) => {
    console.log(req.url);
    req.session.destroy();
    res.render("./auth/out.ejs");
});

// DOOR [ /sign/in ]
// * GET
// renders the sign in form
router.get("/in", (req, res) => {
    res.render("./auth/in.ejs");
});

// * POST
// checks if a user can be signed in, if so, signs them in
router.post("/in", (req, res) => {
    /* req.body is {email, password} */

    // check if email exists
    req.body.email = req.body.email.toLowerCase();
    db.collection("users").findOne({ "email": req.body.email }, (err, userData) => {
        if (err) {
            res.send({ verStat: false });
        } else {
            let cpass = req.body.password.toString();
            let hashed = bcrypt.hashSync(cpass, process.env.salt, 10);
            if (userData.password == hashed) {
                req.session.user = {
                    id: userData._id,
                    fName: userData.fName,
                    lName: userData.lName,
                    role: userData.role
                };
                res.send({
                    verStat: true,
                    id: userData._id
                });
            } else {
                res.send({ verStat: false });
            }
        }
    })
});

// DOOR [ /sign/up ]
// * GET
// renders sign up page
router.get("/up", (req, res) => {
    res.render("./auth/up.ejs");
});

// * POST
// Verifies email, creates new entry, updates relevant file
router.post("/up", (req, res) => {
    console.log("received");

    authHelper.emailCheck(req.body.email)
        .then(() => {
            console.log("success");
            // adjust name for storage
            let fixedFname = req.body.fName.toLowerCase();
            let fixedLname = req.body.lName.toLowerCase();
            let mdb_id = `${fixedFname}-${fixedLname}`

            vh.idVerifier(mdb_id, "", 1)
                .then((correctExtension) => {
                    let newEntryData = req.body;
                    newEntryData.email = req.body.email.toLowerCase();
                    newEntryData.saves = [];
                    newEntryData.likes = [];
                    newEntryData.role = 0;
                    newEntryData.password = bcrypt.hashSync(newEntryData.password, process.env.salt, 10);
                    // generate the object to hold the entry
                    newEntryData._id = correctExtension;
                    // insert it
                    console.log(`New User: ${correctExtension}`);

                    db.collection("users").insertOne(newEntryData)
                        .then((result) => {
                            console.log("Successful Sign Up");
                            console.log(result);
                            req.session.user = {
                                id: newEntryData._id,
                                fName: newEntryData.fName,
                                lName: newEntryData.lName,
                                role: newEntryData.role
                            };
                            res.send({ message: newEntryData._id });
                        })
                        .catch((reason) => {
                            console.log("Error Inserting User");
                            console.log(reason);

                            res.send({ returnStatus: "Error Signing up, Please Try again " })
                        })
                })
                .catch((errorMessage) => {
                    console.log(errorMessage);
                    res.send({ returnStatus: MESSAGES.dbLookup });
                });
        })
        .catch((msg) => {
            // failed regex is 1, alreadyExists is 2
            res.send({ returnStatus: MESSAGES[msg] });
        })
});

// DOOR [ /sign/up/email ]
// * POST
// verifies the email, returns value if success
router.post("/up/email", async(req, res) => {
    authHelper.emailCheck(req.body.email)
        .then(() => {
            console.log("success");
            res.send({ verified: 0 });
        })
        .catch((msg) => {
            console.log(msg);
            res.send({ verified: 1, returnStatus: MESSAGES[msg] });
        });
});

module.exports = router;