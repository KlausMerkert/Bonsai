'use strict';

bonsaiApp.directive('gateReadFlankWriteState', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            connection: '=',
            downwards: '='
        },
        controller: function ($scope, $timeout) {
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

            $scope.toggleState = function () {

            };
        },
        templateUrl: '/partials/component_GateReadFlankWriteState.html'
    };
});