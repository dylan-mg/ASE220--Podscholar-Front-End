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
// search for keyword in database
router.get('/api/search/keyword/:keyword', function (req, res) {
    var keyword = req.params.keyword;
    db.collection('podcasts').find({keywords: keyword }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
// search for date in database
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
// search category and keyword in database
router.get('/api/search/categories/:scientific_discipline/keyword/:keyword', function (req, res) {
    var category = req.params.scientific_discipline;
    var keyword = req.params.keyword;
    db.collection('podcasts').find({ categories: category, keywords: keyword }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
// search category and date in database
router.get('/api/search/categories/:scientific_discipline/date/:date', function (req, res) {
    var category = req.params.scientific_discipline;
    var date = req.params.date;
    db.collection('podcasts').find({ categories: category, date: date }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
// search keyword and date in database
router.get('/api/search/keywords/:keyword/date/:date', function (req, res) {
    var keyword = req.params.keyword;
    var date = req.params.date;
    db.collection('podcasts').find({ keywords: keyword, date: date }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
router. get('/api/search/categories/:scientific_discipline/keywords/:keyword/date/:date', function (req, res) {
    var category = req.params.scientific_discipline;
    var keyword = req.params.keyword;
    var date = req.params.date;
    db.collection('podcasts').find({ categories: category, keywords: keyword, date: date }).sort({ _id: -1 }).limit(10).toArray(function (err, result) {
        if (err) {
            console.log('Error finding podcasts');
            throw err;
        }
        res.send(result);
    })
})
// search one of each in database
router.get('/api/search/:options', function (req, res) {
    var options = req.params.options;
    var selected =[];
    var keyword, date, category;
    options.split('_')
    for(i=0; i<options.length; i++){
        options.split(':')
    }
    for (i = 0; i < options.length; i++) {
        if(options[i][0]=='category'){
            category = options[i][1];
            selected.append('category')
        }
        else if(options[i][0]=='keyword'){
            keyword = options[i][1];
            selected.append('keyword')
        }
        else if(options[i][0]=='date'){
            date = options[i][1];
            selected.append('date')
        }
    }
    if(selected.length==1){
        if(selected[0]=='category'){
            res.redirect('/api/search/categories/'+category)
        }
        else if(selected[0]=='keyword'){
            res.redirect('/api/search/keywords/'+keyword)
        }
        else if(selected[0]=='date'){
            res.redirect('/api/search/date/'+date)
        }
    }
    else if(selected.length==2){
        if(selected[0]=='category' && selected[1]=='keyword'){
            res.redirect('/api/search/categories/'+category+'/keywords/'+keyword)
        }
        else if(selected[0]=='category' && selected[1]=='date'){
            res.redirect('/api/search/categories/'+category+'/date/'+date)
        }
        else if(selected[0]=='keyword' && selected[1]=='date'){
            res.redirect('/api/search/keywords/'+keyword+'/date/'+date)
        }
    }
    else if(selected.length==3){
        if(selected[0]=='category' && selected[1]=='keyword' && selected[2]=='date'){
            res.redirect('/api/search/categories/'+category+'/keywords/'+keyword+'/date/'+date)
        }
    }
})