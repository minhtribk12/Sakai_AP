angular.module('adminGradeBookController', []).controller('AdminGradeBookController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminGradeBook) {

	var user = $cookieStore.get('user') || null;

	AdminGradeBook.getGradebook(user, $rootScope.cid).then(function(data){
		$scope.gradebook = data;
		alert($scope.gradebook)
	})
});