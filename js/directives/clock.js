'use strict';

bonsaiApp.directive('clock', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            wire: '=',
            runWire: '=',
            frequency: '=',
            clockName: '@',
            top: '=',
            left: '='
        },
        link: function ($scope, element, attrs) {
            $scope.clock = new Clock(function (value) {
                $scope.value = value;
            }, $scope.wire, $scope.frequency);

            $scope.clock.doTick = function () {
                $scope.$apply(function () {
                    $scope.clock.tick();
                })
            };

            attrs.$observe('clockName', function() {
                if ($scope.clockName) {
                    $scope.clock.setName($scope.clockName);
                }
            });

            $scope.$watch('value', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.clock.setValue(newValue);
                }
            });

            $scope.$watch('frequency', function () {
                $scope.clock.setFrequency($scope.frequency);
            });

            $scope.$watch('top', function () {
                $scope.topCSS = ($scope.top - 10) + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = ($scope.left + 3) + 'px';
            });

            $scope.highFlank = function () {
                $scope.clock.setValue(1);
            };

            $scope.lowFlank = function () {
                $scope.clock.setValue(0);
            };

            $scope.setToRun = function () {
                if ($scope.runWire) {
                    try {
                        $scope.runWire.write($scope.runWireConnector, 1);
                        $scope.clock.start()
                    } catch (exception) {
                        $scope.runWire.registerReaderAndRead($scope.runWireConnector);
                        throw exception;
                    }
                } else {
                    $scope.clock.start()
                }
            };

            $scope.setToStop = function () {
                if ($scope.runWire) {
                    try {
                        $scope.runWire.write($scope.runWireConnector, 0);
                    } catch (exception) {
                        throw exception;
                    } finally {
                        $scope.runWire.stopWriting($scope.runWireConnector);
                        $scope.runWire.registerReaderAndRead($scope.runWireConnector);
                    }
                }
                $scope.clock.stop()
            };

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top, left: $scope.left}];
            };

            $scope.getRunWireConnectionPositions = function () {
                return [{top: $scope.top-4, left: $scope.left+74}];
            };

            // We have to wait for a very short time to enroll to the buses
            // because the handler needs to be fully initialized.
            $interval(function () {
                $scope.wire.enrollToDirective(
                    $scope.clock,
                    $scope.getConnectionPositions
                );
                if ($scope.runWire) {
                    $scope.runWireConnector = new ReadingControlWireConnector($scope.runWire,
                        function () {
                            $scope.clock.start();
                        },
                        function () {
                            $scope.clock.stop();
                        }, $scope.clockName + ' run wire connector');
                    $scope.runWire.enrollToDirective($scope.runWireConnector, $scope.getRunWireConnectionPositions);
                    if ($scope.runWire.registerReaderAndRead($scope.runWireConnector)) {
                        $scope.clock.start();
                    }
                }
            }, 1, 1);
        },
        templateUrl: 'partials/component_Clock.html'
    };
});