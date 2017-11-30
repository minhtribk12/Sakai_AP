var app = angular.module('none', [
    'ngRoute',
    'appRoutes',
    'appFilters',
    'ngMap',
    'appDirectives',
    'ui.bootstrap',
    'ngCookies',
    'angular-md5',
    'ngToast',

    'mainController',
    'MainService',

]).filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);

app.run(['$location', '$rootScope', function ($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
           // Some rootScope variable
        });
    }]);

angular.module('admin', [
    'ngRoute',
    'appAdminRoutes',
    'appFilters',
    'appDirectives',

    'ngFileUpload',
    'ngTable',
    'ngCookies',
    'angular-md5',
    'ngTagsInput',

    'adminMainController',
    'AdminMainService',

    'adminLoginController',

    'adminResourcesController',
    'AdminResourcesService',

    'adminGradeBookController',
    'AdminGradeBookService'
]);
