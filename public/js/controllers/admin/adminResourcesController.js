angular.module('adminResourcesController', []).controller('AdminResourcesController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminResources) {

	var user = $cookieStore.get('user') || null;

	AdminResources.getResources($rootScope.cid, user).then(function(data){
		$scope.files = data;
		console.log(data);
	})
});