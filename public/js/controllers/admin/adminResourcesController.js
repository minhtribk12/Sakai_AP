angular.module('adminResourcesController', []).controller('AdminResourcesController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminResources) {

	var user = $cookieStore.get('user') || null;
	var  = $cookieStore.get('cid')

	AdminResources.getResources(cid, user).then(function(data){

		$scope.files = data;
	})
});