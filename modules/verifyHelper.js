if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

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
        console.log("MongoDB in verifyHelper");
    } catch (error) {
        console.log('Error finding database');
        throw error;
    }
});

/**
 * verifies an email is valid against a regex
 * @param {string} inputEmail email string
 * @returns {Promise} true if email matches regex
 */
function emailVerifier(inputEmail) {
    const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return new Promise((resolve, reject) => {
        if (emailRegEx.test(inputEmail)) {
            resolve();
        } else {
            reject();
        }
    });
}

/**
 * verifies an doi is valid against a regex
 * @param {string} inputDOI doi string
 * @returns {boolean} if doi matches regex
 */
function doiVerifier(inputDOI) {
    const REGEXES = [
        "/^10.\\d{4,9}/[-._;()/:A-Z0-9]+$/i",
        "/^10.1002/[^\\s]+$/i",
        "/^10.\\d{4}/\\d+-\\d+X?(\\d+)\\d+<[\\d\\w]+:[\\d\\w]*>\\d+.\\d+.\\w+;\\d$/i",
        "/^10.1021/\\w\\w\\d++$/i",
        "/^10.1207/[\\w\\d]+\\&\\d+_\\d+$/i"
    ]

    for (let regexString in REGEXES) {
        let regex = new RegExp(regexString);

        if (regex.test(inputDOI)) {
            return true;
        }
    }

    return false;
}

async function idVerifier(id, ext, track) {
    return new Promise((resolve, reject) => {
        db.collection("users").find({ _id: `${id}${ext}` }).toArray((err, result) => {
            if (err) {
                console.log(err);
                console.log("Problem with lookup");
                reject("Problem with Lookup");
            } else if (result.length == 0) {
                // valid _id found
                console.log(result);
                resolve(`${id}${ext}`);
            } else {
                // _id is taken
                idVerifier(id, `-${track++}`, track)
                    .then((correctExt) => {
                        resolve(correctExt);
                    })
                    .catch((msg) => {
                        reject(msg);
                    });
            }
        });
    });
}

module.exports = {
    emailVerifier,
    doiVerifier,
    idVerifier
}