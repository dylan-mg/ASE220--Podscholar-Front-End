if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const fs = require('fs')
const authHelper = require('../modules/authHelper.js');
const vh = require('../modules/verifyHelper.js');

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
    fs.readFile(`${JSON_PATH}/user_map.json`, (err, data) => {
        let usersData = JSON.parse(data.toString());
        for (email in usersData) {
            if (email.toLowerCase() == req.body.email) {
                let userName = usersData[email];
                fs.readFile(`${USER_PATH}/${userName}.json`, (uErr, uData) => {
                    // in future, will be converted to crypto hash matching, but for now
                    let userData = JSON.parse(uData.toString());
                    if (req.body.password == userData.password) {
                        req.session.user = {
                            id: userName,
                            fName: userData.fName,
                            lName: userData.lName,
                            role: userData.role
                        };
                        res.send({
                            verStat: true,
                            id: userName
                        });
                    } else {
                        res.send({ verStat: false });
                    }
                })
            }
        }
    });
    // if it exists, check if password matches
    // if either doesn't, respond with error
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