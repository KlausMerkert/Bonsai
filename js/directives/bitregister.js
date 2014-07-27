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
        controller: function ($scope, $filter) {
            $scope.dataChangeCallback = function (newValue) {
                $scope.value = $filter('binary')(newValue);
            };

            $scope.register = new BitRegister(
                $scope.dataChangeCallback,
                $scope.registerName,
                $scope.value
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

            $scope.$watch('value', function(newValue, oldValue) {
                if (newValue != undefined) {
                    newValue = String(newValue);
                    if (newValue.match(/[0,1]*/)[0] === newValue) {
                        var convertedValue = 0;
                        for (var i = 1; i <= newValue.length; i++) {
                            convertedValue += parseInt(newValue[i - 1]) * Math.pow(2, newValue.length - i);
                        }
                        $scope.register.setValue(convertedValue);
                    } else {
                        $scope.value = oldValue;
                    }
                }
            });

            $scope.getBits = function () {
                return [1,0,1,1,0,1,0,0,1];
            };

            $scope.setState = function (desiredState) {
                window.getSelection().removeAllRanges(); // Hack to unselect the arrows to keep the color visible.
                $scope.register.setState(desiredState);
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
                    } catch (exception) {
                        connection.readWire.registerReaderAndRead(connection.readWireConnector);
                        throw exception;
                    }
                } else {
                    $scope.setState(-1);
                }
            };

            $scope.deactivateReadWire = function () {
                var connection = $scope.register.getWideBusConnection();
                if (connection.readWire) {
                    try {
                        connection.readWire.write(connection.readWireConnector, 0);
                    } catch (exception) {
                        throw exception;
                    } finally {
                        connection.readWire.stopWriting(connection.readWireConnector);
                        connection.readWire.registerReaderAndRead(connection.readWireConnector);
                    }
                }
                $scope.setState(0);
            };

            $scope.activateBit = function (index) {

            };

            $scope.deactivateBit = function (index) {

            };

            $scope.setBit = function (value) {

            };

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top-19, left: $scope.left+17}];
            };

            $scope.getWireConnectionPositions = function (wire) {
                var positions = [];
                var connection = $scope.register.getWideBusConnection();
                if ((connection.writeWire) && (connection.writeWire === wire)) {
                    positions.push({top: $scope.top-13, left: $scope.left+43});
                }
                if ((connection.readWire) && (connection.readWire === wire)) {
                    positions.push({top: $scope.top-7, left: $scope.left+43});
                }
                var bitWires = $scope.register.getWires();
                for (var i = 0; i < bitWires.length; i++) {
                    if ((bitWires[i].wire) && (bitWires[i].wire === wire)) {
                        positions.push({top: $scope.top+12+i*10, left: $scope.left-2});
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
                        },
                        function (wire) {
                            $scope.register.setToDisconnected(wire);
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
                        },
                        function (wire) {
                            $scope.register.setToDisconnected(wire);
                        }, $scope.registerName + ' read wire connector for bus ' + connection.bus.getName());
                    readWire.enrollToDirective(connection.readWireConnector, $scope.getWireConnectionPositions);
                    if (readWire.registerReaderAndRead(connection.readWireConnector)) {
                        $scope.register.setToRead(readWire);
                    }
                }
                var bitWires = $scope.register.getWires();
                for (var i = 0; i < bitWires.length; i++) {
                    if (bitWires[i].wire) {
                        bitWires[i].wireConnector = new ReadingControlWireConnector(bitWires[i].wire,
                            function (wire) {
                                $scope.setBit(wire, 1);
                            },
                            function (wire) {
                                $scope.setBit(wire, 0);
                            }, $scope.registerName + ' bit connector no ' + i + ' for ' + bitWires[i].wire.getName());
                        bitWires[i].wire.enrollToDirective(
                            bitWires[i].wireConnector,
                            $scope.getWireConnectionPositions
                        );
                        $scope.setBit(
                            bitWires[i].wire,
                            bitWires[i].wire.registerReaderAndRead(bitWires[i].wireConnector)
                        );
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

