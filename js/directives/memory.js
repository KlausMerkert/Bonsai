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
            $scope.topCSS = $scope.top + 'em';
            $scope.leftCSS = $scope.left + 'em';
            $scope.addressBusColor = 'rgb(122, 0, 0)';
            $scope.dataBusColor = 'rgb(0, 0, 0)';

            this.setAddressBusConnection = function (bus, setRead) {
                $scope.memory.setAddressBusConnection(bus, setRead);
                if (($scope.memory.addressBus) && ($scope.memory.addressBus.bus.getColor)) {
                    $scope.addressBusColor = $scope.memory.addressBus.bus.getColor();
                }
            };

            this.setDataBusConnection = function (bus, setWrite, setRead) {
                $scope.memory.setDataBusConnection(bus, setWrite, setRead);
                if (($scope.memory.dataBus) && ($scope.memory.dataBus.bus.getColor)) {
                    $scope.dataBusColor = $scope.memory.dataBus.bus.getColor();
                }
            };
        },
        link: function ($scope, element, attrs) {
            attrs.$observe('memoryName', function() {
                if ($scope.memoryName) {
                    $scope.memory.setName($scope.memoryName);
                }
            });

            attrs.$observe('content', function () {
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

            $scope.toggleDataBusRead = function () {
                if ($scope.memory.getDataBusState() == -1) { // If we are reading then we want to stop it.
                    $scope.memory.setDataBusState(0);
                } else { // start reading
                    try {
                        $scope.memory.setDataBusState(-1);
                        $scope.dataContext[2].value = $scope.memory.readData();
                    } catch (exception) {
                        throw exception;
                    }
                }
            };

            $scope.toggleDataBusWrite = function () {
                if ($scope.memory.getDataBusState() == 1) { // If we are writing then we want to stop it.
                    $scope.memory.setDataBusState(0);
                } else { // start writing
                    $scope.memory.setDataBusState(1);
                }
            };

            $scope.getConnectionPositions = function (bus) {
                var positions = [];
                if ($scope.memory.getAdressBus() === bus) {
                    positions.push({top: $scope.top-1.2, left: $scope.left+2.78});
                }
                if ($scope.memory.getDataBus() === bus) {
                    positions.push({top: $scope.top+7, left: $scope.left+7.58});
                }
                return positions;
            };

            $scope.getWireConnectionPositions = function (wire) {
                var positions = [];
                if (($scope.memory.addressBus.readWire) && ($scope.memory.addressBus.readWire === wire)) {
                    positions.push({top: $scope.top-0.42, left: $scope.left+2.68});
                }
                if (($scope.memory.dataBus.readWire) && ($scope.memory.dataBus.readWire === wire)) {
                    positions.push({top: $scope.top+6.22, left: $scope.left+8.18});
                }
                if (($scope.memory.dataBus.writeWire) && ($scope.memory.dataBus.writeWire === wire)) {
                    positions.push({top: $scope.top+6.62, left: $scope.left+8.18});
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

                var addressBusReadWire = $scope.memory.addressBus.readWire;
                if (addressBusReadWire) {
                    var addressBusReadConnector = new ReadingControlWireConnector(addressBusReadWire,
                        function (wire) {
                        $scope.memory.setToRead(wire);
                    },
                        function (wire) {
                        $scope.memory.setToDisconnected(wire);
                    });
                    addressBusReadWire.connectToDirective(addressBusReadConnector, $scope.getWireConnectionPositions);
                }

                $scope.memory.getDataBus().enrollToDirective(
                    $scope.memory,
                    $scope.getConnectionPositions
                );

                var dataBusWriteWire = $scope.memory.dataBus.writeWire;
                if (dataBusWriteWire) {
                    var dataBusWriteConnector = new ReadingControlWireConnector(dataBusWriteWire,
                        function (wire) {
                        $scope.memory.setToWrite(wire);
                    },
                        function (wire) {
                        $scope.memory.setToDisconnected(wire);
                    });
                    dataBusWriteWire.connectToDirective(dataBusWriteConnector, $scope.getWireConnectionPositions);
                }
                var dataBusReadWire = $scope.memory.dataBus.readWire;
                if (dataBusReadWire) {
                    var dataBusReadConnector = new ReadingControlWireConnector(dataBusReadWire,
                        function (wire) {
                        $scope.memory.setToRead(wire);
                    },
                        function (wire) {
                        $scope.memory.setToDisconnected(wire);
                    });
                    dataBusReadWire.connectToDirective(dataBusReadConnector, $scope.getWireConnectionPositions);
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
            setRead: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.setAddressBusConnection($scope.bus, $scope.setRead);
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
            setRead: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.setDataBusConnection($scope.bus, $scope.setWrite, $scope.setRead);
        },
        template: ''
    };
});