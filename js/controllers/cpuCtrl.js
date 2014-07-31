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
                    'color': 'rgb(255, 0, 0)',
                    'top': 92,
                    'left': 352,
                    'routes': [
                        {
                            'type': 'vertical',
                            'top': '164px',
                            'left': '129px',
                            'width': '0',
                            'height': '21px'
                        },
                        {
                            'type': 'bottomright',
                            'top': '100px',
                            'left': '313px',
                            'width': '120px',
                            'height': '21px'
                        },
                        {
                            'type': 'topleft',
                            'top': '121px',
                            'left': '273px',
                            'width': '38px',
                            'height': '42px'
                        },
                        {
                            'type': 'vertical',
                            'top': '122px',
                            'left': '300px',
                            'width': '0',
                            'height': '7px'
                        },
                        {
                            'type': 'topleft',
                            'top': '185px',
                            'left': '43px',
                            'width': '210px',
                            'height': '45px'
                        },
                        {
                            'type': 'bottomright',
                            'top': '165px',
                            'left': '253px',
                            'width': '20px',
                            'height': '20px'
                        }
                    ]
                }, {
                    'id': 'addressBus',
                    'name': 'Adressbus',
                    'max': 255,
                    'base': 10,
                    'color': 'rgb(0, 140, 0)',
                    'top': 10,
                    'left': 152,
                    'routes': [
                        {
                            'type': 'topleft',
                            'top': '10px',
                            'left': '51px',
                            'width': '220px',
                            'height': '21px'
                        }, {
                            'type': 'vertical',
                            'top': '10px',
                            'left': '273px',
                            'width': '0',
                            'height': '21px'
                        }, {
                            'type': 'topright',
                            'top': '10px',
                            'left': '273px',
                            'width': '160px',
                            'height': '21px'
                        }
                    ]
                },
                {
                    'id': 'MicroAddressBus',
                    'name': 'MikroAdressbus',
                    'max': 99,
                    'base': 10,
                    'color': 'rgb(155, 100, 0)',
                    'top': 180,
                    'left': 625
                },
                {
                    'id': 'DecoderMPC',
                    'name': 'BefehlsdecoderZuMPC',
                    'max': 99,
                    'base': 10,
                    'color': 'rgb(0, 140, 140)',
                    'top': 200,
                    'left': 600               
                }, {
                    'id': 'DatenspeicherAddressReadWire',
                    'name': 'Datenspeicher Adressbus read wire',
                    'max': 1                
                }, {
                    'id': 'AndB',
                    'name': 'And gate B wire',
                    'max': 1
                }, {
                    'id': 'OrA',
                    'name': 'Or gate A wire',
                    'max': 1
                }, {
                    'id': 's0',
                    'name': 'not count',
                    'max': 1
                }, {
                    'id': 's1',
                    'name': 'clrMPC',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's2',
                    'name': 'loadMPC',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's3',
                    'name': 'readMem',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's4',
                    'name': 'writeMem',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                 }, {
                    'id': 's5',
                    'name': 'incAkku',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's6',
                    'name': 'decAkku',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's7',
                    'name': 'loadAkku',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's8',
                    'name': 'writeAkku',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's9',
                    'name': 'loadPC',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's10',
                    'name': 'writePC',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's11',
                    'name': 'loadIR',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's12',
                    'name': 'writeIR',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's13',
                    'name': 'incPC',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 's14',
                    'name': 'incPCz',
                    'max': 1,
                    'color': 'rgb(255, 255, 0)'
                }, {
                    'id': 'and2A_Takt',
                    'name': 'xy',
                    'max': 1
                }, {
                    'id': 'and2B_nor1out',
                    'name': 'uv',
                    'max': 1
                }, {
                    'id': 'takt',
                    'name': 'Takt',
                    'max': 1
                }, {
                    'id': 'and2out_incMPC',
                    'name': 'abc',
                    'max': 1
                }, {
                    'id': 'or1_ausgang',
                    'name': 'or1_ausgang result wire',
                    'max': 1
                }, {
                    'id': 'compWire',
                    'name': 'Zerocomparator result wire',
                    'max': 1,
                    'routes': [
                        {
                            'type': 'vertical',
                            'top': '150px',
                            'left': '300px',
                            'width': '0',
                            'height': '16px'
                        },
                        {
                            'type': 'topright',
                            'top': '59px',
                            'left': '371px',
                            'width': '7px',
                            'height': '50px'
                        },
                        {
                            'type': 'bottomright',
                            'top': '110px',
                            'left': '301px',
                            'width': '77px',
                            'height': '50px'
                        }
                    ]               
                }, {
                    'id': 'MicroDataBus',
                    'name': 'MicroDataBus',
                    'base': 10,
                    'max': 32767,
                    'color': 'rgb(200, 0, 200)',
                    'left': 760,
                    'top': 10               
                }, {
                    'id': 'delayTestLeft',
                    'name': 'delay Test Left'
                }, {
                    'id': 'delayTestRight',
                    'name': 'delay Test Right'
                }, {
                    'id': 'FilterTop',
                    'name': 'filter Test Top bus',
                    'base': 10,
                    'max': 32767,
                    'left': 410,
                    'top': 290
                }, {
                    'id': 'FilterBottom',
                    'name': 'filter Test Bottom bus',
                    'base': 10,
                    'max': 32767,
                    'left': 410,
                    'top': 360
                }, {
                    'id': 'BitRegisterRead',
                    'name': 'BitRegister read wire'
                }, {
                    'id': 'clockTest',
                    'name': 'Clock test wire'
                }, {
                    'id': 'routingTest',
                    'name': 'Routing test wire'
                }
            ],
            'manualswitches': [
                {                
                    'wireId': 'DatenspeicherAddressReadWire',
                    'name': 'DatenspeicherAddressReadWireSwitch',
                    'value': 1,
                    'top': 40,
                    'left': 80               
                }, {
                    'wireId': 'takt',
                    'name': 'Takt',
                    'value': 0,
                    'top': 300,
                    'left': 710               
                }, {
                    'wireId': 'BitRegisterRead',
                    'name': 'BitRegister read switch',
                    'value': 0,
                    'top': 45,
                    'left': 850
                }
            ],
            'clocks': [
                {
                    'wireId': 'clockTest',
                    'name': 'Taktgeber',
                    'frequency': 1,
                    'top': 100,
                    'left': 900
                }
            ],
            'leds': [
                {
                    'wireId': 'or1_ausgang',
                    'name': 'or1_ausgang indication led',
                    'top': 35,
                    'left': 312
                }, {
                    'wireId': 'compWire',
                    'name': 'comp indication led',
                    'top': 170,
                    'left': 300 
                }, {
                    'wireId': 's0',
                    'name': 's0 led',
                    'top': 62,
                    'left': 782 
                }, {
                    'wireId': 'delayTestLeft',
                    'name': 'Delay left led',
                    'top': 400,
                    'left': 550
                }, {
                    'wireId': 'delayTestRight',
                    'name': 'Delay right led',
                    'top': 400,
                    'left': 720
                }, {
                    'wireId': 'clockTest',
                    'name': 'Clock test led',
                    'top': 100,
                    'left': 870
                }, {
                    'wireId': 'routingTest',
                    'name': 'routing test led 1',
                    'top': 300,
                    'left': 50
                }, {
                    'wireId': 'routingTest',
                    'name': 'routing test led 2',
                    'top': 350,
                    'left': 80
                }, {
                    'wireId': 'routingTest',
                    'name': 'routing test led 3',
                    'top': 330,
                    'left': 20
                }, {
                    'wireId': 'routingTest',
                    'name': 'routing test led 4',
                    'top': 370,
                    'left': 70
                }
            ],
            'andGates': [
                {
                    'name': 'and1',
                    'inAId': 's14',
                    'inBId': 'compWire',
                    'outId': 'OrA',
                    'top': 48,
                    'left': 350
                },
                {
                    'name': 'and2',
                    'inAId': 'takt',
                    'inBId': 'and2B_nor1out',
                    'outId': 'and2out_incMPC',
                    'top': 253,
                    'left': 680
                }
            ],
            'orGates': [
                {
                    'name': 'or1',
                    'inAId': 'OrA',
                    'inBId': 's13',
                    'outId': 'or1_ausgang',
                    'top': 53,
                    'left': 320
                }
            ],
            'norGates': [
                {
                    'name': 'nor1',
                    'inAId': 's1',
                    'inBId': 's2',
                    'outId': 'and2B_nor1out',
                    'top': 250,
                    'left': 730
                }
            ],
            'registers': [
                {
                    'name': 'PC',
                    'value': 10,
                    'base' : 10,
                    'top' : 50,
                    'left': 240,
                    'gates': [
                        {'busId': 'addressBus',
                         'writeWireId': 's10',
                         'readWireId': 's9'                        
                        }
                    ],
                    'incWireId': 'or1_ausgang',
                }, {
                    'name': 'IR',
                    'value': 1,
                    'base' : 10,
                    'top' : 50,
                    'left': 400,
                    'gates': [
                        {
                            'busId': 'addressBus',
                            'writeWireId': 's12',
                        }, {
                            'busId': 'dataBus',
                            'readWireId': 's11'
                        }
                    ],
                    'incWireId': undefined,
                    'decWireId': undefined,
                    'clrWireId': undefined
                }, {
                    'name': 'Akku',
                    'value': 42,
                    'base' : 10,
                    'top' : 250,
                    'left': 10,
                    'gates': [
                        {
                            'busId': 'dataBus',
                            'writeWireId': 's8',
                            'readWireId': 's7'
                        }
                    ],
                    'incWireId': 's5',
                    'decWireId': 's6'
                }, {
                    'name': 'MPC',
                    'value': 4,
                    'base' : 10,
                    'top' : 250,
                    'left': 600,
                    'gates': [
                        {
                            'busId': 'MicroAddressBus',
                            'writeWireId': undefined,
                            'readWireId': undefined
                        },
                        {
                            'busId': 'DecoderMPC',
                            'writeWireId': undefined,
                            'readWireId': 's2'
                        }
                    ],
                    'incWireId': 'and2out_incMPC',
                    'decWireId': undefined,
                    'clrWireId': 's1'               
                }, {
                    'name': 'filter Test Top',
                    'value': 1235,
                    'base': 10,
                    'top': 280,
                    'left': 300,
                    'gates': [
                        {
                            'busId': 'FilterTop'
                        }
                    ]
                }, {
                    'name': 'filter Test Bottom',
                    'value': 1035,
                    'base': 10,
                    'top': 380,
                    'left': 300,
                    'gates': [
                        {
                            'busId': 'FilterBottom'
                        }
                    ]
                }
            ],
            'bitregisters': [
                {
                    'name': 'Steuerwort',
                    'value': 9,
                    'base' : 10,
                    'top' : 50,
                    'left': 800,
                    'widegate': {
                        'busId': 'MicroDataBus',
                        'writeWireId': undefined,
                        'readWireId': 'BitRegisterRead'
                    },
                    'wiregates': [
                        {'wireId': 's0'},
                        {'wireId': 's1'},
                        {'wireId': 's2'},
                        {'wireId': 's3'},
                        {'wireId': 's4'},
                        {'wireId': 's5'},
                        {'wireId': 's6'},
                        {'wireId': 's7'},
                        {'wireId': 's8'},
                        {'wireId': 's9'},
                        {'wireId': 's10'},
                        {'wireId': 's11'},
                        {'wireId': 's12'},
                        {'wireId': 's13'},
                        {'wireId': 's14'}
                    ]
                }
            ],
            'memories': [
                {
                    'name': "Datenspeicher",
                    'base': 10,
                    'content': "1\n2\n3",
                    'top': 50,
                    'left': 10,
                    'addressgate': {
                        'busId': 'addressBus',
                        'readWireId': 'DatenspeicherAddressReadWire'
                    },
                    'datagate': {
                        'busId': 'dataBus',
                        'writeWireId': 's4',
                        'readWireId': 's3'
                    }
                },
                {
                    'name': "Befehlsdecoder",
                    'base': 10,
                    'content': "10\n20\n30\n40\n50",
                    'top': 150,
                    'left':400,
                    'addressgate': {
                        'busId': 'addressBus',
                        'readWireId': undefined
                    },
                    'datagate': {
                        'busId': 'DecoderMPC',
                        'writeWireId': undefined,
                        'readWireId': undefined
                    }
                },
                {
                    'name': "Mikroprogrammspeicher",
                    'base': 10,
                    'content': "87432\n",
                    'top': 50,
                    'left':600,
                    'addressgate': {
                        'busId': 'MicroAddressBus',
                        'readWireId': undefined
                    },
                    'datagate': {
                        'busId': 'MicroDataBus',
                        'writeWireId': undefined,
                        'readWireId': undefined
                    }
                }
            ],
            'zerocomparators': [
                {
                    'name': 'Zero comparator 1',
                    'busId': 'dataBus',
                    'wireId': 'compWire',
                    'top': 130,
                    'left': 300
                }
            ],
            'delays': [
                {
                    'name': 'test Delay',
                    'delay': 1000,
                    'busLeftId': 'delayTestLeft',
                    'busRightId': 'delayTestRight',
                    'top': 400,
                    'left': 600
                }
            ],
            'filters': [
                {
                    'name': 'Testfilter',
                    'statement': 'x % 1000',
                    'busTopId': 'FilterTop',
                    'busBottomId': 'FilterBottom',
                    'top': 320,
                    'left': 400
                }
            ]
        };

        var i, j;
        for (i = 0; i < $scope.cpu.buses.length; i++) {
            $scope.cpu.buses[i].object = new Bus();
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
        for (i = 0; i < $scope.cpu.clocks.length; i++) {
            $scope.cpu.clocks[i].wire = $scope.findBus($scope.cpu.clocks[i].wireId);
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
            if ($scope.cpu.registers[i].clrWireId) {
                $scope.cpu.registers[i].clrWire = $scope.findBus($scope.cpu.registers[i].clrWireId);
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
        for (i = 0; i < $scope.cpu.bitregisters.length; i++) {
            $scope.cpu.bitregisters[i].widegate.bus = $scope.findBus($scope.cpu.bitregisters[i].widegate.busId);
            if ($scope.cpu.bitregisters[i].widegate.writeWireId) {
                $scope.cpu.bitregisters[i].widegate.writeWire = $scope.findBus($scope.cpu.bitregisters[i].widegate.writeWireId);
            }
            if ($scope.cpu.bitregisters[i].widegate.readWireId) {
                $scope.cpu.bitregisters[i].widegate.readWire = $scope.findBus($scope.cpu.bitregisters[i].widegate.readWireId);
            }
            for (j = 0; j < $scope.cpu.bitregisters[i].wiregates.length; j++) {
                $scope.cpu.bitregisters[i].wiregates[j].wire = $scope.findBus($scope.cpu.bitregisters[i].wiregates[j].wireId);
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
        for (i = 0; i < $scope.cpu.zerocomparators.length; i++) {
            $scope.cpu.zerocomparators[i].bus = $scope.findBus($scope.cpu.zerocomparators[i].busId);
            if ($scope.cpu.zerocomparators[i].wireId) {
                $scope.cpu.zerocomparators[i].wire = $scope.findBus($scope.cpu.zerocomparators[i].wireId);
            }
        }
        for (i = 0; i < $scope.cpu.delays.length; i++) {
            if ($scope.cpu.delays[i].busLeftId) {
                $scope.cpu.delays[i].busLeft = $scope.findBus($scope.cpu.delays[i].busLeftId);
            }
            if ($scope.cpu.delays[i].busRightId) {
                $scope.cpu.delays[i].busRight = $scope.findBus($scope.cpu.delays[i].busRightId);
            }
        }
        for (i = 0; i < $scope.cpu.filters.length; i++) {
            if ($scope.cpu.filters[i].busTopId) {
                $scope.cpu.filters[i].busTop = $scope.findBus($scope.cpu.filters[i].busTopId);
            }
            if ($scope.cpu.filters[i].busBottomId) {
                $scope.cpu.filters[i].busBottom = $scope.findBus($scope.cpu.filters[i].busBottomId);
            }
        }

        $scope.selectedEditor = undefined;
        $scope.selectEditor = function (index) {
            $scope.selectedEditor = index;
        };

        $scope.splitLines = function (string) {
            return string.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n")
        };
        $scope.readFile = function (memoryNumber) {
            var input = document.getElementById('filename-' + $scope.cpu.memories[memoryNumber].name);
            var file = input.files[0];
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                $scope.$apply(function () {
                    $scope.cpu.memories[memoryNumber].content = reader.result;
                    $scope.cpu.memories[memoryNumber].fileName = file.name;
                });
            });
            console.log(file);
            reader.readAsText(file);
        };
        $scope.saveFile = function (memoryNumber) {
            var url;
            var blob = new Blob([$scope.cpu.memories[memoryNumber].content], {type : 'application/bonsai'});
            if (window.webkitURL) {
                url = window.webkitURL.createObjectURL(blob);
            } else {
                url = window.URL.createObjectURL(blob);
            }
            // initiate download by adding a <a> element and invoking a click on it
            var downloadLink = document.createElement("a");
            downloadLink.href = url;
            if ($scope.cpu.memories[memoryNumber].fileName) {
                downloadLink.download = $scope.cpu.memories[memoryNumber].fileName
            } else {
                downloadLink.download = $scope.cpu.memories[memoryNumber].name + ".bonsai";
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