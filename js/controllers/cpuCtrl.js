'use strict';

bonsaiApp.controller('bonsaiCpuCtrl',
    function ($scope, $routeParams) {
        $scope.dataBus = new Bus();
        $scope.adressBus = new Bus();

        $scope.errors = [];
        $scope.$on('error', function (event, message) {
            console.log(message);
            $scope.errors.push(message)
        });
    }
);