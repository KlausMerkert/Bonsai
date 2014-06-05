'use strict';

var bonsaiApp = angular.module(
        'Bonsai',
        [
            'ngAnimate',
            'ngRoute',
            'localization'
        ]
    )
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: '/partials/main.html', controller: 'bonsaiCpuCtrl'}).
            otherwise({templateUrl: '/partials/main.html', controller: 'bonsaiCpuCtrl'});
    }])
    /*.factory('$exceptionHandler', function ($injector) {
        return function (exception, cause) {
            $injector.get('$rootScope').$broadcast('error', exception);
        };
    })*/;