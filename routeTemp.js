const express = require('express');
const router = express.router();
const mongo = require('mongodb');
const username = 'quentin' // username for mongoDB
const password = 'quentin' // password for mongoDB
const clusterName = 'pods' // name of cluster for mongoDB
const dbName = 'pods' // name of database for mongoDB
const URL = `mongodb://${username}:${password}@cluster0.ut1nc.mongodb.net/${clusterName}?retryWrites=true&w=majority`
const mongoClient = mongo.MongoClient;
var db;
mongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Error connecting to MongoDB');
        throw err;
    }
    try {
        db = client.db(dbName);
    }
    catch (error) {
        console.log('Error finding database');
        throw error;
    }

})
/* Web Routes */
/* Static Pages */
router.get('/pages/:page-name', function (req, res) {
    res.render(`./pages/${req.params.pageName}.ejs`);
})
/* Home Page (not logged in) */
router.get('/', (req, res) => {
    res.render('./pages/index.ejs');
}) // render the index.ejs page
/* Home Page (logged in) */
router.get('/', (req, res) => {
    res.render('./pages/index.ejs');
}) // render the index.ejs page
/* Scientific discipline index page */
router.get('/categories', (req, res) => {
    db.collection('categories').find().toArray(function (err, result) {
        if (err) {
            console.log('Error finding categories');
            throw err;
        }
        res.send(result);
    })
})
/* Scientific discipline detail page */
router.get('/categories/:scientific-discipline', (req, res) => {
    discipline = req.params.scientific - discipline;
    db.collection('categories').findOne({ name: discipline }, function (err, result) {
        if (err) {
            console.log('Error finding categories');
            throw err;
        }
        res.send(result);
    })
})
/* Tags index page */
router.get('/keywords', (req, res) => {
    db.collection('tags').find().toArray(function (err, result) {
        if (err) {
            console.log('Error finding tags');
            throw err;
        }
        res.send(result);
    })
})
/*Tag page*/
router.get('/keywords/:tag', (req, res) => {
    var tag = req.params.tag;
    db.collection('tags').findOne({ name: tag }, function (err, result) {
        if (err) {
            console.log('Error finding tags');
            throw err;
        }
        res.send(result);
    })
})
/* Podcast page */
router.get('/podcasts/:podcast-title', (req, res) => {
    var title = req.params.podcast - title;
    db.collection('podcasts').findOne({ title: title }, function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
/* Authentication */
router.get('/auth', (req, res) => {
    // don't know what to do here
})
/*Author account approval */
router.get('/authors/create', (req, res) => {
    var session = req.session;
    if (session.role == 'admin') {
        res.render('./pages/authors/createauthor.ejs');
    }
    else {
        res.redirect('/');
    }
})
/*User/author profile */
router.get('/users/:first-name-last-name', (req, res) => {
    var name = req.params.first - name - last - name;
    name.split('-')
    db.collection('users').find({ fname: name[0] }, function (err, result) {
        if (err) {
            console.log('Error finding users');
            throw err;
        }
        forEach(result, function (user) {
            if (user['lname'] == name[1])
                res.send(user);
        })
    })
})
/* User/author account */
router.get('/account', (req, res) => {
    //if the session is logged in, render the account page
    var session = req.session;
    if (session != null) {
        db.collection('users').findOne({ username: session.username }, function (err, result) {
            res.render('./pages/profile.ejs', { user: result });
        })
    }
})
/* Edit/change personal information */
router.get('/account/details', (req, res) => {
    //if the session is logged in, render the account details page
    var session = req.session;
    if (session != null) {
        db.collection('users').findOne({ username: session.username }, function (err, result) {
            res.render('./pages/details.ejs', { user: result });
        })
    }
})
/*Edit/change account information*/
router.get('/acount/settings', (req, res) => {
    //if the session is logged in, render the account settings page
    var session = req.session;
    if (session != null) {
        db.collection('users').findOne({ username: session.username }, function (err, result) {
            res.render('./pages/settings.ejs', { user: result });
        })
    }
})
/*Authored podcasts*/
router.get('/users/:first-name-last-name/podcasts/authored', (req, res) => {
    var name = req.params.first - name - last - name;
    name.split('-')
    db.collection('users').find({ fname: name[0] }, function (err, result) {
        if (err) {
            console.log('Error finding users');
            throw err;
        }
        forEach(result, function (user) {
            if (user['lname'] == name[1])
                db.collection('podcasts').find({ author: user['username'] }).toArray(function (err, result2) {
                    if (err) {
                        console.log('Error finding podcasts');
                        throw err;
                    }
                    res.send(result2);
                })
        })

    })
})
/*podcasts*/
router.get('/users/:first-name-last-name/podcasts/saved', (req, res) => {
    var name = req.params.first - name - last - name;
    name.split('-')
    db.collection('users').find({ fname: name[0] }, function (err, result) {
        if (err) {
            console.log('Error finding users');
            throw err;
        }
        forEach(result, function (user) {
            if (user['lname'] == name[1])
                db.collection('podcasts').find({ saved: user['username'] }).toArray(function (err, result2) {
                    if (err) {
                        console.log('Error finding podcasts');
                        throw err;
                    }
                    res.send(result2);
                })
        })
    })
})
/* Podcast upload page */
router.get('/podcasts/create', (req, res) => {
    var session = req.session;
    if (session.role == 'admin' || session.role == 'author') {
        res.render('./pages/podcasts/create.ejs');
    }
    else {
        res.redirect('/');
    }
})
/* Podcast edit page */
router.get('/podcasts/:podcast-title/edit', (req, res) => {
    var title = req.params.podcast - title;
    var session = req.session;
    db.collection('podcasts').findOne({ title: title }, function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        if (session.role == 'admin' || (session.role == 'author' && result.author == session.username)) {
            res.render('./pages/podcasts/edit.ejs', { podcast: result });
        }
    })
})


/* API routes */
/* Home Page (not logged in) */
router.get('/api', function (req, res) {
    db.collection('podcasts').find().sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
router.get('/api/search/keyword/:keyword', function (req, res) {
    var keyword = req.params.keyword;
    db.collection('podcasts').find({ $text: { $search: keyword } }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
router.get('/api/search/date/:date', function (req, res) {
    var date = req.params.date;
    db.collection('podcasts').find({ date: date }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
/* Home page (logged in) */
router.get('/api', function (req, res) {
    db.collection('podcasts').find().sort({ _id: -1 }).limit(10).toArray(function (err, result) {
    })
})
router.get('/api/search/keyword/:keyword', function (req, res) {
    var keyword = req.params.keyword;
    db.collection('podcasts').find({tags: keyword}).sort({_id: -1}).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
router.get('/api/search/date/:date', function (req, res) {
    var date = req.params.date;
    db.collection('podcasts').find({ date: date }).sort({_id: -1}).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
/* Scientific discipline index page */
router.get('/api/categories', function (req, res) {
    var categories = [];
    var send = [];
    db.collection('categories').find().toArray(function (err, result) {
        if (err) {
            console.log('Error finding categories');
            throw err;
        }
        categories = result;
    })
    forEach(categories , function (category) {
        db.collection('podcasts').find({ category: category.name }).toArray(function (err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            send.append({ category: category.name, count: result.length });
            category[count] = result.length;
        })
    })
    res.send(send)
})
/* Scientific discipline detail page */
router.get('/api/categories/:scientific-discipline', function (req, res) {
    var category = req.params.scientific-discipline;
    db.collection('podcasts').find({ category: category }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
router.get('/api/categories/:scientific-discipline/search/keyword/:keyword', function (req, res) {
})
router.get('/api/categories/:scientific-discipline/search/date/:date', function (req, res) {
})
/* Tags index page */
router.get('/api/keywords', function (req, res) {
})
/* Tage page */
router.get('/api/keywords/:keyword', function (req, res) {
})
router.get('/api/keywords/:keyword/search/date/:date', function (req, res) {
})
/* Podcast Page */
router.post('/api/podcasts', function (req, res) {
})
router.get('/api/podcasts/:podcast-title', function (req, res) {
})
router.patch('/api/podcasts/:podcast-title', function (req, res) {
})
router.delete('/api/podcasts/:podcast-title', function (req, res) {
})
router.patch('/api/podcasts/:podcast-title/actions/subscribe', function (req, res) {
})
router.patch('/api/podcasts/:podcast-title/actions/like', function (req, res) {
})
router.get('/api/podcasts/:podcast-title/comments', function (req, res) {
})
/* Authentication */
router.post('/api/auth/signup', function (req, res) {
    var user = JSON.stringify(req.body);
    db.collection('users').insertOne(user, function (err, result) {
        if (err) {
            console.log('Error inserting user');
            throw err;
        }
        res.send('User created');
    })
})
router.post('/api/auth/signin', function (req, res) {
    var user = req.body;
    db.collection('users').findOne(user, function (err, result) {
        if (err) {
            console.log('Error finding user');
            throw err;
        }
        res.send(result);
    })
})
/* Author account approval */
router.post('/api/authors', function (req, res) {
})
/* User/author profile */
router.get('/api/users/:first-name-last-name', function (req, res) {
})
router.post('/api/users/:first-name-last-name/actions/follow', function (req, res) {
})
router.get('/api/users/:first-name-last-name/podcasts/authored', function (req, res) {
})
router.get('/api/users/:first-name-last-name/podcasts/saves', function (req, res) {
})
/* User/author account */
router.get('/api/account', function (req, res) {
})
router.patch('/api/account', function (req, res) {
})
