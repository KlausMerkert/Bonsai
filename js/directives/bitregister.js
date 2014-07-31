'use strict';

bonsaiApp.directive('bitregister', function ($interval) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            value: '=',
            registerName: '@',
            top: '=',
            left: '='
        },
        controller: function ($scope) {
            $scope.dataChangeCallback = function (newValue) {
                $scope.value = newValue;
            };

            $scope.state = 0;
            $scope.stateChangeCallback = function (newStateValue) {
                if (!($scope.gateColorIteration > 0)) {
                    $scope.state = newStateValue;
                }
            };
            $scope.gateColor = 'rgb(200, 200, 200)';
            $scope.gateColorIteration = 0;

            $scope.register = new BitRegister(
                $scope.dataChangeCallback,
                $scope.registerName,
                $scope.value,
                $scope.stateChangeCallback
            );

            this.setBusConnection = function (bus, setWrite, setRead) {
                $scope.register.setWideBusConnection(bus, setWrite, setRead);
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
                $scope.leftCSS = $scope.left + 'px';
            });

            $scope.toggleState = function () {
                var stateFound = false;
                var desiredState = $scope.register.state - 1;
                while (!stateFound) {
                    if (desiredState < -1) {
                        desiredState = 1;
                    }
                    try {
                        $scope.setState(desiredState);
                        $scope.register.state = desiredState;
                        stateFound = true;
                    } catch (exception) {
                        desiredState--;
                    }
                }
            };

            attrs.$observe('registerName', function() {
                if ($scope.registerName) {
                    $scope.register.setName($scope.registerName);
                }
            });

            $scope.$watch('state', function (newState) {
                if (newState === -1) {
                    $scope.gateColor = 'rgb(122, 222, 103)';
                    $scope.gateColorIteration = 20;
                    $interval(function () {
                        $scope.gateColor =
                            'rgb(' + Math.floor(122 + (200 - 122) * (20 - $scope.gateColorIteration) / 20) +
                            ', ' + Math.floor((222 - 200) * $scope.gateColorIteration / 20 + 200) +
                            ', ' + Math.floor(103 + (200 - 103) * (20 - $scope.gateColorIteration) / 20) + ')';
                        if ($scope.gateColorIteration <= 0) {
                            $scope.state = 0;
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
                    $scope.updateWires(false);
                }
            });

            $scope.updateWires = function (throwException) {
                var wires = $scope.register.getWires();
                for (var i = 0; i < wires.length; i++) {
                    if ($scope.register.state === 1) {
                        wires[i].wire.stopWriting(wires[i].connector);
                        wires[i].wire.registerReaderAndRead(wires[i].connector);
                    } else {
                        if ($scope.register.getBit(i)) {
                            try {
                                wires[i].wire.write(wires[i].connector, 1);
                            } catch (exception) {
                                wires[i].wire.registerReaderAndRead(wires[i].connector);
                                if (throwException) {
                                    throw exception;
                                }
                            }
                        } else {
                            try {
                                wires[i].wire.write(wires[i].connector, 0);
                            } catch (exception) {
                                if (throwException) {
                                    throw exception;
                                }
                            } finally {
                                wires[i].wire.stopWriting(wires[i].connector);
                                wires[i].wire.registerReaderAndRead(wires[i].connector);
                            }
                        }
                    }
                }
            };

            $scope.getBits = function () {
                var bits = [];
                for (var i = 0; i < $scope.register.getWires().length; i++) {
                    bits.push($scope.register.getBit(i));
                }
                return bits;
            };

            $scope.setState = function (desiredState) {
                window.getSelection().removeAllRanges(); // Hack to unselect the arrows to keep the color visible.
                $scope.register.setState(desiredState);
                $scope.updateWires(true);
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
                    $scope.setState(1);
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
                $scope.setState(0);
            };

            $scope.activateReadWire = function () {
                var connection = $scope.register.getWideBusConnection();
                if (connection.readWire) {
                    connection.readWire.unregisterReader(connection.readWireConnector);
                    try {
                        connection.readWire.write(connection.readWireConnector, 1);
                        $scope.setState(-1);
                        $interval(function () {
                            connection.readWire.write(connection.readWireConnector, 0);
                            connection.readWire.stopWriting(connection.readWireConnector);
                            connection.readWire.registerReaderAndRead(connection.readWireConnector);
                            $scope.setState(0);
                        }, 0, 1);
                    } catch (exception) {
                        connection.readWire.registerReaderAndRead(connection.readWireConnector);
                        throw exception;
                    }
                } else {
                    $scope.setState(-1);
                    $interval(function () {
                        $scope.setState(0);
                    }, 0, 1);
                }
            };

            $scope.activateBit = function (index) {
                var wires = $scope.register.getWires();
                if ((wires.length > index) && (wires[index].wire)) {
                    wires[index].wire.unregisterReader(wires[index].connector);
                    try {
                        wires[index].wire.write(wires[index].connector, 1);
                        $scope.register.setBit(index, ($scope.register.getBit(index) + 1) % 2);
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
                if ((wires.length > index) && (wires[index].wire) && (!$scope.register.getBit(index))) {
                    try {
                        wires[index].wire.write(wires[index].connector, 0);
                    } catch (exception) {
                        throw exception;
                    } finally {
                        wires[index].wire.stopWriting(wires[index].connector);
                        wires[index].wire.registerReaderAndRead(wires[index].connector);
                    }
                }
            };

            $scope.toggleBit = function (wire) {
                var wires = $scope.register.getWires();
                for (var i = 0; i < wires.length; i++) {
                    if (wires[i].wire === wire) {
                        $scope.register.setBit(i, ($scope.register.getBit(i) + 1) % 2);
                        break;
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
                var writeWire = connection.writeWire;
                if (writeWire) {
                    connection.writeWireConnector = new ReadingControlWireConnector(writeWire,
                        function (wire) {
                            $scope.register.setToWrite(wire);
                            $scope.updateWires(true);
                        },
                        function (wire) {
                            $scope.register.setToDisconnected(wire);
                            $scope.updateWires(true);
                        }, $scope.registerName + ' write wire connector for bus ' + connection.bus.getName());
                    writeWire.enrollToDirective(
                        connection.writeWireConnector,
                        $scope.getWireConnectionPositions);
                    if (writeWire.registerReaderAndRead(connection.writeWireConnector)) {
                        $scope.register.setToWrite(writeWire);
                    }
                }
                var readWire = connection.readWire;
                if (readWire) {
                    connection.readWireConnector = new ReadingControlWireConnector(readWire,
                        function (wire) {
                            $scope.register.setToRead(wire);
                            $interval(function () {
                                $scope.register.setToDisconnected(wire);
                                $scope.updateWires(true);
                            }, 0, 1);
                        },
                        function () {
                        }, $scope.registerName + ' read wire connector for bus ' + connection.bus.getName());
                    readWire.enrollToDirective(connection.readWireConnector, $scope.getWireConnectionPositions);
                    if (readWire.registerReaderAndRead(connection.readWireConnector)) {
                        $scope.register.setToRead(readWire);
                    }
                }
                var bitWires = $scope.register.getWires();
                for (var i = 0; i < bitWires.length; i++) {
                    if (bitWires[i].wire) {
                        bitWires[i].connector = new ReadingControlWireConnector(bitWires[i].wire,
                            function (wire) {
                                $scope.toggleBit(wire);
                            },
                            function () {
                                $scope.updateWires(false);
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
                $scope.updateWires();
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
            setRead: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.setBusConnection($scope.bus, $scope.setWrite, $scope.setRead);
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

