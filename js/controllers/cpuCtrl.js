'use strict';

bonsaiApp.controller('bonsaiCpuCtrl',
    function ($scope, $routeParams) {
        $scope.base = 10;

        $scope.cpu = {
            'buses': [
                {
                    'id': 'dataBus',
                    'name': 'Datenbus',
                    'max': 255,
                    'base': 10,
                    'color': 'rgb(0, 140, 0)',
                    'top': 92,
                    'left': 352
                }, {
                    'id': 'addressBus',
                    'name': 'Adressbus',
                    'max': 255,
                    'base': 10,
                    'color': 'rgb(0, 0, 225)',
                    'top': 10,
                    'left': 152
                }, {
                    'id': 'testBus',
                    'name': 'Testbus',
                    'max': 1
                }, {
                    'id': 'RegisterCdataBusGateWriteWire',
                    'name': 'Register C dataBus gate write wire'
                }, {
                    'id': 'RegisterCdataBusGateReadWire',
                    'name': 'Register C dataBus gate read wire'
                }, {
                    'id': 'RegisterCIncWire',
                    'name': 'Register C inc wire'
                }, {
                    'id': 'RegisterCDecWire',
                    'name': 'Register C dec wire'
                }, {
                    'id': 'DatenspeicherAddressReadWire',
                    'name': 'Datenspeicher Adressbus read wire'
                }, {
                    'id': 'AndA',
                    'name': 'And gate A wire'
                }, {
                    'id': 'AndB',
                    'name': 'And gate B wire'
                }, {
                    'id': 'NorA',
                    'name': 'Nor gate A wire'
                }, {
                    'id': 'NorB',
                    'name': 'Nor gate B wire'
                }, {
                    'id': 'OrA',
                    'name': 'Or gate A wire'
                }, {
                    'id': 'OrB',
                    'name': 'Or gate B wire'
                }, {
                    'id': 'logic',
                    'name': 'logic result wire'
                }
            ],
            'manualswitches': [
                {
                    'wireId': 'testBus',
                    'name': 'Lena',
                    'value': 0,
                    'top': 168,
                    'left': 80
                }, {
                    'wireId': 'RegisterCdataBusGateWriteWire',
                    'name': 'RegisterCdataBusGateWriteWireSwitch',
                    'value': 0,
                    'top': 104,
                    'left': 512
                }, {
                    'wireId': 'RegisterCdataBusGateReadWire',
                    'name': 'RegisterCdataBusGateReadWireSwitch',
                    'value': 0,
                    'top': 80,
                    'left': 512
                }, {
                    'wireId': 'RegisterCIncWire',
                    'name': 'RegisterCIncWireSwitch',
                    'value': 0,
                    'top': 48,
                    'left': 560
                }, {
                    'wireId': 'RegisterCDecWire',
                    'name': 'RegisterCDecWireSwitch',
                    'value': 0,
                    'top': 67,
                    'left': 560
                }, {
                    'wireId': 'DatenspeicherAddressReadWire',
                    'name': 'DatenspeicherAddressReadWireSwitch',
                    'value': 1,
                    'top': 20,
                    'left': 80
                }, {
                    'wireId': 'AndA',
                    'name': 'AndASwitch',
                    'value': 1,
                    'top': 10,
                    'left': 800
                }, {
                    'wireId': 'AndB',
                    'name': 'AndBSwitch',
                    'value': 0,
                    'top': 30,
                    'left': 800
                }, {
                    'wireId': 'NorA',
                    'name': 'NorASwitch',
                    'value': 0,
                    'top': 50,
                    'left': 800
                }, {
                    'wireId': 'NorB',
                    'name': 'NorBSwitch',
                    'value': 0,
                    'top': 70,
                    'left': 800
                }
            ],
            'leds': [
                {
                    'wireId': 'testBus',
                    'name': 'Hugo',
                    'value': 0,
                    'top': 160,
                    'left': 16
                }, {
                    'wireId': 'testBus',
                    'name': 'Heinrich',
                    'value': 0,
                    'top': 176,
                    'left': 32
                }, {
                    'wireId': 'RegisterCIncWire',
                    'name': 'Register C inc wire led',
                    'value': 0,
                    'top': 48,
                    'left': 512
                }, {
                    'wireId': 'OrB',
                    'name': 'Nor works correctly intication led',
                    'top': 70,
                    'left': 750
                }, {
                    'wireId': 'logic',
                    'name': 'logic intication led',
                    'top': 39,
                    'left': 700
                }
            ],
            'andGates': [
                {
                    'name': 'Andreas',
                    'inAId': 'AndA',
                    'inBId': 'AndB',
                    'outId': 'OrA',
                    'top': 15,
                    'left': 770
                }
            ],
            'orGates': [
                {
                    'name': 'Orphelia',
                    'inAId': 'OrA',
                    'inBId': 'OrB',
                    'outId': 'logic',
                    'top': 35,
                    'left': 720
                }
            ],
            'norGates': [
                {
                    'name': 'Norbert',
                    'inAId': 'NorA',
                    'inBId': 'NorB',
                    'outId': 'OrB',
                    'top': 55,
                    'left': 770
                }
            ],
            'registers': [
                {
                    'name': 'Register B',
                    'value': 10,
                    'base' : 10,
                    'top' : 64,
                    'left': 240,
                    'gates': [
                        {'busId': 'addressBus'},
                        {'busId': 'dataBus'}
                    ]
                }, {
                    'name': 'Register C',
                    'value': 1,
                    'base' : 10,
                    'top' : 48,
                    'left': 400,
                    'gates': [
                        {
                            'busId': 'addressBus'
                        }, {
                            'busId': 'dataBus',
                            'writeWireId': 'RegisterCdataBusGateWriteWire',
                            'readWireId': 'RegisterCdataBusGateReadWire'
                        }
                    ],
                    'incWireId': 'RegisterCIncWire',
                    'decWireId': 'RegisterCDecWire'
                }
            ],
            'memories': [
                {
                    'name': "Datenspeicher",
                    'base': 10,
                    'content': "1\n2\n3",
                    'top': 32,
                    'left': 16,
                    'addressgate': {
                        'busId': 'addressBus',
                        'readWireId': 'DatenspeicherAddressReadWire'
                    },
                    'datagate': {
                        'busId': 'dataBus',
                        'writeWireId': undefined,
                        'readWireId': undefined
                    }
                }
            ]
        };

        var i, j;
        for (i = 0; i < $scope.cpu.buses.length; i++) {
            $scope.cpu.buses[i].object = new Bus();
            // TODO: Remove this when refactoring is done.
            $scope[$scope.cpu.buses[i].id] = $scope.cpu.buses[i].object;
        }
        $scope.findBus = function (id) {
            for (var i = 0; i < $scope.cpu.buses.length; i++) {
                if ($scope.cpu.buses[i].id == id) {
                    return $scope.cpu.buses[i].object;
                }
            }
            throw BusNotFound(
                "The bus with id " + id + " was not found.",
                id
            );
        };
        for (i = 0; i < $scope.cpu.manualswitches.length; i++) {
            $scope.cpu.manualswitches[i].wire = $scope.findBus($scope.cpu.manualswitches[i].wireId);
        }
        for (i = 0; i < $scope.cpu.leds.length; i++) {
            $scope.cpu.leds[i].wire = $scope.findBus($scope.cpu.leds[i].wireId);
        }
        for (i = 0; i < $scope.cpu.andGates.length; i++) {
            if ($scope.cpu.andGates[i].inAId) {
                $scope.cpu.andGates[i].inA = $scope.findBus($scope.cpu.andGates[i].inAId);
            }
            if ($scope.cpu.andGates[i].inBId) {
                $scope.cpu.andGates[i].inB = $scope.findBus($scope.cpu.andGates[i].inBId);
            }
            if ($scope.cpu.andGates[i].outId) {
                $scope.cpu.andGates[i].out = $scope.findBus($scope.cpu.andGates[i].outId);
            }
        }
        for (i = 0; i < $scope.cpu.orGates.length; i++) {
            if ($scope.cpu.orGates[i].inAId) {
                $scope.cpu.orGates[i].inA = $scope.findBus($scope.cpu.orGates[i].inAId);
            }
            if ($scope.cpu.orGates[i].inBId) {
                $scope.cpu.orGates[i].inB = $scope.findBus($scope.cpu.orGates[i].inBId);
            }
            if ($scope.cpu.orGates[i].outId) {
                $scope.cpu.orGates[i].out = $scope.findBus($scope.cpu.orGates[i].outId);
            }
        }
        for (i = 0; i < $scope.cpu.norGates.length; i++) {
            if ($scope.cpu.norGates[i].inAId) {
                $scope.cpu.norGates[i].inA = $scope.findBus($scope.cpu.norGates[i].inAId);
            }
            if ($scope.cpu.norGates[i].inBId) {
                $scope.cpu.norGates[i].inB = $scope.findBus($scope.cpu.norGates[i].inBId);
            }
            if ($scope.cpu.norGates[i].outId) {
                $scope.cpu.norGates[i].out = $scope.findBus($scope.cpu.norGates[i].outId);
            }
        }
        for (i = 0; i < $scope.cpu.registers.length; i++) {
            if ($scope.cpu.registers[i].incWireId) {
                $scope.cpu.registers[i].incWire = $scope.findBus($scope.cpu.registers[i].incWireId);
            }
            if ($scope.cpu.registers[i].decWireId) {
                $scope.cpu.registers[i].decWire = $scope.findBus($scope.cpu.registers[i].decWireId);
            }
            for (j = 0; j < $scope.cpu.registers[i].gates.length; j++) {
                $scope.cpu.registers[i].gates[j].bus = $scope.findBus($scope.cpu.registers[i].gates[j].busId);
                if ($scope.cpu.registers[i].gates[j].writeWireId) {
                    $scope.cpu.registers[i].gates[j].writeWire = $scope.findBus($scope.cpu.registers[i].gates[j].writeWireId);
                }
                if ($scope.cpu.registers[i].gates[j].readWireId) {
                    $scope.cpu.registers[i].gates[j].readWire = $scope.findBus($scope.cpu.registers[i].gates[j].readWireId);
                }
            }
        }
        for (i = 0; i < $scope.cpu.memories.length; i++) {
            $scope.cpu.memories[i].addressgate.bus = $scope.findBus($scope.cpu.memories[i].addressgate.busId);
            if ($scope.cpu.memories[i].addressgate.readWireId) {
                $scope.cpu.memories[i].addressgate.readWire = $scope.findBus($scope.cpu.memories[i].addressgate.readWireId);
            }
            $scope.cpu.memories[i].datagate.bus = $scope.findBus($scope.cpu.memories[i].datagate.busId);
            if ($scope.cpu.memories[i].datagate.writeWireId) {
                $scope.cpu.memories[i].datagate.writeWire = $scope.findBus($scope.cpu.memories[i].datagate.writeWireId);
            }
            if ($scope.cpu.memories[i].datagate.readWireId) {
                $scope.cpu.memories[i].datagate.readWire = $scope.findBus($scope.cpu.memories[i].datagate.readWireId);
            }
        }

        $scope.selectedEditor = undefined;
        $scope.selectEditor = function (index) {
            $scope.selectedEditor = index;
        };

        $scope.splitLines = function (string) {
            return string.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n")
        };
        $scope.readFile = function (editorNumber) {
            var input = document.getElementById('filename-' + $scope.editors[editorNumber].name);
            var file = input.files[0];
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                $scope.$apply(function () {
                    $scope.editors[editorNumber].content = reader.result;
                    $scope.editors[editorNumber].fileName = file.name;
                });
            });
            console.log(file);
            reader.readAsText(file);
        };
        $scope.saveFile = function (editorNumber) {
            var url;
            var blob = new Blob([$scope.editors[editorNumber].content], {type : 'application/bonsai'});
            if (window.webkitURL) {
                url = window.webkitURL.createObjectURL(blob);
            } else {
                url = window.URL.createObjectURL(blob);
            }
            // initiate download by adding a <a> element and invoking a click on it
            var downloadLink = document.createElement("a");
            downloadLink.href = url;
            if ($scope.editors[editorNumber].fileName) {
                downloadLink.download = $scope.editors[editorNumber].fileName
            } else {
                downloadLink.download = $scope.editors[editorNumber].name + ".bonsai";
            }
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };

        $scope.errors = [];
        $scope.$on('error', function (event, message) {
            $scope.errors.push(message)
        });
    }
);