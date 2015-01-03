'use strict';

bonsaiApp.directive('memory', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            memoryName: '@',
            base: '=',
            top: '=',
            left: '=',
            content: '=',
            undefinedString: '=',
            showContext: '='
        },
        controller: function ($scope) {
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
            $scope.addressBusColor = 'rgb(122, 0, 0)';
            $scope.dataBusColor = 'rgb(0, 0, 0)';

            this.setAddressBusConnection = function (bus, setRead) {
                $scope.memory.setAddressBusConnection(bus, setRead);
                bus.enrollToDirective(
                    $scope.memory,
                    $scope.getConnectionPositions
                );
                if (setRead) {
                    $scope.memory.addressBus.readWireConnector = new ReadingControlWireConnector(setRead,
                        function (wire) {
                            if (wire.isActive() && wire.isNotZero()) {
                                $scope.memory.setToRead(wire);
                            }
                        },
                        function (wire) {
                            if (wire.isActive() && !wire.isNotZero()) {
                                $scope.memory.setToDisconnected(wire);
                            }
                        }, $scope.memoryName + ' read wire connector for address bus ' +
                            $scope.memory.addressBus.bus.getName());
                    setRead.enrollToDirective(
                        $scope.memory.addressBus.readWireConnector,
                        $scope.getWireConnectionPositions
                    );
                    if (setRead.registerReaderAndRead($scope.memory.addressBus.readWireConnector)) {
                        $scope.memory.setToRead($scope.memory.addressBus.readWire);
                    }
                }
                if (bus.getColor) {
                    $scope.addressBusColor = bus.getColor(true);
                }
                $scope.addressBusConnection = $scope.memory.getAddressBusConnection();
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
                if (bus) {
                    bus.enrollToDirective(
                        $scope.memory,
                        $scope.getConnectionPositions
                    );
                }
                if (setWrite) {
                    $scope.memory.dataBus.writeWireConnector = new ReadingControlWireConnector(setWrite,
                        function (wire) {
                            if (wire.isActive() && wire.isNotZero()) {
                                $scope.memory.setToWrite(wire);
                            }
                        },
                        function (wire) {
                            if (wire.isActive() && !wire.isNotZero()) {
                                $scope.memory.setToDisconnected(wire);
                            }
                        }, $scope.memoryName + ' write wire connector for data bus ' +
                            $scope.memory.dataBus.bus.getName());
                    setWrite.enrollToDirective(
                        $scope.memory.dataBus.writeWireConnector,
                        $scope.getWireConnectionPositions
                    );
                    setWrite.registerReaderAndRead($scope.memory.dataBus.writeWireConnector);
                }
                if (setRead) {
                    $scope.memory.dataBus.readWireConnector = new ReadingControlWireConnector(setRead,
                        function (wire) {
                            if (wire.isActive() && wire.isNotZero()) {
                                $scope.memory.setToRead(wire);
                            }
                        },
                        function (wire) {
                            if (wire.isActive() && !wire.isNotZero()) {
                                $scope.memory.setToDisconnected(wire);
                            }
                        }, $scope.memoryName + ' read wire connector for data bus ' +
                            $scope.memory.dataBus.bus.getName());
                    setRead.enrollToDirective(
                        $scope.memory.dataBus.readWireConnector,
                        $scope.getWireConnectionPositions
                    );
                    setRead.registerReaderAndRead($scope.memory.dataBus.readWireConnector);
                }
                if (bus.getColor) {
                    $scope.dataBusColor = bus.getColor(true);
                }
                $scope.dataBusConnection = $scope.memory.getDataBusConnection();
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

            $scope.setContent = function (content) {
                // We have to convert the multi line string to an associative array.
                    var lines = content.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n");
                    var arrayContent = {};
                    for (var i = 0; i < lines.length; i++) {
                        if (lines[i].length) {
                            arrayContent[i] = parseInt(lines[i]);
                        } else {
                            arrayContent[i] = undefined;
                        }
                    }
                    $scope.memory.setContent(arrayContent)
            };

            $scope.$watch('content', function () {
                if ($scope.content) {
                    $scope.setContent($scope.content);
                }
            });

            $scope.$watch('top', function (top) {
                $scope.topCSS = top + 'px';
            });
            $scope.$watch('left', function (left) {
                $scope.leftCSS = left + 'px';
            });

            $scope.$on('gateRead', function (event, bus) {
                if ($scope.memory.getAddressBus() == bus) {
                    $scope.memory.setAddressBusState(-1);
                }
                if ($scope.memory.getDataBus() == bus) {
                    $scope.memory.setDataBusState(-1);
                }
                event.stopPropagation();
            });

            $scope.$on('gateReadDisconnected', function (event, bus) {
                if ($scope.memory.getAddressBus() == bus) {
                    $scope.memory.setAddressBusState(0);
                }
                if ($scope.memory.getDataBus() == bus) {
                    $scope.memory.setDataBusState(0);
                }
                event.stopPropagation();
            });

            $scope.$on('gateWrite', function (event, bus) {
                if ($scope.memory.getAddressBus() == bus) {
                    $scope.memory.setAddressBusState(1);
                }
                if ($scope.memory.getDataBus() == bus) {
                    $scope.memory.setDataBusState(1);
                }
                event.stopPropagation();
            });

            $scope.$on('gateWriteDisconnected', function (event, bus) {
                if ($scope.memory.getAddressBus() == bus) {
                    $scope.memory.setAddressBusState(0);
                }
                if ($scope.memory.getDataBus() == bus) {
                    $scope.memory.setDataBusState(0);
                }
                event.stopPropagation();
            });

            $scope.isUndefined = function (value) {
                return typeof value == 'undefined';
            };

            $scope.getConnectionPositions = function (bus) {
                var positions = [];
                if ($scope.memory.getAddressBus() === bus) {
                    positions.push({top: $scope.top-19, left: $scope.left+42});
                }
                if ($scope.memory.getDataBus() === bus) {
                    if ($scope.showContext) {
                        positions.push({top: $scope.top + 112, left: $scope.left + 119});
                    } else {
                        positions.push({top: $scope.top + 42, left: $scope.left + 119});
                    }
                }
                return positions;
            };

            $scope.getWireConnectionPositions = function (wire) {
                var positions = [];
                if (($scope.memory.addressBus.readWire) && ($scope.memory.addressBus.readWire === wire)) {
                    positions.push({top: $scope.top-7, left: $scope.left+51});
                }
                if (($scope.memory.dataBus.readWire) && ($scope.memory.dataBus.readWire === wire)) {
                    if ($scope.showContext) {
                        positions.push({top: $scope.top + 100, left: $scope.left + 131});
                    } else {
                        positions.push({top: $scope.top + 30, left: $scope.left + 131});
                    }
                }
                if (($scope.memory.dataBus.writeWire) && ($scope.memory.dataBus.writeWire === wire)) {
                    if ($scope.showContext) {
                        positions.push({top: $scope.top + 106, left: $scope.left + 131});
                    } else {
                        positions.push({top: $scope.top + 36, left: $scope.left + 131});
                    }
                }
                return positions;
            };

            $scope.$on('sendInitialValues', function (event, message) {
                $scope.memory.setAddressBusState($scope.initialAddressBusState);
                $scope.memory.setDataBusState($scope.initialDataBusState);
            });

            $scope.setContent($scope.content);
            $scope.$emit('componentInitialized', $scope.memory);
        },
        templateUrl: '/partials/component_Memory.html'
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