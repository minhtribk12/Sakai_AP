angular.module('adminGradeBookController', []).controller('AdminGradeBookController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminGradeBook) {

	var user = $cookieStore.get('user') || null;
	var cdata = $cookieStore.get('cdata') || {'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null};

	AdminGradeBook.getGradebook(cdata.cid, user.users_id).then(function(data){
		$scope.gradebooks = data;
	})
});