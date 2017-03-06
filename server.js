var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var request = require('request');

// Routes Path
var route_user = require('./public/js/user.js');
var route_chain = require('./public/js/registrar.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.use(express.static(__dirname + '/public'));

var mydb;


app.get('/', function(req, res){

  res.render('index');
});

app.get('/user', function(req, res){

  res.render('user');
});


//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));


// Routes
app.post('/insertUser', route_user.insertUser);
app.post('/getUser', route_user.getUser);
app.post('/getAllUsers', route_user.getAllUsers);
app.post('/teste1', route_chain.teste1);


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
