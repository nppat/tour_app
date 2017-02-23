console.log('Venue model');

var mongoose = require('mongoose');  // require moongoose
var Schema = mongoose.Schema;

// Build Venue schema and add it to mongoose.models
var VenueSchema = new mongoose.Schema({
	name: {type: String, required: true},
	promoter: {type: String},
	street_address: {type: String},
	city: {type: String},
	state: {type: String, uppercase: true},
	zip: {type: Number, minLength: [5, 'Zip Code is 5 numbers'], maxLength: [5, 'Zip Code is 5 numbers']},
	phone_number: {type: String},
	email: {type: String},
	bus_parking: {type: String},
	sound: {type: String},
	venue_capactiy: {type: String},
	fuel_price: {type: String},
	food_coffee: {type: String},
	bars: {type: String},
	things_to_do: {type: String},
	showers_yes: {type: Boolean}, // Checkbox
	showers_no: {type: Boolean}, // Checkbox
	wifi_yes: {type: Boolean}, // Checkbox
	wifi_no: {type: Boolean}, // Checkbox
	wifi_password: {type: String},
	free_booze_yes: {type: Boolean}, // Checkbox
	free_booze_no: {type: Boolean}, // Checkbox
	laundry: {type: String}
},{timestamps: true});

mongoose.model('Venue', VenueSchema);