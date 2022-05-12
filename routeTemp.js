const express = require('express');
const app = express();

/* Home Page (not logged in) */
app.get('/api', function (req, res) {
    
})
app.get('/api/search/keyword/:keyword', function (req, res) {

})
app.get('/api/search/date/:date', function (req, res) {
    
})
/* Home page (logged in) */
app.get('/api', function (req, res) {
    
})
app.get('/api/search/keyword/:keyword', function (req, res) {
    
})
app.get('/api/search/date/:date', function (req, res) {
    
})
/* Scientific discipline index page */
app.get('/api/categories', function (req, res) {
    
})
/* Scientific discipline detail page */
app.get('/api/categories/:scientific-discipline', function (req, res) {
    
})
app.get('/api/categories/:scientific-discipline/search/keyword/:keyword', function (req, res) {
    
})
app.get('/api/categories/:scientific-discipline/search/date/:date', function (req, res) {
    
})
/* Tags index page */
app.get('/api/keywords', function (req, res) {
    
})
/* Tage page */
app.get('/api/keywords/:keyword', function (req, res) {
    
})
app.get('/api/keywords/:keyword/search/date/:date', function (req, res) {
    
})
/* Podcast Page */
app.post('/api/podcasts', function (req, res) {
    
})
app.get('/api/podcasts/:podcast-title', function (req, res) {
    
})
app.patch('/api/podcasts/:podcast-title', function (req, res) {
    
})
app.delete('/api/podcasts/:podcast-title', function (req, res) {
    
})
app.patch('/api/podcasts/:podcast-title/actions/subscribe', function (req, res) {
    
})
app.patch('/api/podcasts/:podcast-title/actions/like', function (req, res) {
    
})
app.get('/api/podcasts/:podcast-title/comments', function (req, res) {
    
})
/* Authentication */
app.post('/api/auth/signup', function (req, res) {
    
})
app.post('/api/auth/signin', function (req, res) {
    
})
/* Author account approval */
app.post('/api/authors', function(req, res) {

})
/* User/author profile */
app.get('/api/users/:first-name-last-name', function (req, res) {
    
})
app.post('/api/users/:first-name-last-name/actions/follow', function (req, res) {
    
})
app.get('/api/users/:first-name-last-name/podcasts/authored', function (req, res) {
    
})
app.get('/api/users/:first-name-last-name/podcasts/saves', function (req, res) {
    
})
/* User/author account */
app.get('/api/account', function (req, res) {
    
})
app.patch('/api/account', function (req, res) {
    
})