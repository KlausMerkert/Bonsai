'use strict';

bonsaiApp.controller('bonsaiCpuCtrl',
    function ($scope, $routeParams) {
        if ('example' in $routeParams) {
            $scope.example = $routeParams['example'];
        }
    }
);