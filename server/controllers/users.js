console.log('Server-side: Users Controller');

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

// Create Users Controller
function UsersController() {

	// Login
	this.login = function(req,res) {
		// set email and password var to the data pulled from the body
		var email = req.body.login_email;
		var password = req.body.login_password;

		// find one User email
		User.findOne({ email: email }, function(err, user) {
			// Check to see if user email/password is valid
			if (err) {
				res.json({errors: '***** Server: Email and/or password is invalid ******'});
			} else {
				// If user checks out, compare user with password
				if(bcrypt.compareSync(password, user.password)  == false ) {
					// passwords do not match
					res.json({errors: '***** Server: Email and/or password is invalid ******'});
				}
				else{
					// user and password match
					console.log("******* Server-side: Login Successfull ******")
					res.json( user );
				}
			}
		});
	} // end login

	// Register
	this.register = function(req,res) {
		// create new User
		var user = new User ({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			username: req.body.username
		});
		// Save user
		user.save( function(err, user) {
			if(err) {
				console.log("******[Server - User Controller]: Register Error ******", err)
				res.json({ errors: err.errors });
			} else {
				console.log('******[Server - User Controller]: Registraton Success ******', user)
				res.json(user);
			}
		});
	} // end register

	// Profile Data
	this.profileData = function(req,res) {
		User.findOne({ _id: req.params.id }, function(err, user){
			if(user == null){
				console.log('[Server-side Profile Data] - Error.  Profile not retrieved');
			} else {
				console.log('[Server-side Profile Data] - Profile retrieved');
				res.json( user );  // send object back to factory that is calling for it
			}
		});
	}

	// Update user information
	this.userUpdate = function(req,res) {
		console.log(req.params);
		console.log(req.body);
		User.update({ _id: req.params.id }, {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					username: req.body.username,
					email: req.body.email,
				}, function(err) {
			if (err) {
				console.log("Users not updated", err);
			} else {
				console.log("Successfully updated user");
			}
		});
	}
} // end UsersController()
module.exports = new UsersController();