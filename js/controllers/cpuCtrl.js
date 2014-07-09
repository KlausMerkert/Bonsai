'use strict';

bonsaiApp.controller('bonsaiCpuCtrl',
    function ($scope, $routeParams) {
        $scope.base = 10;

        $scope.dataBus = new Bus();
        $scope.addressBus = new Bus();

        $scope.wire1 = new ControlWire();
        $scope.wire2 = new ControlWire();
        $scope.wire3 = new ControlWire();
        $scope.wire4 = new ControlWire();

        $scope.errors = [];
        $scope.$on('error', function (event, message) {
            $scope.errors.push(message)
        });
    }
);