if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const fs = require('fs')
const fileHelpers = require('../modules/fileHelpers.js');
const vh = require('../modules/verifyHelper.js');

const BIBTEX_PATH = process.env.BIBTEX_PATH;
const JSON_PATH = process.env.JSON_PATH;
const POD_PATH = process.env.POD_PATH;

// DOOR [ /api/podcasts/newest ]
// * GET
// Gets info on the 10 newest podcast episodes
router.get("/newest", (req, res) => {
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
            fileHelpers.errorMan(err.errno, res, req.url);
        } else {
            // otherwise, send the parsed data and an OK signal
            res.status(200);
            res.send(podTrackingData);
        }
    });
});

// DOOR [ /api/pods/data/:fileName ]
// *GET
router.get("/data/:fileName", (req, res) => {
    // designate response type
    res.contentType("application/json");
    let fileName = `${POD_PATH}/${req.params.fileName}.json`;

    // checks to read the file
    if (fs.existsSync(fileName)) {
        fs.readFile(fileName, (err, data) => {
            // if there's an error, 
            if (err) {
                // ...call error handler function
                fileHelpers.errorMan(err.errno, res, req.url);
            } else {
                // otherwise, send the parsed data and an OK signal
                res.status(200);
                res.send(data.toString());
            }
        });
    } else {
        fileHelpers.errorMan(404, res, req.url);
    }
});

module.exports = router;