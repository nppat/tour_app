console.log("LoginRegController");

// This controller is in charge of the User login() and register() functions

app.controller('LoginRegController', ['$scope', '$location', '$cookies', 'usersFactory', function($scope,$location,$cookies,usersFactory) {

	$scope.newUser = {
		password: '',
		confirmPassword: ''
	};

	$scope.login = function() {
		//  Attempt to login user
		// From factory, using data from $scope.login on login partial
		usersFactory.login($scope.loginUser, function(status, response) {
			if (status == false) {
				// if status if false, there was an error
				$scope.login.password = ''; // clear password
				$scope.loginErrors = response;
			} else {
				// Login was successful, direct user to home partial
				$scope.login = {}; // clear the login form
				$scope.loginErrors = {};  // clear any errors from loginErrors
				$cookies.put('user_id', response._id); // set username into cookie
				$location.url('/home'); // send user to dashboard partial
			}
		});
	} // end $scope.login

	// Register the user:  make a request to the Factory
	$scope.register = function() {
		// check to see if user passwords match, if not, send error message to registerError on register.html
		if($scope.newUser.password != $scope.newUser.confirmPassword) {
			$scope.pwFail = "Passwords do not match!";
		}else{
			$scope.pwFail = ''; // clear out errors

			// send request to factory to register user
			usersFactory.register($scope.newUser, function(status, response) {
				if (status == false) { // if false, there are errors on the registration form
					$scope.registrationErrors = response;
					console.log("****** There are errors on the Form! ******", response);
				} else {
					// registration has been successful
					console.log('****** Client-side: Registration Success! ******')
					$scope.newUser = {}; // clear registraton form
					$scope.registrationErrors = {}; // clear any registration errors
					$cookies.put('user_id', response._id)  // set user_id in cookie to use in logout process later on
					$location.url('/login'); // send new user to home partial to view user information
				}
			});
		}
	} // end $scope.register
}]);  //end controller