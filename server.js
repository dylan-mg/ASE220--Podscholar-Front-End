// ! Use "nodemon ./server.js" to run this server. Nodemon will automatically reload server whenever server.js is saved
// require all npm packages
const bodyParser = require('body-parser');
const fileHelpers = require('./modules/fileHelpers.js');
const cryptoMan = require('crypto');
const fs = require('fs');
const express = require('express');
const app = express();

// server constants
const port = 5500;

// folder pathwats for easier data access
const DATA_PATH = "./data";
const BIBTEX_PATH = DATA_PATH + "/bibtex";
const JSON_PATH = DATA_PATH + "/json";
const USER_PATH = JSON_PATH + "/users";
const POD_PATH = JSON_PATH + "/pods";

// for parsing json reqs
app.use(bodyParser.json());
// for parsing non-query data from url
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// all json, css, images, etc is served from here
// if it is used on the client side, it's gotten from this folder by express
const folder = "public";
app.use(express.static(`${folder}`));

// start server
app.listen(port, function() {
    console.log(`listening on ${port}`)
});

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/api/pods/newest", (req, res) => {
    // designate response type
    res.contentType("application/json");
    let fileName = `${JSON_PATH}/pod_map.json`;

    // checks to read the file
    fs.readFile(fileName, (err, data) => {
        let rawdata = data.toString();
        let podTrackingData = JSON.parse(rawdata);

        // if less than 10 entries
        if (podTrackingData.length < 10) {
            // ignore until data set is large enough
            console.log("Possible Data Set Problem -- Total Pods < 10");
        } else {
            // Otherwise Only get 10 most recent entries
            podTrackingData = podTrackingData.slice(0, 10);
        }

        // if there's an error, 
        if (err) {
            // ...call error handler function
            fileHelpers.errorMan(err.errno, res, req.params.fileName);
        } else {
            // otherwise, send the parsed data and an OK signal
            res.status(200);
            res.send(podTrackingData);
        }
    });
});

app.get("/api/pods/data/:fileName", (req, res) => {
    // designate response type
    res.contentType("application/json");
    let fileName = `${POD_PATH}/${req.params.fileName}.json`;

    // checks to read the file
    if (fs.existsSync(fileName)) {
        fs.readFile(fileName, (err, data) => {
            // if there's an error, 
            if (err) {
                // ...call error handler function
                fileHelpers.errorMan(err.errno, res, req.params.fileName);
            } else {
                // otherwise, send the parsed data and an OK signal
                res.status(200);
                res.send(data.toString());
            }
        });
    } else {
        fileHelpers.errorMan(404, res, req.params.fileName);
    }
});

app.get("/api/users/:fileName", (req, res) => {
    // designate response type
    res.contentType("application/json");
    let regMan = /[a-zA-Z-]+-[a-zA-Z-]+/i;
    // must be of [first-last format]
    if (regMan.test(req.params.fileName)) {
        fileHelpers.errorMan(401, res, req.params.fileName);
    } else {
        let fileName = `${USER_PATH}/${req.params.fileName}.json`;

        // checks to read the file
        fs.readFile(fileName, (err, data) => {
            // if there's an error, 
            if (err) {
                // ...call error handler function
                fileHelpers.errorMan(err.errno, res, req.params.fileName);
            } else {
                // otherwise, send the parsed data and an OK signal
                res.status(200);
                res.send(JSON.parse(data));
            }
        });
    }

});


/*  */