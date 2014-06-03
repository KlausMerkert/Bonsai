'use strict';

bonsaiApp.controller('bonsaiCpuCtrl',
    function ($scope, $routeParams) {
        //$scope.dataBus = Bus();

        $scope.dataBusHandler = {};
        $scope.adressBusHandler = {};

        $scope.errors = [];
        $scope.$on('error', function (event, message) {
            console.log(message);
            $scope.errors.push(message)
        });
    }
);