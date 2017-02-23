// Set up express, path, body-parse, bcrypt
var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	bcrypt = require('bcrypt'),
	app = express();

//  Point app to static folders
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

// require body_parser to use json
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// require the mongoose configuration file
require(path.join(__dirname, './server/config/mongoose.js'));

// Invoke function stored in routes and pass it the app variable
var routes = require('./server/config/routes.js');
routes(app);

// Run server, listen on port 8000
app.listen(8000, function(){
	console.log("Listening on port 8000");
});