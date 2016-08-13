'use strict';

angular.module('ServerServices', [])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
    .factory('PageCounter', function ($http) {
        return {
            count: function (path, partial) {
                return $http({
                    url: 'https://bonsai.counter.merkert.info/counter.php',
                    method: "POST",
                    data: 'path=' + path + '&partial=' + partial,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
        };
    });