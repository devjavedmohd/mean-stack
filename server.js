// server.js

// modules =========================================
var express         = require('express');
var app             = express();
var bodyParse       = require('body-parser');
var methodOverride  = require('method-override');
var db              = require('./config/db');

// configuration ===================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 3333;

// connect to our mongoDB database
// (uncomment after you enter in your own dredntials in config/db.js)
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json

app.use(bodyParse.json());

// parse application/vnd.api+json as json
app.use(bodyParse.json({
    type : 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParse.urlencoded({
    extended: true
}))

// override with the X-HTTP-Method-Override heaer in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes =============================================
require('./app/routes')(app); // configure our routes

// start app ==========================================
// startup our app at http://localhost:3333
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;