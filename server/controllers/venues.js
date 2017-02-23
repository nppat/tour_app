console.log('Server-side:  Venues Controller');

var mongoose = require('mongoose');
var Venue = mongoose.model('Venue');

// Create Users Controller
function VenuesController() {

	// Get all venues from DB
	this.index = function(req,res){
		Venue.find({}, function(err, venues) {
			if (err){
				console.log("[Server: Index] - Error.  Venues not pulled from database.");
			} else {
				console.log("[Server: Index] - Success.  Venues pulled from database.");
				res.json( venues );
			}
		})
	} // end index

	// Create new venue
	this.create_venue = function(req,res) {
		var venue = new Venue(
			req.body
		);

		venue.save(function(err, venue) {
			if (err) {
				console.log('[Server-side Create Venue] - Error, Venue not saved', err);
			} else {
				console.log('[Server-side Create Venue] - Venue Saved', venue);
				res.json( venue ); // return data object back to factory
			}
		});
	} // end create_venue

	//  Find single venue
	this.show_venue = function(req,res) {
		Venue.findOne({_id: req.params.id}, function(err, venue){
			if(venue == null){
				console.log('[Server-side Venue] - Error.  Venue not retrieved');
			} else {
				console.log('[Server-side Venue] - Venue retrieved');
				console.log(venue)
				res.json( venue );  // send object back to factory that is calling for it
			}
		});
	} // send single_venue

	// Delete Venue
	this.delete = function(req, res) {
		// console.log(req.params);
		Venue.remove({_id: req.params.id}, function(err) {
			if (err) {
				console.log("[delete: ERROR] Venue not removed ", err);
			}
			else {
				console.log("[delete] successfully deleted venue from the DB!");
			}
		});
	}
} // end VenuesController()
module.exports = new VenuesController();