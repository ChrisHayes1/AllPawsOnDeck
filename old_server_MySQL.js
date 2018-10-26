// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 80;
//var mysql = require('mysql');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

//var configDB = require('./config/database.js');
//var config = require('./config/mysql.js');
//var knex_con = require('./config/knex_config.js');
//var Knex = require('knex')({ knex_con }); //connect through knex
//var knex = require('knex')({
//	client:'mysql',
//	host: '127.0.0.1',
//	user: 'furever',
//	password:'fuever1234',
//	database:'APOD'
//});
//const{ Model }= require('objection');
// configuration ===============================================================
//mysql.createConnection(config.pass); // connect to our database
//Model.knex(knex);
mongoose.connect('mongodb://myUserAdmin:abc123@localhost:27017');
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

