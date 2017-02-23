console.log('Routes');

var mongoose = require('mongoose');

/*
There are 3 controllers we will access, users, posts, and comments
*/
var users = require('./../controllers/users');
var venues = require('./../controllers/venues');

module.exports = function(app){
	//Users must be able to login and to register
  app.post('/user/login', users.login);
  app.post('/user/register', users.register);

  // Access to all venues and create a new venue
  app.get('/venue', venues.index); // get all venues
  app.post('/venue', venues.create_venue);  // create venue

  // For each Venue
  app.get('/venue/:id', venues.show_venue); // get a single venue
  app.delete('/venue/:id', venues.delete); // delete venue

  // User Profile
  app.get('/user/:id', users.profileData);  // Get User profile data for profile page
  app.put('/user/:id', users.userUpdate);  // Update User data
}