'use strict';

bonsaiApp.directive('gateState', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            connection: '=',
            downwards: '=',
            disableWrite: '=',
            disableRead: '='
        },
        controller: function ($scope) {
            $scope.activateWriteWire = function ($event) {
                $event.preventDefault();
                if ($scope.connection.writeWire) {
                    $scope.connection.writeWire.unregisterReader($scope.connection.writeWireConnector);
                    try {
                        $scope.connection.writeWire.write($scope.connection.writeWireConnector, 1);
                        $scope.$emit('gateWrite', $scope.connection.bus);
                    } catch (exception) {
                        $scope.connection.writeWire.stopWriting($scope.connection.writeWireConnector);
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
                        $scope.connection.writeWire.write($scope.connection.writeWireConnector, 0);
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
                $event.preventDefault();
                if ($scope.connection.readWire) {
                    $scope.connection.readWire.unregisterReader($scope.connection.readWireConnector);
                    try {
                        $scope.connection.readWire.write($scope.connection.readWireConnector, 1);
                        $scope.$emit('gateRead', $scope.connection.bus);
                    } catch (exception) {
                        $scope.connection.readWire.stopWriting($scope.connection.readWireConnector);
                        $scope.connection.readWire.registerReaderAndRead($scope.connection.readWireConnector);
                        throw exception;
                    }
                } else {
                    $scope.$emit('gateRead', $scope.connection.bus);
                }
            };

            $scope.deactivateReadWire = function () {
                if ($scope.connection.readWire) {
                    try {
                        $scope.connection.readWire.write($scope.connection.readWireConnector, 0);
                    } catch (exception) {
                        throw exception;
                    } finally {
                        $scope.connection.readWire.stopWriting($scope.connection.readWireConnector);
                        $scope.connection.readWire.registerReaderAndRead($scope.connection.readWireConnector);
                    }
                }
                $scope.$emit('gateReadDisconnected', $scope.connection.bus);
            };

            $scope.toggleState = function () {

            };
        },
        templateUrl: '/partials/component_GateState.html'
    };
});