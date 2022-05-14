if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const fs = require('fs')

// DOOR [ /podcasts/:id ]
// * GET
// Loads the page for a given podcast, if it exists
router.get('/:podcast_title', (req, res) => {
    var title = req.params.podcast_title;
    db.collection('podcasts').findOne({ title: title }, function(err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.render('podcast.ejs', { podcast: result });
    })
})

// DOOR [ /podcasts/create ]
// * GET
// Upload page for podcasts
router.get('/create', (req, res) => {
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
router.post('/create', (req, res) => {
    console.log();
    setTimeout(() => {
        res.json({ destination: "/" });
    }, 404);
});

module.exports = router