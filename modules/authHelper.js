const fs = require('fs');
const { emailVerifier} = require('./verifyHelper');

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
        console.log("MongoDB in authHelper");
    } catch (error) {
        console.log('Error finding database');
        throw error;
    }
});

/**
 * 
 * @param {Response} res 
 */
function redirector(res) {
    res.redirect("/sign/out");
}

//placeholder setup for profile page later
function seshCheck(req, res, next) {
    if (req.session && req.session.user) {
        //if session has a user in it, lets the user load the page
        next();
    } else {
        redirector(res);
    }
}

function adminCheck(req, res, next) {
    if (req.session.user.role) {
        if (req.session.user.role == 1) {
            next();
        }
    } else {
        res.send('you are not worthy');
        redirector(res);
        return;
    }
}

function emailCheck(reqStuff, res) {
    let reqEmail = reqStuff.email.toLowerCase();
    const MESSAGES = {
        alreadyExists: "An Email with this account already Exists",
        failedRegEX: "Please Enter a valid Email"
    }

    if (emailVerifier(reqEmail)) {

        db.collection("users").findOne({ "email": reqEmail }, (err, result) => {
            if (err) {
                console.log("failed test");
                res.send({
                    verified: 2,
                    returnStatus: MESSAGES.alreadyExists
                });
                return 2;
            } else {
                return 0;
            }
        });
    } else {
        res.send({
            verified: 1,
            returnStatus: MESSAGES.failedRegEX
        });
        return 1;
    }
}

module.exports = {
    redirector,
    seshCheck,
    emailCheck
}