var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMessages']);

// Set up routes and controllers
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
          .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginRegController'
          })
          .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'LoginRegController'
          })
          .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
          })
          .when('/user/:id', {
            templateUrl: 'partials/user_profile.html',
            controller: 'UserController'
          })
          .when('/new_venue', {
            templateUrl: 'partials/newVenue.html',
            controller: 'HomeController'
          })
          .when('/venue/:id', {
            templateUrl: 'partials/venue.html',
            controller: 'VenueController'
          })
          .otherwise({
            templateUrl: 'partials/landing.html'
          });
}]);