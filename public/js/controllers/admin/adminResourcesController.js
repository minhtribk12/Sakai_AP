angular.module('adminResourcesController', []).controller('AdminResourcesController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminResources) {

	var user = $cookieStore.get('user') || null;

	AdminResources.getResources(user, $rootScope.cid).then(function(data){
		$scope.files = data;
		console.log(data);
	})
});