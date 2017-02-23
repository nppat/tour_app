console.log('VenuesFactory');

app.factory('venuesFactory', ['$http', function($http) {
	function VenuesFactory() {

		// Get all posts from server
		this.index = function(callback) {
			$http.get('/venue').then(
				function success(response) {
					callback(response.data);
				},
				function error(response) {
					console.log('[Factory Index: ERROR] - Venues not retreived' + response);
				}
			);
		} // end index

		// Create new topic
		this.create_venue = function(newVenue, callback) {

			$http.post('/venue', newVenue).then(
				function success(response) {
					if (typeof(response.data.errors) != 'undefined'){
						callback(false, response.data.errors);
					} else {
						callback(true, response.data);
					}
				},
				function error(response) {
					console.log('[Create Venue] - Error.  Venue not created');
				}
			);
		} // end create_venue

		// Retrieve single venue
		this.show_venue = function(id, callback) {
			$http.get('/venue/' + id).then(
				function success(response) {
					if (typeof(response.data.errors) != 'undefined') {
						callback(false, response.data.errors);
					}
					else {
						console.log(response.data);
						callback(true, response.data);
					}
				},
				function error(response) {
					console.log('[Single Venue] - Error');
				}
			);
		} // send single_venue

		// Remove Venue from DB
		this.delete = function(venue_id){
			$http.delete('/venue/' + venue_id).then(
				function success(response) {
					//  nothing is returned
				},
				function errorCallback(response) {
					console.log('Venue not deleted.');
			});
		};
	} // end TopicsFactory
	return new VenuesFactory();
}]);