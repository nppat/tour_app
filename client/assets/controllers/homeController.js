console.log("Home Controller");

// This controller is in charge of displaying the Dashboard for the user
app.controller('HomeController', ['$scope','$location', '$cookies', 'venuesFactory', 'usersFactory', function($scope,$location,$cookies,venuesFactory,usersFactory){
	$scope.venues = [
		// {'name':'Shooters', 'phone_number': '308-555-5555', 'city': 'North Platte', 'state': 'NE'},
		// {'name':'Shooters', 'phone_number': '308-555-5555', 'city': 'North Platte', 'state': 'NE'},
		// {'name':'The Grove', 'phone_number': '308-555-5555', 'city': 'North Platte', 'state': 'NE'},
		// {'name':'Players', 'phone_number': '308-555-5555', 'city': 'North Platte', 'state': 'NE'},
		// {'name':'D & N Event Center', 'phone_number': '308-555-5555', 'city': 'North Platte', 'state': 'NE'}
	];  // to store venues

	// This gets all the topics
	var getVenues = function(venues) {
		$scope.venues = venues;
	};

	//  Ensure that user is logged into the platform
	(function() {
		// check to see if the cookie exists w/ user_id
		if ($cookies.get('user_id') == undefined ){
			$location.url('/login');  // if user_id is not found, redirect to login partial
		} else {
			usersFactory.profileData($cookies.get('user_id'), function(response) {
				$scope.user = {
					username: response.username,
					first_name: response.first_name
				}
			}); // pass username to $scope
			$scope.user_id = $cookies.get('user_id'); // pas user_id to scope
			// get all venues
			venuesFactory.index(getVenues);
		}
	})(); 

	// Create a new venue,  send request to the factory
	$scope.create_venue = function() {
		venuesFactory.create_venue($scope.newVenue, function(status, response) {
			if (status == false) {
				//  if status is false, then there was an error
				$scope.venueError = response;
			} else {
				//  If no error, post was added
				$scope.newVenue = {};  // clear new venue form
				$scope.venueError= {}; // clear out errors
				$scope.venues.push(response);  // add venue
				$location.url('/home'); // send to home partial
			}
		});
	}

	// Delete Venue
	$scope.delete = function(venue_id) {
		venuesFactory.delete(venue_id, getVenues);
		location.reload();  // reload partial
	}

	//  Logout user
	$scope.logout = function(){
		$cookies.remove('user_id');  // remove cookie
		$location.url('/login') // send to login partial
	}
}]);