'use strict';

bonsaiApp.directive('memory', function ($interval) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            memoryName: '@',
            base: '=',
            top: '=',
            left: '='
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
            $scope.dataContext = [
                {'address': undefined, 'value': undefined},
                {'address': undefined, 'value': undefined},
                {'address': undefined, 'value': undefined},
                {'address': undefined, 'value': undefined},
                {'address': undefined, 'value': undefined}
            ];

            $scope.dataChangeCallback = function (dataContext) {
                $scope.dataContext = dataContext;
            };

            $scope.memory = new Memory($scope.dataChangeCallback, $scope.registerName, $scope.data);
            $scope.topCSS = $scope.top + 'em';
            $scope.leftCSS = $scope.left + 'em';
            $scope.addressBusColor = 'rgb(122, 0, 0)';
            $scope.dataBusColor = 'rgb(0, 0, 0)';

            this.addAddressBusConnection = function (bus, setRead) {
                $scope.memory.setAddressBusConnection(bus, setRead);
                if (($scope.memory.address) && ($scope.memory.address.bus.getColor)) {
                    $scope.addressBusColor = $scope.memory.address.bus.getColor();
                }
            };

            this.addDataBusConnection = function (bus, setWrite, setRead) {
                $scope.memory.setDataBusConnection(bus, setWrite, setRead);
                if (($scope.memory.data) && ($scope.memory.data.bus.getColor)) {
                    $scope.dataBusColor = $scope.memory.data.bus.getColor();
                }
            };
        },
        link: function ($scope, element, attrs) {
            attrs.$observe('memoryName', function() {
                if ($scope.memoryName) {
                    $scope.memory.setName($scope.memoryName);
                }
            });

            $scope.getConnectionPositions = function (bus) {
                var positions = [];
                if ($scope.memory.getAdressBus() === bus) {
                    positions.push({top: $scope.top-1.2, left: $scope.left+2.08});
                }
                if ($scope.memory.getDataBus() === bus) {
                    positions.push({top: $scope.top+7, left: $scope.left+2.08});
                }
                return positions;
            };

            $scope.getWireConnectionPositions = function (wire) {
                var positions = [];
                if (($scope.memory.address.readWire) && ($scope.memory.address.readWire === wire)) {
                    positions.push({top: $scope.top-0.42, left: $scope.left+2.68});
                }
                if (($scope.memory.data.readWire) && ($scope.memory.data.readWire === wire)) {
                    positions.push({top: $scope.top+6.22, left: $scope.left+2.68});
                }
                if (($scope.memory.data.writeWire) && ($scope.memory.data.writeWire === wire)) {
                    positions.push({top: $scope.top+6.62, left: $scope.left+2.68});
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

                var addressBusReadWire = $scope.memory.address.readWire;
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

                var dataBusWriteWire = $scope.memory.data.writeWire;
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
                var dataBusReadWire = $scope.memory.data.readWire;
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
            registerCtrl.addAddressBusConnection($scope.bus, $scope.setRead);
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
            registerCtrl.addDataBusConnection($scope.bus, $scope.setWrite, $scope.setRead);
        },
        template: ''
    };
});