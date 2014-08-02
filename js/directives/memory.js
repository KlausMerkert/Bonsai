'use strict';

bonsaiApp.directive('memory', function ($interval) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            memoryName: '@',
            base: '=',
            top: '=',
            left: '=',
            content: '='
        },
        controller: function ($scope, $filter) {
            if (parseInt($scope.base) in {2:true, 8:true, 10:true, 16:true}) {
                $scope.displayBase = $scope.base;
            } else {
                $scope.displayBase = 10;
            }

            /* The dataContext is a list of 5 address-value pairs which in the following order:
             * two addresses before the current one and the corresponding values
             * the current address and the value
             * the next two addresses and the corresponding values */
            $scope.setDataContextToUndefined = function () {
                $scope.dataContext = [
                    {"addressBus": undefined, 'value': undefined},
                    {"addressBus": undefined, 'value': undefined},
                    {"addressBus": undefined, 'value': undefined},
                    {"addressBus": undefined, 'value': undefined},
                    {"addressBus": undefined, 'value': undefined}
                ];
            };
            $scope.setDataContextToUndefined();

            $scope.dataChangeCallback = function (dataContext) {
                $scope.dataContext = dataContext;
            };

            $scope.contentChangeCallback = function (content) {
                // We have to convert the associative array from the Memory to a multi line string.
                var lines = [''];
                var keys = Object.keys(content);
                for (var i = 0; i < keys.length; i++) {
                    while (parseInt(keys[i]) >= lines.length) {
                        lines.push('');
                    }
                    lines[parseInt(keys[i])] = content[keys[i]];
                }
                $scope.content = lines.join("\n");
            };

            $scope.memory = new Memory($scope.dataChangeCallback, $scope.contentChangeCallback, $scope.registerName);
            $scope.topCSS = $scope.top + 'px';
            $scope.leftCSS = $scope.left + 'px';
            $scope.addressBusColor = 'rgb(122, 0, 0)';
            $scope.dataBusColor = 'rgb(0, 0, 0)';

            this.setAddressBusConnection = function (bus, setRead) {
                $scope.memory.setAddressBusConnection(bus, setRead);
                if (($scope.memory.addressBus) && ($scope.memory.addressBus.bus.getColor)) {
                    $scope.addressBusColor = $scope.memory.addressBus.bus.getColor();
                }
            };

            this.setAddressBusConnectionState = function (state) {
                state = parseInt(state);
                if (!state) {
                    state = 0;
                }
                if (state < 0) {
                    state = -1;
                } else if (state > 0) {
                    state = 0;
                }
                $scope.initialAddressBusState = state;
            };

            this.setDataBusConnection = function (bus, setWrite, setRead) {
                $scope.memory.setDataBusConnection(bus, setWrite, setRead);
                if (($scope.memory.dataBus) && ($scope.memory.dataBus.bus.getColor)) {
                    $scope.dataBusColor = $scope.memory.dataBus.bus.getColor();
                }
            };

            this.setDataBusConnectionState = function (state) {
                state = parseInt(state);
                if (!state) {
                    state = 0;
                }
                if (state < 0) {
                    state = -1;
                } else if (state > 0) {
                    state = 1;
                }
                $scope.initialDataBusState = state;
            };
        },
        link: function ($scope, element, attrs) {
            attrs.$observe('memoryName', function() {
                if ($scope.memoryName) {
                    $scope.memory.setName($scope.memoryName);
                }
            });

            $scope.$watch('content', function () {
                if ($scope.content) {
                    // We have to convert the multi line string to an associative array.
                    var lines = $scope.content.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
                    var arrayContent = {};
                    for (var i = 0; i < lines.length; i++) {
                        if (lines[i].length) {
                            arrayContent[i] = parseInt(lines[i]);
                        } else {
                            arrayContent[i] = undefined;
                        }
                    }
                    $scope.memory.setContent(arrayContent)
                }
            });

            $scope.isUndefined = function (value) {
                return typeof value == 'undefined';
            };

            $scope.activateAddressBusRead = function () {
                if ($scope.memory.addressBus.readWire) {
                    $scope.memory.addressBus.readWire.unregisterReader(
                        $scope.memory.addressBus.readWireConnector
                    );
                    try {
                        $scope.memory.addressBus.readWire.write(
                            $scope.memory.addressBus.readWireConnector,
                            1
                        );
                        $scope.memory.setAddressBusState(-1);
                    } catch (exception) {
                        $scope.memory.addressBus.readWire.registerReaderAndRead(
                            $scope.memory.addressBus.readWireConnector
                        );
                        throw exception;
                    }
                } else {
                    $scope.memory.setAddressBusState(-1);
                }
            };

            $scope.deactivateAddressBusRead = function () {
                if ($scope.memory.addressBus.readWire) {
                    try {
                        $scope.memory.addressBus.readWire.write(
                            $scope.memory.addressBus.readWireConnector,
                            0
                        );
                    } catch (exception) {
                        throw exception;
                    } finally {
                        $scope.memory.addressBus.readWire.stopWriting(
                            $scope.memory.addressBus.readWireConnector
                        );
                        $scope.memory.addressBus.readWire.registerReaderAndRead(
                            $scope.memory.addressBus.readWireConnector
                        );
                    }
                }
                $scope.memory.setAddressBusState(0);
                $scope.setDataContextToUndefined();
            };

            $scope.toggleAddressBusRead = function () {
                if ($scope.memory.getAddressBusState() == -1) { // If we are reading then we want to stop it.
                    $scope.memory.setAddressBusState(0);
                    $scope.setDataContextToUndefined();
                } else { // start reading
                    $scope.memory.setAddressBusState(-1);
                }
            };

            $scope.toggleDataBusState = function () {
                var stateFound = false;
                var desiredState = $scope.memory.getDataBusState() - 1;
                while (!stateFound) {
                    if (desiredState < -1) {
                        desiredState = 1;
                    }
                    try {
                        $scope.memory.setDataBusState(desiredState);
                        stateFound = true;
                    } catch (exception) {
                        desiredState--;
                    }
                }
            };

            $scope.activateDataBusRead = function () {
                if ($scope.memory.dataBus.readWire) {
                    $scope.memory.dataBus.readWire.unregisterReader(
                        $scope.memory.dataBus.readWireConnector
                    );
                    try {
                        $scope.memory.dataBus.readWire.write(
                            $scope.memory.dataBus.readWireConnector,
                            1
                        );
                        $scope.memory.setDataBusState(-1);
                        $scope.dataContext[2].value = $scope.memory.readData();
                    } catch (exception) {
                        $scope.memory.dataBus.readWire.registerReaderAndRead(
                            $scope.memory.dataBus.readWireConnector
                        );
                        throw exception;
                    }
                } else {
                    try {
                        $scope.memory.setDataBusState(-1);
                        $scope.dataContext[2].value = $scope.memory.readData();
                    } catch (exception) {
                        throw exception;
                    }
                }
            };

            $scope.deactivateDataBusRead = function () {
                if ($scope.memory.dataBus.readWire) {
                    try {
                        $scope.memory.dataBus.readWire.write(
                            $scope.memory.dataBus.readWireConnector,
                            0
                        );
                    } catch (exception) {
                        throw exception;
                    } finally {
                        $scope.memory.dataBus.readWire.stopWriting(
                            $scope.memory.dataBus.readWireConnector
                        );
                        $scope.memory.dataBus.readWire.registerReaderAndRead(
                            $scope.memory.dataBus.readWireConnector
                        );
                    }
                }
                $scope.memory.setDataBusState(0);
            };

            $scope.activateDataBusWrite = function () {
                if ($scope.memory.dataBus.writeWire) {
                    $scope.memory.dataBus.writeWire.unregisterReader(
                        $scope.memory.dataBus.writeWireConnector
                    );
                    try {
                        $scope.memory.dataBus.writeWire.write(
                            $scope.memory.dataBus.writeWireConnector,
                            1
                        );
                        $scope.memory.setDataBusState(1);
                    } catch (exception) {
                        $scope.memory.dataBus.writeWire.registerReaderAndRead(
                            $scope.memory.dataBus.writeWireConnector
                        );
                        throw exception;
                    }
                } else {
                    try {
                        $scope.memory.setDataBusState(1);
                    } catch (exception) {
                        throw exception;
                    }
                }
            };

            $scope.deactivateDataBusWrite = function () {
                if ($scope.memory.dataBus.writeWire) {
                    try {
                        $scope.memory.dataBus.writeWire.write(
                            $scope.memory.dataBus.writeWireConnector,
                            0
                        );
                    } catch (exception) {
                        throw exception;
                    } finally {
                        $scope.memory.dataBus.writeWire.stopWriting(
                            $scope.memory.dataBus.writeWireConnector
                        );
                        $scope.memory.dataBus.writeWire.registerReaderAndRead(
                            $scope.memory.dataBus.writeWireConnector
                        );
                    }
                }
                $scope.memory.setDataBusState(0);
            };

            $scope.getConnectionPositions = function (bus) {
                var positions = [];
                if ($scope.memory.getAdressBus() === bus) {
                    positions.push({top: $scope.top-19, left: $scope.left+42});
                }
                if ($scope.memory.getDataBus() === bus) {
                    positions.push({top: $scope.top+112, left: $scope.left+119});
                }
                return positions;
            };

            $scope.getWireConnectionPositions = function (wire) {
                var positions = [];
                if (($scope.memory.addressBus.readWire) && ($scope.memory.addressBus.readWire === wire)) {
                    positions.push({top: $scope.top-7, left: $scope.left+51});
                }
                if (($scope.memory.dataBus.readWire) && ($scope.memory.dataBus.readWire === wire)) {
                    positions.push({top: $scope.top+100, left: $scope.left+131});
                }
                if (($scope.memory.dataBus.writeWire) && ($scope.memory.dataBus.writeWire === wire)) {
                    positions.push({top: $scope.top+106, left: $scope.left+131});
                }
                return positions;
            };

            // We have to wait for a very short time to enroll to the buses
            // because the handler needs to be fully initialized.
            $interval(function () {
                $scope.memory.getAdressBus().enrollToDirective(
                    $scope.memory,
                    $scope.getConnectionPositions
                );
                $scope.memory.setAddressBusState($scope.initialAddressBusState);

                var addressBusReadWire = $scope.memory.addressBus.readWire;
                if (addressBusReadWire) {
                    $scope.memory.addressBus.readWireConnector = new ReadingControlWireConnector(addressBusReadWire,
                        function (wire) {
                        $scope.memory.setToRead(wire);
                    },
                        function (wire) {
                        $scope.memory.setToDisconnected(wire);
                    });
                    addressBusReadWire.enrollToDirective(
                        $scope.memory.addressBus.readWireConnector,
                        $scope.getWireConnectionPositions
                    );
                    if (addressBusReadWire.registerReaderAndRead($scope.memory.addressBus.readWireConnector)) {
                        $scope.memory.setToRead($scope.memory.addressBus.readWire);
                    }
                }

                $scope.memory.getDataBus().enrollToDirective(
                    $scope.memory,
                    $scope.getConnectionPositions
                );
                $scope.memory.setDataBusState($scope.initialDataBusState);

                var dataBusWriteWire = $scope.memory.dataBus.writeWire;
                if (dataBusWriteWire) {
                    $scope.memory.dataBus.writeWireConnector = new ReadingControlWireConnector(dataBusWriteWire,
                        function (wire) {
                        $scope.memory.setToWrite(wire);
                    },
                        function (wire) {
                        $scope.memory.setToDisconnected(wire);
                    });
                    dataBusWriteWire.enrollToDirective(
                        $scope.memory.dataBus.writeWireConnector,
                        $scope.getWireConnectionPositions
                    );
                    if (dataBusWriteWire.registerReaderAndRead($scope.memory.dataBus.writeWireConnector)) {
                        $scope.memory.setToWrite($scope.memory.dataBus.writeWire);
                    }
                }
                var dataBusReadWire = $scope.memory.dataBus.readWire;
                if (dataBusReadWire) {
                    $scope.memory.dataBus.readWireConnector = new ReadingControlWireConnector(dataBusReadWire,
                        function (wire) {
                        $scope.memory.setToRead(wire);
                    },
                        function (wire) {
                        $scope.memory.setToDisconnected(wire);
                    });
                    dataBusReadWire.enrollToDirective(
                        $scope.memory.dataBus.readWireConnector,
                        $scope.getWireConnectionPositions
                    );
                    if (dataBusReadWire.registerReaderAndRead($scope.memory.dataBus.readWireConnector)) {
                        $scope.memory.setToRead($scope.memory.dataBus.readWire);
                    }
                }
            }, 1, 1);
        },
        templateUrl: 'partials/component_Memory.html'
    };
});

bonsaiApp.directive('addressgate', function () {
    return {
        require: '^memory',
        restrict: 'E',
        scope: {
            bus: '=',
            setRead: '=',
            initialState: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.setAddressBusConnection($scope.bus, $scope.setRead);
            registerCtrl.setAddressBusConnectionState($scope.initialState);
        },
        template: ''
    };
});

bonsaiApp.directive('datagate', function () {
    return {
        require: '^memory',
        restrict: 'E',
        scope: {
            bus: '=',
            setWrite: '=',
            setRead: '=',
            initialState: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.setDataBusConnection($scope.bus, $scope.setWrite, $scope.setRead);
            registerCtrl.setDataBusConnectionState($scope.initialState);
        },
        template: ''
    };
});