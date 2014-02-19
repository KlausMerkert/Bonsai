'use strict';

angular.module('Bonsai', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: '/index.html', controller: cpuCtrl}).
            otherwise({templateUrl: '/index.html', controller: cpuCtrl});
    }]);