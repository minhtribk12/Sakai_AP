angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home/index.html',
    })
   
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}]);
