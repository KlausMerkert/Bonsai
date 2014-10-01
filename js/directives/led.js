'use strict';

bonsaiApp.directive('led', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            wire: '=',
            value: '=',
            top: '=',
            left: '=',
            color: '=',
            ledName: '@'
        },
        link: function ($scope, element, attrs) {
            $scope.dataChangeCallback = function (value) {
                if (value !== undefined) {
                    $scope.value = value;
                }
            };

            $scope.led = new Led($scope.dataChangeCallback, $scope.value);

            $scope.$watch('value', function(newValue) {
                if (newValue != $scope.led.getValue()) {
                    $scope.led.setValue(newValue);
                }
                if (newValue) {
                    if ($scope.color) {
                        $scope.colorCSS = $scope.color;
                    } else {
                        $scope.colorCSS = 'rgb(0, 255, 0)';
                    }
                    $scope.cursor = 'arrow';
                } else {
                    $scope.colorCSS = 'rgba(200, 200, 200, 30)';
                    $scope.cursor = 'pointer';
                }
            });

            $scope.$watch('color', function(newValue) {
                if ($scope.led.getValue()) {
                    $scope.colorCSS = newValue;
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

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top, left: $scope.left}];
            };

            $scope.$watch('wire', function (newWire, oldWire) {
                if (newWire) {
                    newWire.enrollToDirective(
                        $scope.led,
                        $scope.getConnectionPositions
                    );
                    newWire.registerReaderAndRead($scope.led);
                }
                if (oldWire && (newWire != oldWire)) {
                    oldWire.resign($scope.led);
                }
            });

            $scope.$emit('componentInitialized', $scope);

            $scope.$on('sendInitialValues', function (event, message) {
                if ($scope.value) {
                    $scope.activate();
                }
            });
        },
        templateUrl: 'partials/component_Led.html'
    };
});