'use strict';

bonsaiApp.directive('led', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            wire: '=',
            value: '=',
            top: '=',
            left: '='
        },
        controller: function ($scope) {
            $scope.data = $scope.value;

            $scope.dataChangeCallback = function (value) {
                $scope.data = value;
            };

            $scope.led = new Led($scope.dataChangeCallback, $scope.data);
            $scope.topCSS = ($scope.top - 0.27) + 'em';
            $scope.leftCSS = ($scope.left - 0.27) + 'em';

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top, left: $scope.left}];
            };

            // We have to wait for a very short time to enroll to the buses
            // because the wire needs to be fully initialized.
            $interval(function () {
                $scope.wire.connectToDirective($scope.led, $scope.getConnectionPositions);
            }, 1, 1);
        },
        link: function ($scope, element, attrs) {
            $scope.$watch('data', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.led.setValue(newValue);
                }
            });

            $scope.setValue = function (value) {
                $scope.led.setValue(value);
            };
        },
        templateUrl: 'partials/component_Led.html'
    };
});