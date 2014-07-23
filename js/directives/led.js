'use strict';

bonsaiApp.directive('led', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            wire: '=',
            value: '=',
            top: '=',
            left: '=',
            ledName: '@'
        },
        link: function ($scope, element, attrs) {
            $scope.dataChangeCallback = function (value) {
                if (value !== undefined) {
                    $scope.value = value;
                }
            };

            $scope.led = new Led($scope.dataChangeCallback, $scope.value);

            $scope.$watch('value', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.led.setValue(newValue);
                }
            });

            attrs.$observe('ledName', function() {
                if ($scope.ledName) {
                    $scope.led.setName($scope.ledName);
                }
            });

            $scope.$watch('top', function () {
                $scope.topCSS = ($scope.top - 0.27) + 'em';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = ($scope.left - 0.27) + 'em';
            });

            $scope.setValue = function (value) {
                $scope.led.setValue(value);
            };

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top, left: $scope.left}];
            };

            // We have to wait for a very short time to enroll to the buses
            // because the wire needs to be fully initialized.
            $interval(function () {
                $scope.wire.enrollToDirective(
                    $scope.led,
                    $scope.getConnectionPositions
                );
                $scope.wire.registerReaderAndRead($scope.led);
            }, 1, 1);
        },
        templateUrl: 'partials/component_Led.html'
    };
});