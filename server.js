// ! type "serve" to run this server. Serve.bat launches nodemon with this server
// if there's any environmental stuff, include the module
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// original models
const fileHelpers = require('./modules/fileHelpers.js');
const authHelper = require('./modules/authHelper.js');
const vh = require('./modules/verifyHelper.js');

// require all npm packages
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const app = express();


// server constants
const port = 5500;

// folder pathwats for easier data access
const DATA_PATH = "./data";
const BIBTEX_PATH = DATA_PATH + "/bibtex";
const JSON_PATH = DATA_PATH + "/json";
const USER_PATH = JSON_PATH + "/users";
const POD_PATH = JSON_PATH + "/pods";

app.use(bodyParser.json()); // for parsing json reqs
app.use(bodyParser.urlencoded({ extended: true })); // for parsing non-query data from url
app.set('view engine', 'ejs');

app.use(session({ secret: process.env.servSecret }));

// all json, css, images, etc is served from here
// if it is used on the client side, it's gotten from this folder by express
const folder = "public";
app.use(express.static(`${folder}`));

// start server
app.listen(process.env.PORT || port);

// DOOR [ / ]
// * GET
// Main Index Page
app.get("/", (req, res) => {
    console.log(req.url);
    res.render("index.ejs");
});

// DOOR [ /api/pods ]
// * GET
// Gets info on the 10 newest podcast episodes
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

// DOOR [ /api/users/:fileName ]
// * GET
// gets and returns a users info. User's info should be formatted as firstName-lastName
app.get("/api/users/:fileName", (req, res) => {
    // designate response type
    res.contentType("application/json");
    let regMan = /[a-zA-Z-]+-[a-zA-Z-]+/i;
    // must be of [first-last format]
    if (regMan.test(req.params.fileName)) {
        fileHelpers.errorMan(401, res, req.url);
    } else {
        let fileName = `${USER_PATH}/${req.params.fileName}.json`;

        // checks to read the file
        fs.readFile(fileName, (err, data) => {
            // if there's an error, 
            if (err) {
                // ...call error handler function
                fileHelpers.errorMan(err.errno, res, req.url);
            } else {
                // otherwise, send the parsed data and an OK signal
                res.status(200);
                res.send(JSON.parse(data));
            }
        });
    }

});

// DOOR [ /sign/out ]
// * GET
// Signs a user out, destroys the session, redirects
app.get("/sign/out", (req, res) => {
    console.log(req.url);
    req.session.destroy();
    res.render("./auth/out.ejs");
});

// DOOR [ /sign/in ]
// * GET
// renders the sign in form
app.get("/sign/in", (req, res) => {
    res.render("./auth/in.ejs");
});

// * POST
// checks if a user can be signed in, if so, signs them in
app.post("/sign/in", (req, res) => {
    /* {email, password} */
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
app.get("/sign/up", (req, res) => {
    res.render("./auth/up.ejs");
});

// * POST
// Verifies email, creates new entry, updates relevant file
app.post("/sign/up", (req, res) => {
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
app.post("/sign/up/email", (req, res) => {
    let echeck = authHelper.emailCheck(req.body, res);
    if (echeck == 0) {
        console.log("success");
        res.send({ verified: 0 });
    }
    // todo add else
});

// DOOR [ /pages/:pageName ]
// * GET
// Loader for static pages [About us, Podcast rules, etc]
app.get("/pages/:pageName", (req, res) => {
    const viewsPath = "./views/pages";
    let fileName = req.params.pageName;
    if (fs.existsSync(`${viewsPath}/${fileName}.ejs`)) {
        res.render(`./pages/${fileName}.ejs`);
    } else {
        res.redirect("/");
    }
});

// DOOR [ /api/buttons ]
// * GET
// todo Send buttons html for navbar
app.get('/api/buttons', (req, res) => {
    let fileName = "nav-btn-all";
    if (req.session.user) {
        fileName = "nav-btn-users";
    }
    fs.readFile(`./views/components/${fileName}.html`, (er, dat) => {
        if (er)
            console.table(dat.toString());
    });
    res.json({ test: "received" });
});

// DOOR [ /podcasts/create ]
// * GET
// Upload page for podcasts
app.get('/podcasts/create', (req, res) => {
    fs.readFile(`${JSON_PATH}/disciplines.json`, (er, data) => {
        if (er) {
            console.log(er);
            res.redirect("/");
        } else {
            data = JSON.parse(data.toString());
            res.render("upload.ejs", { categs: data });
        }
    });
});

// * POST
// creates a new podcast, in future will be multipart/form, for now,
app.post('/podcasts/create', (req, res) => {
    console.log();
    setTimeout(() => {
        res.json({ destination: "/" });
    }, 404);
});

// DOOR [ /api/formInfo/:field/check ]
// * POST
// todo Verifies the designated form data
app.post("/api/formInfo/:field/check", (req, res) => {
    console.table(req.body);
    // todo to tested later, for now, just ret true
    /* if (req.params.field == doi) {
        vh.doiVerifier(req.body.doi);
    } else if (req.params.field == email) {
        vh.emailVerifier(req.body.email);
    } */
    res.json({ message: true });
});