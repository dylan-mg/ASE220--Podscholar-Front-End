if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const fs = require('fs')
const authHelper = require('../modules/authHelper.js');
const vh = require('../modules/verifyHelper.js');
const bcrypt = require("bcrypt");
const { MongoClient, Db } = require("mongodb");

const dbName = process.env.dbname; // name of database for mongoDB
const URL = process.env.MONGOURI;


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
    } catch (error) {
        console.log('Error finding database');
        throw error;
    }
});

const BIBTEX_PATH = process.env.BIBTEX_PATH;
const JSON_PATH = process.env.JSON_PATH;
const USER_PATH = process.env.USER_PATH;

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
            let hashed = bcrypt.hashSync(cpass, "$2b$10$0FwjQ0By1QJa711tC3RWcu", 10);
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
    let echeck = authHelper.emailCheck(req.body, res);

    if (echeck != 0) {
        console.log("Unsuccessful Email Check");
    } else {
        console.log("success");
        let newEntryData = req.body;
        let fixedEmail = req.body.email.toLowerCase();
        let fixedFname = req.body.fName.toLowerCase();
        let fixedLname = req.body.lName.toLowerCase();
        let fileName = `${fixedFname}-${fixedLname}`

        newEntryData.saves = [];
        newEntryData.likes = [];
        newEntryData.role = 0;
        let ext = "";
        var track = 1;
        while (fs.existsSync(`${USER_PATH}/${fileName}${ext}.json`)) {
            ext = "-" + track++;
        }
        fileName += ext;
        fs.writeFileSync(`${USER_PATH}/${fileName}.json`, JSON.stringify(newEntryData));

        let mapStuff = fs.openSync(`${JSON_PATH}/user_map.json`);
        let rawData = fs.readFileSync(`${JSON_PATH}/user_map.json`);
        let parsedData = JSON.parse(rawData.toString());
        parsedData[req.body.email] = fileName;
        fs.writeFileSync(`${JSON_PATH}/user_map.json`, JSON.stringify(parsedData));
        fs.closeSync(mapStuff);

        res.send({ message: fileName });
    }
});

// DOOR [ /sign/up/email ]
// * POST
// verifies the email, returns value if success
router.post("/up/email", (req, res) => {
    let echeck = authHelper.emailCheck(req.body, res);
    if (echeck == 0) {
        console.log("success");
        res.send({ verified: 0 });
    }
    // todo add else
});

module.exports = router;