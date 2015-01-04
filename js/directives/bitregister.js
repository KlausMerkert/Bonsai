'use strict';

bonsaiApp.directive('bitregister', function ($interval) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            value: '=',
            setWiresRead: '=',
            setWiresWrite: '=',
            wireGateState: '=',
            bitWidth: '=',
            registerName: '@',
            top: '=',
            left: '='
        },
        controller: function ($scope) {
            $scope.dataChangeCallback = function (newValue) {
                $scope.value = newValue;
            };

            $scope.wireRead = true;
            $scope.wideBusStateChangeCallback = function (newStateValue) {
                $scope.$broadcast('busChangeCallback',
                    {bus: $scope.register.getWideBusConnection().bus, value: newStateValue});
            };

            $scope.register = new BitRegister(
                $scope.dataChangeCallback,
                $scope.registerName,
                $scope.value,
                $scope.wideBusStateChangeCallback,
                $scope.bitWidth
            );

            $scope.bitConnection = {wires: [], state: 0};

            this.setBusConnection = function (bus, setWrite, setRead, initialState) {
                $scope.register.setWideBusConnection(bus, setWrite, setRead);
                if (bus) {
                    bus.enrollToDirective(
                        $scope.register,
                        $scope.getConnectionPositions
                    );
                }
                if (setWrite) {
                    var writeWireConnector = new ReadingControlWireConnector(setWrite,
                        function (wire) {
                            $scope.register.setToWrite(wire);
                        },
                        function (wire) {
                            $scope.register.setToDisconnected(wire);
                        }, $scope.registerName + ' write wire connector for bus ' + bus.getName());
                    $scope.register.getWideBusConnection().writeWireConnector = writeWireConnector;
                    setWrite.enrollToDirective(
                        writeWireConnector,
                        $scope.getWireConnectionPositions);
                    setWrite.registerReaderAndRead(writeWireConnector);
                }
                if (setRead) {
                    var readWireConnector = new ReadingControlWireConnector(setRead,
                        function (wire) {
                            $scope.register.setWideBusGateToRead();
                            $interval(function () {
                                $scope.register.setWideBusGateToDisconnected(wire);
                            }, 0, 1);
                        },
                        function () {
                        }, $scope.registerName + ' read wire connector for bus ' + bus.getName());
                    $scope.register.getWideBusConnection().readWireConnector = readWireConnector;
                    setRead.enrollToDirective(readWireConnector, $scope.getWireConnectionPositions);
                    setRead.registerReaderAndRead(readWireConnector);
                }
                initialState = parseInt(initialState);
                if (!initialState) {
                    initialState = 0;
                }
                if (initialState < 0) {
                    initialState = -1;
                } else if (initialState > 0) {
                    initialState = 1;
                }
                $scope.initialWideBusGateState = initialState;
                $scope.wideBusConnection = $scope.register.getWideBusConnection();
            };

            this.addWireConnection = function (wire) {
                var connection = $scope.register.addWireConnection(wire);
                if (wire) {
                    connection.connector = new ReadingControlWireConnector(wire,
                        function (wire) {
                            if ($scope.register.bitWiresConnection.state == -1) {
                                if (wire.isActive() && wire.isNotZero()) {
                                    var allWires = $scope.register.getWires();
                                    for (var k = 0; k < allWires.length; k++) {
                                        if (allWires[k].wire === wire) {
                                            $scope.register.setBit(k, 1);
                                        }
                                    }
                                }
                            }
                        },
                        function (wire) {
                            if ($scope.register.bitWiresConnection.state == -1) {
                                var allWires = $scope.register.getWires();
                                for (var k = 0; k < allWires.length; k++) {
                                    if (allWires[k].wire === wire) {
                                        $scope.register.setBit(k, 0);
                                    }
                                }
                            }
                        }, $scope.registerName + ' bit connector no ' + $scope.register.getWires().length + ' for ' + wire.getName());
                    wire.enrollToDirective(
                        connection.connector,
                        $scope.getWireConnectionPositions
                    );
                    wire.registerReaderAndRead(connection.connector);
                }
                $scope.bitConnection = $scope.register.getBitConnection();
            };
        },
        link: function ($scope, element, attrs) {
            $scope.$watch('top', function () {
                $scope.topCSS = $scope.top + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = ($scope.left + 16) + 'px';
            });

            $scope.setWiresWires = function () {
                $scope.register.setBitConnectionControlWires($scope.setWiresRead, $scope.setWiresWrite);
                $scope.bitConnection = $scope.register.getBitConnection();
            };
            $scope.$watch('setWiresRead', $scope.setWiresWires);
            $scope.$watch('setWiresWrite', $scope.setWiresWires);

            attrs.$observe('registerName', function() {
                if ($scope.registerName) {
                    $scope.register.setName($scope.registerName);
                }
            });

            $scope.$watch('value', function(newValue) {
                if (typeof newValue != 'undefined') {
                    if (newValue != $scope.register.getValue()) {
                        $scope.register.setValue(newValue);
                    }
                }
            });

            $scope.$watch('setWiresRead', function (newWire, oldWire) {
                if (oldWire && (newWire != oldWire)) {
                    oldWire.resign($scope.register.bitWiresConnection.readWireConnector);
                }
                if (newWire) {
                    $scope.register.bitWiresConnection.readWireConnector = new ReadingControlWireConnector(
                        newWire,
                        function (wire) {
                            if (wire.isActive() && wire.isNotZero()) {
                                $scope.register.setBitGateToRead();
                            }
                        },
                        function () {
                            if (!($scope.register.bitWiresConnection.writeWire.isActive() &&
                                $scope.register.bitWiresConnection.writeWire.isNotZero())) {
                                $scope.register.setBitGateToDisconnected();
                            }
                        },
                        $scope.registerName + ' read wire connector for bit connections'
                    );
                    newWire.enrollToDirective(
                        $scope.register.bitWiresConnection.readWireConnector,
                        $scope.getWireConnectionPositions
                    );
                    $scope.register.bitWiresConnection.readWire.registerReaderAndRead(
                        $scope.register.bitWiresConnection.readWireConnector
                    );
                }
                $scope.bitConnection = $scope.register.getBitConnection();
                $scope.wiresReadInitialized = true;
                $scope.checkForFinishedInitialization();
            });

            $scope.$watch('setWiresWrite', function (newWire, oldWire) {
                if (oldWire && (newWire != oldWire)) {
                    oldWire.resign($scope.register.bitWiresConnection.writeWireConnector);
                }
                if (newWire) {
                    $scope.register.bitWiresConnection.writeWireConnector = new ReadingControlWireConnector(
                        newWire,
                        function (wire) {
                            if (wire.isActive() && wire.isNotZero()) {
                                $scope.register.setBitGateToWrite();
                            }
                        },
                        function () {
                            if (!($scope.register.bitWiresConnection.readWire.isActive() &&
                                $scope.register.bitWiresConnection.readWire.isNotZero())) {
                                $scope.register.setBitGateToDisconnected();
                            }
                        },
                        $scope.registerName + ' write wire connector for bit connections'
                    );
                    newWire.enrollToDirective(
                        $scope.register.bitWiresConnection.writeWireConnector,
                        $scope.getWireConnectionPositions
                    );
                    $scope.register.bitWiresConnection.writeWire.registerReaderAndRead(
                        $scope.register.bitWiresConnection.writeWireConnector
                    );
                }
                $scope.bitConnection = $scope.register.getBitConnection();
                $scope.wiresWriteInitialized = true;
                $scope.checkForFinishedInitialization();
            });

            $scope.$watch('wireGateState', function (newValue, oldValue) {
                var state = parseInt(newValue);
                if (!state) {
                    state = 0;
                }
                if (state < 0) {
                    state = -1;
                } else if (state > 0) {
                    state = 1;
                }
                if (!parseInt(oldValue) || parseInt(oldValue) < -1 || parseInt(oldValue) > 1) {
                    $scope.wireGateState = state;
                }
                if (state == 1) {
                    $scope.register.setBitGateToWrite();
                } else if (state == -1) {
                    $scope.register.setBitGateToRead();
                } else {
                    $scope.register.setBitGateToDisconnected();
                }
                $scope.bitConnection = $scope.register.getBitConnection();
                $scope.$broadcast('connectionStateChange', $scope.bitConnection);
            });

            $scope.$watch('bitWidth', function (newWidth) {
                $scope.register.setBitWidth(newWidth);
                $scope.bitConnection = $scope.register.getBitConnection();
            });

            $scope.getBits = function () {
                var bits = [];
                for (var i = 0; i < $scope.register.getWires().length; i++) {
                    bits.push($scope.register.getBit(i));
                }
                return bits;
            };

            $scope.$on('gateRead', function (event, bus) {
                if (($scope.wideBusConnection) && ($scope.wideBusConnection.bus == bus)) {
                    $scope.register.setWideBusState(-1);
                }
                if (($scope.bitConnection) && ($scope.bitConnection.wires == bus)) {
                    $scope.register.setBitGateToRead();
                }
                event.stopPropagation();
            });

            $scope.$on('gateReadDisconnected', function (event, bus) {
                if (($scope.wideBusConnection) && ($scope.wideBusConnection.bus == bus)) {
                    $scope.register.setWideBusState(0);
                }
                if (($scope.bitConnection) && ($scope.bitConnection.wires == bus)) {
                    $scope.register.setBitGateToDisconnected();
                }
                event.stopPropagation();
            });

            $scope.$on('gateWrite', function (event, bus) {
                if (($scope.wideBusConnection) && ($scope.wideBusConnection.bus == bus)) {
                    $scope.register.setWideBusState(1);
                }
                if (($scope.bitConnection) && ($scope.bitConnection.wires == bus)) {
                    $scope.register.setBitGateToWrite();
                }
                event.stopPropagation();
            });

            $scope.$on('gateWriteDisconnected', function (event, bus) {
                if (($scope.wideBusConnection) && ($scope.wideBusConnection.bus == bus)) {
                    $scope.register.setWideBusState(0);
                }
                if (($scope.bitConnection) && ($scope.bitConnection.wires == bus)) {
                    $scope.register.setBitGateToDisconnected();
                }
                event.stopPropagation();
            });

            $scope.$on('gateActivateBit', function (event, index) {
                $scope.register.setBit(index, 1);
                event.stopPropagation();
            });

            $scope.$on('gateDeactivateBit', function (event, index) {
                $scope.register.setBit(index, 0);
                event.stopPropagation();
            });

            $scope.toggleBit = function (index) {
                $scope.register.setBit(index, ($scope.register.getBit(index) + 1) % 2)
            };

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top-19, left: $scope.left+31}];
            };

            $scope.getWireConnectionPositions = function (wire) {
                var positions = [];
                var connection = $scope.register.getWideBusConnection();
                if ((connection.writeWire) && (connection.writeWire === wire)) {
                    positions.push({top: $scope.top-11, left: $scope.left+40});
                }
                if ((connection.readWire) && (connection.readWire === wire)) {
                    positions.push({top: $scope.top-5, left: $scope.left+40});
                }
                if (($scope.register.bitWiresConnection.writeWire) &&
                    ($scope.register.bitWiresConnection.writeWire === wire)) {
                    positions.push({top: $scope.top+2, left: $scope.left+5});
                }
                if (($scope.register.bitWiresConnection.readWire) &&
                    ($scope.register.bitWiresConnection.readWire === wire)) {
                    positions.push({top: $scope.top+2, left: $scope.left+13});
                }
                var bitWires = $scope.register.getWires();
                for (var i = 0; i < bitWires.length; i++) {
                    if ((bitWires[i].wire) && (bitWires[i].wire === wire)) {
                        positions.push({top: $scope.top+12+i*12, left: $scope.left-2});
                    }
                }
                return positions;
            };

            $scope.checkForFinishedInitialization = function () {
                if (($scope.controllerIsRead) &&
                    ($scope.wiresReadInitialized) &&
                    ($scope.wiresWriteInitialized)) {
                    $scope.$emit('componentInitialized', $scope.register);
                }
            };

            $scope.$on('sendInitialValues', function () {
                $scope.register.setWideBusState($scope.initialWideBusGateState);
            });

            $scope.controllerIsRead = true;
            $scope.checkForFinishedInitialization();
        },
        templateUrl: '/partials/component_BitRegister.html'
    };
});

bonsaiApp.directive('widegate', function () {
    return {
        require: '^bitregister',
        restrict: 'E',
        scope: {
            bus: '=',
            setWrite: '=',
            setRead: '=',
            initialState: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.setBusConnection($scope.bus, $scope.setWrite, $scope.setRead, $scope.initialState);
        },
        template: ''
    };
});

bonsaiApp.directive('wiregate', function () {
    return {
        require: '^bitregister',
        restrict: 'E',
        scope: {
            wire: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.addWireConnection($scope.wire);
        },
        template: ''
    };
});

