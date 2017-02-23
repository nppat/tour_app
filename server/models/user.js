console.log('User model');

var mongoose = require('mongoose');  // require moongoose
var bcrypt = require('bcrypt'); // require bcrypt for passwords

// Build User schema and add it to mongoose.models
var UserSchema = new mongoose.Schema({
	first_name : {type: String, required: true, minLength:[2, 'Name is too short.'], maxLength: [100, 'Name is too long']},
	last_name : {type: String, required: true, minLength:[2, "Name is too short"], maxLength: [100, 'Name is too long']},
	email: {type: String, unique: true, required: true},
	password: { type: String, required: true, minLength: [8, 'Minimum password length is 8 characters'], maxLength: [32, 'Password must be less than 32 characters']},
	username: {type: String, required: true}
},{timestamps: true});

// Hash password method
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

//  Hash password prior to saving
UserSchema.pre('save', function(hash) {
	this.password = this.generateHash(this.password);
	hash();
});

mongoose.model('User', UserSchema);