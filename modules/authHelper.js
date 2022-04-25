const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const app = express();

function redirector(res) {
    res.redirect("/");
}

//placeholder setup for profile page later
function seshCheck(req, res, next) {
    if (req.session.user) {
        //if session has a user in it, lets the user load the page
        next();
    } else {
        redirector(res);
    }
}

function authCheck(req, res, next) {
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

function emailHelper(reqEmail, emails) {
    for (let email in emails) {
        if (email.toLowerCase() == reqEmail.toLowerCase()) {
            return false;
        }
    }
    return true;
}

function emailCheck(reqStuff, res) {
    let reqEmail = reqStuff.email;
    const regMan = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const MESSAGES = {
        alreadyExists: "An Email with this account already Exists",
        failedRegEX: "Please Enter a valid Email"
    }

    if (regMan.test(reqEmail)) {
        // check if the email is already in the system
        let mapman = fs.openSync("./data/json/user_map.json");
        let raw = fs.readFileSync("./data/json/user_map.json");
        let emails = JSON.parse(raw.toString());
        if (emailHelper(reqEmail, emails)) {
            console.log("successful check");
            fs.closeSync(mapman);
            return 0;
        } else {
            fs.closeSync(mapman);
            res.send({
                verified: 2,
                returnStatus: MESSAGES.alreadyExists
            });
            return 2;
        }
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
    authCheck,
    seshCheck,
    emailCheck,
    emailHelper
}