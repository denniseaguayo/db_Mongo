var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var moviesRouter= require('./routes/movies');
var advancedSearchRouter= require('./routes/advanced-search');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/advanced-search', advancedSearchRouter);

app.get('/movies', function(req, res) {
  res.sendFile(path.join(__dirname,'/routes/movies.js'));
});
app.get('/advanced-search', function(req, res) {
  res.sendFile(path.join(__dirname,'/routes/advanced-search.js'));
});

app.listen(3000,function(){
    console.log('Exemple app listening on port 3000');
})

module.exports = app;
