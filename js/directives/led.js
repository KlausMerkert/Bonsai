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
                if (newValue) {
                    $scope.color = 'rgb(0, 255, 0)';
                    $scope.cursor = 'arrow';
                } else {
                    $scope.color = 'rgba(200, 200, 200, 30)';
                    $scope.cursor = 'pointer';
                }
            });

            attrs.$observe('ledName', function() {
                if ($scope.ledName) {
                    $scope.led.setName($scope.ledName);
                }
            });

            $scope.$watch('top', function () {
                $scope.topCSS = ($scope.top - 4) + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = ($scope.left - 4) + 'px';
            });

            $scope.activate = function () {
                $scope.wire.unregisterReader($scope.led);
                try {
                    $scope.wire.write($scope.led, 1);
                } catch (exception) {
                    $scope.value = $scope.wire.registerReaderAndRead($scope.led);
                    throw exception;
                }
                $scope.led.setValue(1);
            };
            $scope.deactivate = function () {
                try {
                    $scope.wire.write($scope.led, 0);
                } catch (exception) {
                    throw exception;
                } finally {
                    $scope.wire.stopWriting($scope.led);
                    $scope.value = $scope.wire.registerReaderAndRead($scope.led);
                }
            };

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