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
            when('/', {templateUrl: '/partials/introduction.html', controller: 'bonsaiPageCtrl'}).
            when('/documentation/', {templateUrl: '/partials/documentation.html', controller: 'bonsaiPageCtrl'}).
            when('/bonsai/', {templateUrl: '/partials/main.html', controller: 'bonsaiCpuCtrl'}).
            otherwise({templateUrl: '/partials/introduction.html', controller: 'bonsaiPageCtrl'});
        // use the HTML5 History API
		$locationProvider.html5Mode(true).hashPrefix('!');
    }])
    .factory('$exceptionHandler', function ($injector) {
        return function (exception, cause) {
            if (exception.localization) {
                $injector.get('$rootScope').$broadcast('error', exception);
            } else {
                if (cause) {
                    console.log("Cause: " + cause);
                }
                throw exception;
            }
        };
    });