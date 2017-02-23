console.log("User Controller");

// This controller is in charge of displaying the Dashboard for the user
app.controller('UserController', ['$scope','$location', '$cookies','$routeParams', 'usersFactory', function($scope,$location,$cookies,$routeParams,usersFactory){

	//  Ensure that user is logged into the platform
	(function() {
		// check to see if the cookie exists w/ user_id
		if ($cookies.get('user_id') == undefined ){
			$location.url('/login');  // if user_id is not found, redirect to login partial
		} else {
			$scope.user_id = $cookies.get('user_id'); // pass username to $scope
		}
	})(); 

	// Hold user
	$scope.user = {};

	var getUser = function(data) {
		$scope.user = data;

		$scope.editUser = { first_name: data.first_name,
							last_name: data.last_name,
							username: data.username,
							email: data.email,
		}
	}

	usersFactory.profileData($routeParams.id, getUser);

	// Edit user,  send request to the factory
	$scope.edit_user = function() {
		usersFactory.update($scope.user_id, $scope.editUser), function(status, response) {
			if (status == false) {
				//  if status is false, then there was an error
				$scope.editErrors = response;
			} else {
				//  If no error, post was added
				$scope.editUser = {};  // clear new editUser form
				$scope.editErrors = {}; // clear out errors
				$location.reload(true); //refresh partial from server
			}
		};
	}

	//  Logout user
	$scope.logout = function(){
		$cookies.remove('user_id');  // remove cookie
		$location.url('/login') // send to login partial
	}
}]);