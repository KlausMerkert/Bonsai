'use strict';

bonsaiApp.directive('gateReadFlankWriteState', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            connection: '=',
            downwards: '='
        },
        controller: function ($scope, $timeout, $interval) {
            $scope.gateState = 0;
            $scope.gateColor = 'rgb(200, 200, 200)';
            $scope.gateColorIteration = 0;

            $scope.$on('busChangeCallback', function (event, message) {
                if (message.bus == $scope.connection.bus) {
                    $scope.gateState = message.value;
                }
            });

            $scope.$watch('gateState', function (newState) {
                if (newState === -1) {
                    $scope.gateColor = 'rgb(122, 222, 103)';
                    $scope.gateColorIteration = 20;
                    $interval(function () {
                        $scope.gateColorIteration = Math.max($scope.gateColorIteration, 0);
                        $scope.gateColor =
                            'rgb(' + Math.floor(122 + (200 - 122) * (20 - $scope.gateColorIteration) / 20) +
                            ', ' + Math.floor((222 - 200) * $scope.gateColorIteration / 20 + 200) +
                            ', ' + Math.floor(103 + (200 - 103) * (20 - $scope.gateColorIteration) / 20) + ')';
                        if ($scope.gateColorIteration <= 0) {
                            $scope.$emit('gateReadDisconnected', $scope.connection.bus);
                        }
                        $scope.gateColorIteration--;
                    }, 30, 21);
                } else if (newState === 1) {
                    $scope.gateColor = 'rgb(255, 103, 97)';
                } else {
                    $scope.gateColor = 'rgb(200, 200, 200)';
                }
            });

            $scope.activateWriteWire = function ($event) {
                if ($event) { $event.preventDefault(); }
                if ($scope.connection.writeWire) {
                    $scope.connection.writeWire.unregisterReader($scope.connection.writeWireConnector);
                    try {
                        $scope.connection.writeWire.write($scope.connection.writeWireConnector, 1);
                        $scope.$emit('gateWrite', $scope.connection.bus);
                    } catch (exception) {
                        $scope.connection.writeWire.registerReaderAndRead($scope.connection.writeWireConnector);
                        throw exception;
                    }
                } else {
                    $scope.$emit('gateWrite', $scope.connection.bus);
                }
            };

            $scope.deactivateWriteWire = function () {
                if ($scope.connection.writeWire) {
                    try {
                        $scope.connection.writeWire.write(connection.writeWireConnector, 0);
                    } catch (exception) {
                        throw exception;
                    } finally {
                        $scope.connection.writeWire.stopWriting($scope.connection.writeWireConnector);
                        $scope.connection.writeWire.registerReaderAndRead($scope.connection.writeWireConnector);
                    }
                }
                $scope.$emit('gateWriteDisconnected', $scope.connection.bus);
            };

            $scope.activateReadWire = function ($event) {
                if ($event) { $event.preventDefault(); }
                if ($scope.connection.readWire) {
                    $scope.connection.readWire.unregisterReader($scope.connection.readWireConnector);
                    try {
                        $scope.connection.readWire.write($scope.connection.readWireConnector, 1);
                        $scope.$emit('gateRead', $scope.connection.bus);
                        $timeout(function () {
                            $scope.connection.readWire.write($scope.connection.readWireConnector, 0);
                            $scope.connection.readWire.stopWriting($scope.connection.readWireConnector);
                            $scope.connection.readWire.registerReaderAndRead($scope.connection.readWireConnector);
                            $scope.$emit('gateReadDisconnected', $scope.connection.bus);
                        }, 0);
                    } catch (exception) {
                        $scope.connection.readWire.registerReaderAndRead($scope.connection.readWireConnector);
                        throw exception;
                    }
                } else {
                    $scope.$emit('gateRead', $scope.connection.bus);
                    $timeout(function () {
                        $scope.$emit('gateReadDisconnected', $scope.connection.bus);
                    }, 0);
                }
            };

            $scope.openSelector = function () {
                $scope.showSelector = true;
            };

            $scope.selectTop = function () {
                $scope.showSelector = undefined;
                if (!$scope.downwards) {
                    $scope.activateWriteWire();
                    $scope.deactivateReadWire();
                } else {
                    $scope.activateReadWire();
                    $scope.deactivateWriteWire();
                }
            };

            $scope.selectMiddle = function () {
                $scope.showSelector = undefined;
                $scope.deactivateReadWire();
                $scope.deactivateWriteWire();
            };

            $scope.selectBottom = function() {
                $scope.showSelector = undefined;
                if (!$scope.downwards) {
                    $scope.activateReadWire();
                    $scope.deactivateWriteWire();
                } else {
                    $scope.activateWriteWire();
                    $scope.deactivateReadWire();
                }
            };
        },
        templateUrl: '/partials/component_GateReadFlankWriteState.html'
    };
});