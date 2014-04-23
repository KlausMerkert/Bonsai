'use strict';

var bonsaiApp = angular.module(
        'Bonsai',
        [
            'ngAnimate',
            'ngRoute'
        ]
    )
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: '/partials/main.html', controller: 'bonsaiCpuCtrl'}).
            otherwise({templateUrl: '/partials/main.html', controller: 'bonsaiCpuCtrl'});
    }]);