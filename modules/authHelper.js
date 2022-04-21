const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const app = express();

function redirector(res) {
    fs.readFile('redirect.html', function(err, data) {
        res.status(307);
        res.send(data.toString());
    });
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

module.exports = {
    redirector,
    seshCheck
}