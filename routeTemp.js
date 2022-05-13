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
router.get('/pages/:page_name', function (req, res) {
    res.render(`./pages/${req.params.page_name}.ejs`);
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
        res.render('categories.ejs', { categories: result });
    })
})
/* Scientific discipline detail page */
router.get('/categories/:scientific_discipline', (req, res) => {
    discipline = req.params.scientific_discipline;
    db.collection('categories').findOne({ name: discipline }, function (err, result) {
        if (err) {
            console.log('Error finding categories');
            throw err;
        }
        res.render('category.ejs', { category: result });
    })
})
/* Tags index page */
router.get('/keywords', (req, res) => {
    db.collection('keywords').find().toArray(function (err, result) {
        if (err) {
            console.log('Error finding tags');
            throw err;
        }
        res.res.render('keywords.ejs', { keywords: result });
    })
})
/*Tag page*/
router.get('/keywords/:tag', (req, res) => {
    var tag = req.params.tag;
    db.collection('keywords').findOne({ name: tag }, function (err, result) {
        if (err) {
            console.log('Error finding tags');
            throw err;
        }
        res.render('keyword.ejs', { keyword: result });
    })
})
/* Podcast page */
router.get('/podcasts/:podcast_title', (req, res) => {
    var title = req.params.podcast_title;
    db.collection('podcasts').findOne({ title: title }, function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.render('podcast.ejs', { podcast: result });
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
router.get('/users/:first_name_last_name', (req, res) => {
    var name = req.params.first_name_last_name;
    name.split(/-.*_/)
    if (name.length > 2) {
        db.collection('users').find({ fname: name[0], lname: name[1] }, function (err, result) {
            if (err) {
                console.log('Error finding users');
                throw err;
            }
            res.render('profile.ejs', { user: result[name[2]] });
        })
    }
    else {
        db.collection('users').findOne({ fname: name[0], lname: name[1] }, function (err, result) {
            if (err) {
                console.log('Error finding users');
                throw err;
            }
            res.render('profile.ejs', { user: result[0] });
        })
    }
})
/* User/author account */
router.get('/account', (req, res) => {
    //if the session is logged in, render the account page
    var session = req.session;
    var user = session.username;
    user.split(/-.*_/)
    if (session != null) {
        if (user.length == 2) {
            db.collection('users').findOne({ fname: user[0], lname: user[1] }, function (err, result) {
                res.render('./pages/profile.ejs', { user: result });
            })
        }
        else {
            db.collection('users').find({ fname: user[0], lname: user[1] }, function (err, result) {
                res.render('./pages/profile.ejs', { user: result[user[2]] });
            })
        }
    }
})
/* Edit/change personal information */
router.get('/account/details', (req, res) => {
    //if the session is logged in, render the account details page
    var session = req.session;
    var user = session.username;
    user.split(/-.*_/)
    if (session != null) {
        if (user.length == 2) {
            db.collection('users').findOne({ fname: user[0], lname: user[1] }, function (err, result) {
                res.render('./pages/details.ejs', { user: result });
            })
        }
        else {
            db.collection('users').find({ fname: user[0], lname: user[1] }, function (err, result) {
                res.render('./pages/details.ejs', { user: result[user[2]] });
            })
        }
    }
})
/*Edit/change account information*/
router.get('/acount/settings', (req, res) => {
    //if the session is logged in, render the account settings page
    var session = req.session;
    var user = session.username;
    user.split(/-.*_/)
    if (session != null) {
        if (user.length == 2) {
            db.collection('users').findOne({ fname: user[0], lname: user[1] }, function (err, result) {
                res.render('./pages/settings.ejs', { user: result });
            })
        }
        else {
            db.collection('users').find({ fname: user[0], lname: user[1] }, function (err, result) {
                res.render('./pages/settings.ejs', { user: result[user[2]] });
            })
        }
    }
})
/*Authored podcasts*/
router.get('/users/:first_name_last_name/podcasts/authored', (req, res) => {
    var name = req.params.first_name_last_name;
    name.split('-')
    db.collection('users').find({ fname: name[0], lname: name[1] }, function (err, result) {
        if (err) {
            console.log('Error finding users');
            throw err;
        }
        res.render('authored.ejs', { user: result });

    })
})
/*podcasts*/
router.get('/users/:first_name_last_name/podcasts/saved', (req, res) => {
    var name = req.params.first_name_last_name;
    name.split('-')
    db.collection('users').find({ fname: name[0], lname: name[1] }, function (err, result) {
        if (err) {
            console.log('Error finding users');
            throw err;
        }
        if (name.length == 2) {
            res.render('saved.ejs', { user: result });
        }
        else {
            res.render('saved.ejs', { user: result[name[2]] });
        }
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
router.get('/podcasts/:podcast_title/edit', (req, res) => {
    var title = req.params.podcast_title;
    var session = req.session;
    var name = session.username;
    name.split('-')
    var podcast = [];
    name.split('-')
    db.collection('podcasts').findOne({ title: title }, function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        if (name.length == 2) {
            if (session.role == 'admin' || (session.role == 'author' && result.fname == name[0] && result.lname == name[1])) {

                res.render('./pages/podcasts/edit.ejs', { podcast: result });
            }
        }
        else {
            podcast = result;
        }
    })
    db.collection('users').find({ fname: name[0], lname: name[1] }, function (err, result) {
        if (podcast in result[name[2]].authored) {
            res.render('./pages/podcasts/edit.ejs', { podcast: podcast });
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
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
router.get('/api/search/keyword/:keyword', function (req, res) {
    var keyword = req.params.keyword;
    db.collection('podcasts').find({ tags: keyword }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
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
    forEach(categories, function (category) {
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
router.get('/api/categories/:scientific_discipline', function (req, res) {
    var category = req.params.scientific_discipline;
    db.collection('podcasts').find({ category: category }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
router.get('/api/categories/:scientific_discipline/search/keyword/:keyword', function (req, res) {
    var category = req.params.scientific_discipline;
    var keyword = req.params.keyword;
    db.collection('podcasts').find({ category: category, tags: keyword }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
router.get('/api/categories/:scientific_discipline/search/date/:date', function (req, res) {
    var category = req.params.scientific_discipline;
    var date = req.params.date;
    db.collection('podcasts').find({ category: category, date: date }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
/* Tags index page */
router.get('/api/keywords', function (req, res) {
    var keywords = [];
    var sort = [];
    var send = [];
    db.collection('keywords').find().toArray(function (err, result) {
        if (err) {
            console.log('Error finding keywords');
            throw err;
        }
        keywords = result;
    })
    forEach(keywords, function (keyword) {
        db.collection('podcasts').find({ tags: keyword.name }).toArray(function (err, result) {
            if (err) {
                console.log('Error finding podcasts');
                throw err;
            }
            sort.push([keyword.name, result.length]);
        })
        sort.sort(function (a, b) {
            return a[1] - b[1]
        })
    })

    forEach(keywords, function (keyword) {
        for (i = 0; i < sort.length; i++) {
            if (sort[i][0] == keyword.name) {
                send.push({ keyword: keyword.name, count: sort[i][1] });
            }
        }
    })
    res.send(send)
})
/* Tage page */
router.get('/api/keywords/:keyword', function (req, res) {
    var keyword = req.params.keyword;
    db.collection('podcasts').findOne({ tags: keyword }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
router.get('/api/keywords/:keyword/search/date/:date', function (req, res) {
    var keyword = req.params.keyword;
    var date = req.params.date;
    db.collection('podcasts').find({ tags: keyword, date: date }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
/* Podcast Page */
router.post('/api/podcasts', function (req, res) {
    var podcast = req.body;
    db.collection('podcasts').insertOne(podcast, function (err, result) {
        if (err) {
            console.log('Error inserting podcast');
            throw err;
        }
        res.send(result.ops[0]);
    })
})
router.get('/api/podcasts/:podcast_title', function (req, res) {
    var podcast = req.params.podcast_title;
    db.collection('podcasts').findOne({ title: podcast }, function (err, result) {
        if (err) {
            console.log('Error finding podcast');
            throw err;
        }
        res.send(result);
    })
})
router.patch('/api/podcasts/:podcast_title', function (req, res) {
    var podcast = req.params.podcast_title;
    var podcast = req.body;
    db.collection('podcasts').updateOne({ title: podcast.title }, { $set: podcast }, function (err, result) {
        if (err) {
            console.log('Error updating podcast');
            throw err;
        }
        res.send(result);
    })
})
router.delete('/api/podcasts/:podcast_title', function (req, res) {
    var podcast = req.params.podcast_title;
    var name = req.session.username;
    var authored = [];
    var podcaststuff = [];
    name.split('-')
    if (name != null) {
        db.collection('users').find({ fname: name[0], lname: name[1] }).toArray(function (err, result) {
            if (err) {
                console.log('Error finding user');
                throw err;
            }
            if (name > 2) {
                authored = result[name[2]].authored;
            }
            authored = result[0].authored
        })
        db.collection('podcasts').findOne({ title: podcast }).toArray(function (err, result) {
        if (podcast in authored) {
            db.collection('podcasts').deleteOne({ title: podcast }, function (err, result) {
                if (err) {
                    console.log('Error deleting podcast');
                    throw err;
                }
            })
        }
    }
})
router.patch('/api/podcasts/:podcast_title/actions/subscribe', function (req, res) {
    var podcast = req.params.podcast_title;
    db.collection('users').updateOne({ title: podcast }, { $set: { subscribed: true } }, function (err, result) {
    })
})
router.patch('/api/podcasts/:podcast_title/actions/like', function (req, res) {
    var podcast = req.params.podcast_title;
    var user = req.body
    var likes = []
    db.collection('podcasts').updateOne({ title: podcast }, { $inc: { likes: 1 } }, function (err, result) { })
    db.collection('users').findOne(user.username, function (err, result) {
        if (err) {
            console.log('Error finding user');
            throw err;
        }
        if (podcast in result.likes) {
            var index = result.likes.indexOf(podcast)
            result.likes.splice(index, 1)
            likes = result.likes
        }
        else {
            likes = result.likes
            likes.push(podcast)
        }
    })
    db.collection('users').updateOne({ username: user.username }, { $set: { likes: likes } }, function (err, result) { })
})
router.get('/api/podcasts/:podcast_title/comments', function (req, res) {
    var podcast = req.params.podcast_title;
    db.collection('podcasts').findOne({ Title: podcast }, function (err, result) {
        if (err) {
            console.log('Error finding podcast');
            throw err;
        }
        res.send(result.comments);
    })
})
/* Authentication */
router.post('/api/auth/signup', function (req, res) {
    var user = req.body;
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
    db.collection('users').findOne(user.username, function (err, result) {
        if (err) {
            console.log('Error finding user');
            throw err;
        }
        res.send(result);
    })
})
/* Author account approval */
router.post('/api/authors', function (req, res) {
    var author = req.body;
    db.collection('users').updateOne({ fname: author.fname, lname: author.lname }, { $set: { role: 'author' } }, function (err, result) {
    })
})
/* User/author profile */
router.get('/api/users/:first_name_last_name', function (req, res) {
    var user = req.params.first_name_last_name;
    user.split('-')
    db.collection('users').findOne({ fname: user[0], lname: user[1] }, function (err, result) {
        if (err) {
            console.log('Error finding user');
            throw err;
        }
        res.send(result);
    })

})
router.post('/api/users/:first_name_last_name/actions/follow', function (req, res) {
    var user = req.params.first_name_last_name;
})
router.get('/api/users/:first_name_last_name/podcasts/authored', function (req, res) {
    var user = req.params.first_name_last_name;
    db.collection('podcasts').find({ author: user }).toArray(function (err, result) { })
})
router.get('/api/users/:first_name_last_name/podcasts/saves', function (req, res) {
    var user = req.params.first_name_last_name;
    db.collection('podcasts').find({ saved: user }).toArray(function (err, result) { })
})
/* User/author account */
router.get('/api/account', function (req, res) {
    var user = req.body;
    db.collection('users').findOne({ fname: user[0], lname: user[1] }, function (err, result) {
        if (err) {
            console.log('Error finding user');
            throw err;
        }
        res.send(result);
    })
})
router.patch('/api/account', function (req, res) {
    var user = req.body;
    db.collection('users').updateOne({ fname: user[0], lname: user[1] }, { $set: user }, function (err, result) {
        if (err) {
            console.log('Error updating user');
            throw err;
        }
        res.send(result);
    })
})
module.exports = { router };