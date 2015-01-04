'use strict';

bonsaiApp.directive('bitGateState', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            connection: '=',
            count: '=',
            right: '=',
            disableWrite: '=',
            disableRead: '='
        },
        controller: function ($scope, $timeout) {
            $scope.range = function (count) {
                var arr = [];
                for (var i = 0; i < count; i++) {
                    arr.push(i);
                }
                return arr;
            };

            $scope.activateWriteWire = function ($event) {
                if ($event) {
                    $event.preventDefault();
                }
                if ($scope.connection.writeWire) {
                    $scope.connection.writeWire.unregisterReader($scope.connection.writeWireConnector);
                    try {
                        $scope.connection.writeWire.write($scope.connection.writeWireConnector, 1);
                        $scope.$emit('gateWrite', $scope.connection.wires);
                    } catch (exception) {
                        $scope.connection.writeWire.stopWriting($scope.connection.writeWireConnector);
                        $scope.connection.writeWire.registerReaderAndRead($scope.connection.writeWireConnector);
                        throw exception;
                    }
                } else {
                    $scope.$emit('gateWrite', $scope.connection.wires);
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
                $scope.$emit('gateWriteDisconnected', $scope.connection.wires);
            };

            $scope.activateReadWire = function ($event) {
                if ($event) {
                    $event.preventDefault();
                }
                if ($scope.connection.readWire) {
                    $scope.connection.readWire.unregisterReader($scope.connection.readWireConnector);
                    try {
                        $scope.connection.readWire.write($scope.connection.readWireConnector, 1);
                        $scope.$emit('gateRead', $scope.connection.wires);
                    } catch (exception) {
                        $scope.connection.readWire.stopWriting($scope.connection.readWireConnector);
                        $scope.connection.readWire.registerReaderAndRead($scope.connection.readWireConnector);
                        throw exception;
                    }
                } else {
                    $scope.$emit('gateRead', $scope.connection.wires);
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
                $scope.$emit('gateReadDisconnected', $scope.connection.wires);
            };

            $scope.$on('connectionStateChange', function (event, connection) {
                $timeout(function () {
                    if ($scope.connection == connection) {
                        if (connection.state == 1) {
                            $scope.deactivateReadWire();
                            $scope.activateWriteWire();
                        } else if (connection.state == -1) {
                            $scope.deactivateWriteWire();
                            $scope.activateReadWire();
                        } else {
                            $scope.deactivateWriteWire();
                            $scope.deactivateReadWire();
                        }
                    }
                }, 0);
            });

            $scope.activateBit = function (index, $event) {
                if ($event) {
                    $event.preventDefault();
                }
                if (($scope.connection.wires.length > index) && ($scope.connection.wires[index].wire)) {
                    $scope.connection.wires[index].wire.unregisterReader($scope.connection.wires[index].connector);
                    try {
                        $scope.connection.wires[index].wire.write($scope.connection.wires[index].connector, 1);
                        $scope.$emit('gateActivateBit', index);
                    } catch (exception) {
                        $scope.connection.wires[index].wire.registerReaderAndRead(
                            $scope.connection.wires[index].connector);
                        throw exception;
                    }
                } else {
                    $scope.$emit('gateActivateBit', index);
                }
            };

            $scope.deactivateBit = function (index) {
                if ($scope.connection.wires.length > index) {
                    if ($scope.connection.wires[index].wire) {
                        try {
                            $scope.connection.wires[index].wire.write($scope.connection.wires[index].connector, 0);
                            $scope.$emit('gateDeactivateBit', index);
                        } catch (exception) {
                            throw exception;
                        } finally {
                            $scope.connection.wires[index].wire.stopWriting(
                                $scope.connection.wires[index].connector);
                            $scope.connection.wires[index].wire.registerReaderAndRead(
                                $scope.connection.wires[index].connector);
                        }
                    } else {
                        $scope.$emit('gateDeactivateBit', index);
                    }
                }
            };

            $scope.openSelector = function () {
                $scope.showSelector = true;
            };

            $scope.selectLeft = function () {
                $scope.showSelector = undefined;
                if (!$scope.right) {
                    $scope.activateWriteWire();
                } else {
                    $scope.activateReadWire();
                }
            };

            $scope.selectMiddle = function () {
                $scope.showSelector = undefined;
                $scope.deactivateReadWire();
                $scope.deactivateWriteWire();
            };

            $scope.selectRight = function() {
                $scope.showSelector = undefined;
                if (!$scope.right) {
                    $scope.activateReadWire();
                } else {
                    $scope.activateWriteWire();
                }
            };
        },
        templateUrl: '/partials/component_BitGateState.html'
    };
});