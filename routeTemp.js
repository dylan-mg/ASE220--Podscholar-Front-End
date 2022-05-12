const express = require('express');
const router = express.router();
const mongo = require('mongodb');
const username='quentin' // username for mongoDB
const password='quentin' // password for mongoDB
const clusterName='pods' // name of cluster for mongoDB
const dbName='pods' // name of database for mongoDB
const URL = `mongodb://${username}:${password}@cluster0.ut1nc.mongodb.net/${clusterName}?retryWrites=true&w=majority`
const mongoClient = mongo.MongoClient;
var db;
mongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err){
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
})
/* Home Page (not logged in) */
router.get('/',(req, res)=>{    
})
/* Home Page (logged in) */
router.get('/',(req, res)=>{    
})
/* Scientific discipline index page */
router.get('/categories',(req, res)=>{ 
    db.collection('categories').find().toArray(function(err, result) {
        if (err){ console.log('Error finding categories');
             throw err;}
        res.send(result);
    })   
})
/* Scientific discipline detail page */
router.get('/categories/:scientific-discipline',(req, res)=>{ 
    discipline = req.params.scientific-discipline;
    db.collection('categories').findOne({name: discipline}, function(err, result) {
        if (err){ console.log('Error finding categories');
             throw err;}
        res.send(result);
    })  
})
/* Tags index page */
router.get('/keywords',(req, res)=>{
})
/*Tag page*/
router.get('/keywords/:tag',(req, res)=>{
})
/* Podcast page */
router.get('/podcasts/:podcast-title',(req, res)=>{
})
/* Authentication */
router.get('/auth',(req, res)=>{
})
/*Author account approval */
router.get('/authors/create',(req, res)=>{
})
/*User/author profile */
router.get('/users/:first-name-last-name',(req, res)=>{
})
/* User/author account */
router.get('/account',(req, res)=>{
})
/* Edit/change personal information */
router.get('/account/details',(req, res)=>{
})
/*Edit/change account information*/
router.get('/acount/settings',(req, res)=>{
})
/*Authored podcasts*/
router.get('/users/:first-name-last-name/podcasts/authored',(req, res)=>{
})
/*podcasts*/
router.get('/users/:first-name-last-name/podcasts/saved',(req, res)=>{
})
/* Podcast upload page */
router.get('/podcasts/create',(req, res)=>{
})
/* Podcast edit page */
router.get('/podcasts/:podcast-title/edit',(req, res)=>{
})


/* API routes */
/* Home Page (not logged in) */
router.get('/api', function (req, res) {  
})
router.get('/api/search/keyword/:keyword', function (req, res) {
})
router.get('/api/search/date/:date', function (req, res) {    
})
/* Home page (logged in) */
router.get('/api', function (req, res) {    
})
router.get('/api/search/keyword/:keyword', function (req, res) { 
    var returnlist = [];
    var keyword = req.params.keyword;
    keyword = keyword.split('-');
    var dblist = []
    db.collection('podcasts').find({$or: [{tags: {$in: keyword}}, {title: {$regex: keyword[0], $options: 'i'}}]}).toArray(function(err, result) {
        if (err){
            console.log('Error finding podcasts');
            throw err;
        }
        dblist = result;
    })
    keyword.forEach(element => {
        if(element in dblist){
            returnlist.push(element);
        }
    });  
    res.send(returnlist); 
})
router.get('/api/search/date/:date', function (req, res) {  
    var date = req.params.date;
    var dblist = [];
    db.collection('podcasts').find({date: date}).toArray(function(err, result) {
        if (err){
            console.log('Error finding podcasts');
            throw err;
        }
        dblist = result;
    })  
    res.send(dblist);
})
/* Scientific discipline index page */
router.get('/api/categories', function (req, res) {    
})
/* Scientific discipline detail page */
router.get('/api/categories/:scientific-discipline', function (req, res) {    
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
    var user = req.body;
    db.collection('users').insertOne(user, function(err, result) {
        if (err){
            console.log('Error inserting user');
            throw err;
        }
        res.send('User created');
    })
})
router.post('/api/auth/signin', function (req, res) {  
    var user = req.body;
    db.collection('users').findOne(user, function(err, result) {
        if (err){
            console.log('Error finding user');
            throw err;
        }
        res.send(result);
    })
})
/* Author account approval */
router.post('/api/authors', function(req, res) {
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
