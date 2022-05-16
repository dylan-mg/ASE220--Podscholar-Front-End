const { emailVerifier } = require('./verifyHelper');

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

/**
 * 
 * @param {string} reqEmail
 * @returns {Promise}
 */
async function emailCheck(reqEmail) {
    return new Promise((resolve, reject) => {
        emailVerifier(reqEmail)
            .then(() => {
                db.collection("users").findOne({ "email": reqEmail }, (err, result) => {
                    if (err || result == null) {
                        console.log("email not found");
                        resolve();
                    } else {
                        console.log("email found");
                        reject("alreadyExists");
                    }
                });
            })
            .catch(() => {
                reject("failedRegEx");
            })
    });
}

module.exports = {
    redirector,
    seshCheck,
    emailCheck
}