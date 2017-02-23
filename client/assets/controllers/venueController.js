console.log("Venue Controller");

// This controller is in charge of displaying the Dashboard for the user
app.controller('VenueController', ['$scope','$location', '$cookies', '$routeParams', 'venuesFactory', function($scope,$location,$cookies,$routeParams,venuesFactory){

	//  Ensure that user is logged into the platform
	(function() {
		// check to see if the cookie exists w/ user_id
		if ($cookies.get('user_id') == undefined ){
			$location.url('/login');  // if user_id is not found, redirect to login partial
		} else {
			$scope.user_id = $cookies.get('user_id'); // pass user_id to $scope for use in logout()

			venuesFactory.show_venue($routeParams.id , function(status, venue) {
				if (status == false) {// if the venue cannot be found using the id
					// redirect the client to the dashboard
					$location.url('/home');
				}
				else {
					//  get venue info from factory and send to $scope
					$scope.venue = venue;
				}
			});
		}
	})(); 

	// Edit user,  send request to the factory
	$scope.edit_venue = function() {
		// venuesFactory.update($scope.user_id, $scope.editUser), function(status, response) {
		// 	if (status == false) {
		// 		//  if status is false, then there was an error
		// 		$scope.editErrors = response;
		// 	} else {
		// 		//  If no error, post was added
		// 		$scope.editUser = {};  // clear new editUser form
		// 		$scope.editErrors = {}; // clear out errors
		// 		$location.reload(true); //refresh partial from server
		// 	}
		// };
	}

	//  Logout user
	$scope.logout = function(){
		$cookies.remove('user_id');  // remove cookie user_id from cookie
		$location.url('/login') // send to login partial
	}

	
}]);