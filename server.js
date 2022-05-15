// ! type "serve" to run this server. Serve.bat launches nodemon with this server
// if there's any environmental stuff, include the module
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// original models
const { errorMan } = require('./modules/fileHelpers.js');
const vh = require('./modules/verifyHelper.js');
const open = require('open');

// require all npm packages
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const app = express();

// server constants
const port = process.env.PORT || 8080;

app.use(bodyParser.json()); // for parsing json reqs
app.use(bodyParser.urlencoded({ extended: true })); // for parsing non-query data from url
app.set('view engine', 'ejs');

app.use(session({ secret: process.env.servSecret }));

// all json, css, images, etc is served from here
// if it is used on the client side, it's gotten from this folder by express
const folder = "public";
app.use(express.static(`${folder}`));

const podAPIs = require("./routers/podAPI");
const podPages = require("./routers/podPages");
const auth = require("./routers/auth");
const { MongoClient, Db } = require("mongodb");

const dbName = process.env.dbname // name of database for mongoDB
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
        console.log("active");
    } catch (error) {
        console.log('Error finding database');
        throw error;
    }
});

app.use("/podcasts/api", podAPIs);
app.use("/podcasts", podPages);
app.use("/sign", auth);

// DOOR [ / ]
// * GET
// Main Index Page
app.get("/", (req, res) => {
    res.render("index.ejs");
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
        errorMan(401, res, req.url);
    } else {
        let fileName = `${process.env.USER_PATH}/${req.params.fileName}.json`;

        // checks to read the file
        fs.readFile(fileName, (err, data) => {
            // if there's an error, 
            if (err) {
                // ...call error handler function
                errorMan(err.errno, res, req.url);
            } else {
                // otherwise, send the parsed data and an OK signal
                res.status(200);
                res.send(JSON.parse(data));
            }
        });
    }

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

// start server
app.listen(port, async() => {
    console.log(`Example app listening on port ${port}`);
    // comment this out if you don't want to have a window open every launch
    await open(`http://localhost:${port}`);
});