'use strict';

var bonsaiApp = angular.module(
        'Bonsai',
        [
            'ngAnimate',
            'ngRoute',
            'localization'
        ]
    )
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/main.html', controller: 'bonsaiCpuCtrl'}).
            otherwise({templateUrl: 'partials/main.html', controller: 'bonsaiCpuCtrl'});
        // use the HTML5 History API
		$locationProvider.html5Mode(true).hashPrefix('!');
    }])
    .factory('$exceptionHandler', function ($injector) {
        return function (exception, cause) {
            if (exception.name) {
                $injector.get('$rootScope').$broadcast('error', exception);
            } else {
                throw exception;
            }
        };
    });