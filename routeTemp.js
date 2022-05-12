const express = require('express');
const app = express();

/* Web Routes */
/* Static Pages */
app.get('/pages/:page-name', function (req, res) {
})
/* Home Page (not logged in) */
app.get('/',(req, res)=>{    
})
/* Home Page (logged in) */
app.get('/',(req, res)=>{    
})
/* Scientific discipline index page */
app.get('/categories',(req, res)=>{    
})
/* Scientific discipline detail page */
app.get('/categories/:scientific-discipline',(req, res)=>{    
})
/* Tags index page */
app.get('/keywords',(req, res)=>{
})
/*Tag page*/
app.get('/keywords/:tag',(req, res)=>{
})
/* Podcast page */
app.get('/podcasts/:podcast-title',(req, res)=>{
})
/* Authentication */
app.get('/auth',(req, res)=>{
})
/*Author account approval */
app.get('/authors/create',(req, res)=>{
})
/*User/author profile */
app.get('/users/:first-name-last-name',(req, res)=>{
})
/* User/author account */
app.get('/account',(req, res)=>{
})
/* Edit/change personal information */
app.get('/account/details',(req, res)=>{
})
/*Edit/change account information*/
app.get('/acount/settings',(req, res)=>{
})
/*Authored podcasts*/
app.get('/users/:first-name-last-name/podcasts/authored',(req, res)=>{
})
/*podcasts*/
app.get('/users/:first-name-last-name/podcasts/saved',(req, res)=>{
})
/* Podcast upload page */
app.get('/podcasts/create',(req, res)=>{
})
/* Podcast edit page */
app.get('/podcasts/:podcast-title/edit',(req, res)=>{
})


/* API routes */
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
