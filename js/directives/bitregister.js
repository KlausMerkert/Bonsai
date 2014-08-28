'use strict';

bonsaiApp.directive('bitregister', function ($interval) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            value: '=',
            setWiresRead: '=',
            setWiresWrite: '=',
            registerName: '@',
            top: '=',
            left: '='
        },
        controller: function ($scope) {
            $scope.dataChangeCallback = function (newValue) {
                $scope.value = newValue;
            };

            $scope.wideGateState = 0;
            $scope.wireRead = true;
            $scope.wideBusStateChangeCallback = function (newStateValue) {
                if (!($scope.gateColorIteration > 0)) {
                    $scope.wideGateState = newStateValue;
                }
            };
            $scope.gateColor = 'rgb(200, 200, 200)';
            $scope.gateColorIteration = 0;

            $scope.register = new BitRegister(
                $scope.dataChangeCallback,
                $scope.registerName,
                $scope.value,
                $scope.wideBusStateChangeCallback
            );

            this.setBusConnection = function (bus, setWrite, setRead, initialState) {
                $scope.register.setWideBusConnection(bus, setWrite, setRead);
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
            };

            this.addWireConnection = function (wire) {
                $scope.register.addWireConnection(wire);
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
            };
            $scope.$watch('setWiresRead', $scope.setWiresWires);
            $scope.$watch('setWiresWrite', $scope.setWiresWires);

            attrs.$observe('registerName', function() {
                if ($scope.registerName) {
                    $scope.register.setName($scope.registerName);
                }
            });

            $scope.$watch('wideGateState', function (newState) {
                if (newState === -1) {
                    $scope.gateColor = 'rgb(122, 222, 103)';
                    $scope.gateColorIteration = 20;
                    $interval(function () {
                        $scope.gateColor =
                            'rgb(' + Math.floor(122 + (200 - 122) * (20 - $scope.gateColorIteration) / 20) +
                            ', ' + Math.floor((222 - 200) * $scope.gateColorIteration / 20 + 200) +
                            ', ' + Math.floor(103 + (200 - 103) * (20 - $scope.gateColorIteration) / 20) + ')';
                        if ($scope.gateColorIteration <= 0) {
                            $scope.register.setWideBusState(0);
                        }
                        $scope.gateColorIteration--;
                    }, 30, 21);
                } else if (newState === 1) {
                    $scope.gateColor = 'rgb(255, 103, 97)';
                } else {
                    $scope.gateColor = 'rgb(200, 200, 200)';
                }
            });

            $scope.$watch('value', function(newValue) {
                if (typeof newValue != 'undefined') {
                    if (newValue != $scope.register.getValue()) {
                        $scope.register.setValue(newValue);
                    }
                }
            });

            $scope.getBits = function () {
                var bits = [];
                for (var i = 0; i < $scope.register.getWires().length; i++) {
                    bits.push($scope.register.getBit(i));
                }
                return bits;
            };

            $scope.setWideBusState = function (desiredState) {
                window.getSelection().removeAllRanges(); // Hack to unselect the arrows to keep the color visible.
                $scope.register.setWideBusState(desiredState);
            };

            $scope.activateWireRead = function () {
                $scope.register.setBitGateToRead();
            };

            $scope.deactivateWireRead = function () {
                $scope.register.setBitGateToDisconnected();
            };

            $scope.activateWireWrite = function () {
                $scope.register.setBitGateToWrite();
            };

            $scope.deactivateWireWrite = function () {
                $scope.register.setBitGateToDisconnected();
            };

            $scope.activateWriteWire = function () {
                var connection = $scope.register.getWideBusConnection();
                if (connection.writeWire) {
                    connection.writeWire.unregisterReader(connection.writeWireConnector);
                    try {
                        connection.writeWire.write(connection.writeWireConnector, 1);
                        $scope.setState(1);
                    } catch (exception) {
                        connection.writeWire.registerReaderAndRead(connection.writeWireConnector);
                        throw exception;
                    }
                } else {
                    $scope.setWideBusState(1);
                }
            };

            $scope.deactivateWriteWire = function () {
                var connection = $scope.register.getWideBusConnection();
                if (connection.writeWire) {
                    try {
                        connection.writeWire.write(connection.writeWireConnector, 0);
                    } catch (exception) {
                        throw exception;
                    } finally {
                        connection.writeWire.stopWriting(connection.writeWireConnector);
                        connection.writeWire.registerReaderAndRead(connection.writeWireConnector);
                    }
                }
                $scope.setWideBusState(0);
            };

            $scope.activateReadWire = function () {
                var connection = $scope.register.getWideBusConnection();
                if (connection.readWire) {
                    connection.readWire.unregisterReader(connection.readWireConnector);
                    try {
                        connection.readWire.write(connection.readWireConnector, 1);
                        $scope.setWideBusState(-1);
                        $interval(function () {
                            connection.readWire.write(connection.readWireConnector, 0);
                            connection.readWire.stopWriting(connection.readWireConnector);
                            connection.readWire.registerReaderAndRead(connection.readWireConnector);
                            $scope.setWideBusState(0);
                        }, 0, 1);
                    } catch (exception) {
                        connection.readWire.registerReaderAndRead(connection.readWireConnector);
                        throw exception;
                    }
                } else {
                    $scope.setWideBusState(-1);
                    $interval(function () {
                        $scope.setWideBusState(0);
                    }, 0, 1);
                }
            };

            $scope.toggleWideBusState = function () {
                var stateFound = false;
                var desiredState = $scope.register.wideBusConnection.state + 1;
                while (!stateFound) {
                    if (desiredState > 1) {
                        desiredState = -1;
                    }
                    try {
                        $scope.setWideBusState(desiredState);
                        stateFound = true;
                    } catch (exception) {
                        desiredState++;
                    }
                }
            };

            $scope.toggleBitConnectionState = function () {
                var stateFound = false;
                var desiredState = $scope.register.bitWiresConnection.state - 1;
                while (!stateFound) {
                    if (desiredState < -1) {
                        desiredState = 1;
                    }
                    try {
                        $scope.register.setBitConnectionState(desiredState);
                        stateFound = true;
                    } catch (exception) {
                        desiredState--;
                    }
                }
            };

            $scope.activateBit = function (index) {
                var wires = $scope.register.getWires();
                if ((wires.length > index) && (wires[index].wire)) {
                    wires[index].wire.unregisterReader(wires[index].connector);
                    try {
                        wires[index].wire.write(wires[index].connector, 1);
                        $scope.register.setBit(index, 1);
                    } catch (exception) {
                        wires[index].wire.registerReaderAndRead(wires[index].connector);
                        throw exception;
                    }
                } else {
                    $scope.register.setBit(index, ($scope.register.getBit(index) + 1) % 2);
                }
            };

            $scope.deactivateBit = function (index) {
                var wires = $scope.register.getWires();
                if ((wires.length > index) && (wires[index].wire)) {
                    try {
                        wires[index].wire.write(wires[index].connector, 0);
                        $scope.register.setBit(index, 0);
                    } catch (exception) {
                        throw exception;
                    } finally {
                        wires[index].wire.stopWriting(wires[index].connector);
                        wires[index].wire.registerReaderAndRead(wires[index].connector);
                    }
                }
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

            // We have to wait for a very short time to enroll to the buses
            // because the handler needs to be fully initialized.
            $interval(function () {
                var connection = $scope.register.getWideBusConnection();
                connection.bus.enrollToDirective(
                    $scope.register,
                    $scope.getConnectionPositions
                );
                $scope.register.setWideBusState($scope.initialWideBusGateState);
                var writeWire = connection.writeWire;
                if (writeWire) {
                    connection.writeWireConnector = new ReadingControlWireConnector(writeWire,
                        function (wire) {
                            $scope.register.setToWrite(wire);
                        },
                        function (wire) {
                            $scope.register.setToDisconnected(wire);
                        }, $scope.registerName + ' write wire connector for bus ' + connection.bus.getName());
                    writeWire.enrollToDirective(
                        connection.writeWireConnector,
                        $scope.getWireConnectionPositions);
                    if (writeWire.registerReaderAndRead(connection.writeWireConnector)) {
                        $scope.register.setWideBusGateToWrite();
                    }
                }
                var readWire = connection.readWire;
                if (readWire) {
                    connection.readWireConnector = new ReadingControlWireConnector(readWire,
                        function (wire) {
                            $scope.register.setWideBusGateToRead();
                            $interval(function () {
                                $scope.register.setWideBusGateToDisconnected(wire);
                            }, 0, 1);
                        },
                        function () {
                        }, $scope.registerName + ' read wire connector for bus ' + connection.bus.getName());
                    readWire.enrollToDirective(connection.readWireConnector, $scope.getWireConnectionPositions);
                    if (readWire.registerReaderAndRead(connection.readWireConnector)) {
                        $scope.register.setWideBusGateToRead();
                    }
                }
                var bitWires = $scope.register.getWires();
                for (var i = 0; i < bitWires.length; i++) {
                    if (bitWires[i].wire) {
                        bitWires[i].connector = new ReadingControlWireConnector(bitWires[i].wire,
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
                            }, $scope.registerName + ' bit connector no ' + i + ' for ' + bitWires[i].wire.getName());
                        bitWires[i].wire.enrollToDirective(
                            bitWires[i].connector,
                            $scope.getWireConnectionPositions
                        );
                        var wireValue = bitWires[i].wire.registerReaderAndRead(bitWires[i].connector);
                        if (typeof wireValue != 'undefined') {
                            $scope.setBit(bitWires[i].wire, parseInt(wireValue));
                        }
                    }
                }
                if ($scope.register.bitWiresConnection.writeWire) {
                    $scope.register.bitWiresConnection.writeWireConnector = new ReadingControlWireConnector(
                        $scope.register.bitWiresConnection.writeWire,
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
                    $scope.register.bitWiresConnection.writeWire.enrollToDirective(
                        $scope.register.bitWiresConnection.writeWireConnector,
                        $scope.getWireConnectionPositions
                    );
                    if ($scope.register.bitWiresConnection.writeWire.registerReaderAndRead(
                        $scope.register.bitWiresConnection.writeWireConnector
                    )) {
                        $scope.register.setBitGateToWrite();
                    }
                }
                if ($scope.register.bitWiresConnection.readWire) {
                    $scope.register.bitWiresConnection.readWireConnector = new ReadingControlWireConnector(
                        $scope.register.bitWiresConnection.readWire,
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
                    $scope.register.bitWiresConnection.readWire.enrollToDirective(
                        $scope.register.bitWiresConnection.readWireConnector,
                        $scope.getWireConnectionPositions
                    );
                    if ($scope.register.bitWiresConnection.readWire.registerReaderAndRead(
                        $scope.register.bitWiresConnection.readWireConnector
                    )) {
                        $scope.register.setBitGateToRead();
                    }
                }
            }, 1, 1);
        },
        templateUrl: 'partials/component_BitRegister.html'
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

