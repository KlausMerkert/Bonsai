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
                    'top': 5.75,
                    'left': 22
                }, {
                    'id': 'addressBus',
                    'name': 'Adressbus',
                    'max': 255,
                    'base': 10,
                    'color': 'rgb(0, 0, 225)',
                    'top': 5.75,
                    'left': 22
                }, {
                    'id': 'testBus',
                    'name': 'Testbus',
                    'max': 1
                }
            ],
            'manualswitches': [
                {
                    'wireId': 'testBus',
                    'name': 'Lena',
                    'value': 0,
                    'top': 10,
                    'left': 5
                }
            ],
            'leds': [
                {
                    'wireId': 'testBus',
                    'name': 'Hugo',
                    'value': 0,
                    'top': 10,
                    'left': 1
                }, {
                    'wireId': 'testBus',
                    'name': 'Heinrich',
                    'value': 0,
                    'top': 11,
                    'left': 2
                }
            ],
            'registers': [
                {
                    'name': 'Register B',
                    'value': 10,
                    'base' : 10,
                    'top' : 4,
                    'left': 15,
                    'gates': [
                        {'busId': 'addressBus'},
                        {'busId': 'dataBus'}
                    ]
                }, {
                    'name': 'Register C',
                    'value': 1,
                    'base' : 10,
                    'top' : 3,
                    'left': 25,
                    'gates': [
                        {'busId': 'addressBus'},
                        {'busId': 'dataBus'}
                    ]
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
        for (i = 0; i < $scope.cpu.registers.length; i++) {
            for (j = 0; j < $scope.cpu.registers[i].gates.length; j++) {
                $scope.cpu.registers[i].gates[j].bus = $scope.findBus($scope.cpu.registers[i].gates[j].busId);
            }
        }

        $scope.editors = [
            {
                'name': "Speicher",
                'content': "1\n2\n3"
            },
            {
                'name': "Befehlsdecoder",
                'content': "4\n5\n6\n7"
            },
            {
                'name': "Mikroprogramm",
                'content': "8\n9\n10"
            }
        ];
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

        //$scope.dataBus = new Bus();
        //$scope.addressBus = new Bus();
        //$scope.testBus = new Bus();

        $scope.wire1a = new ControlWire();
        $scope.wire1b = new ControlWire();
        $scope.wire1 = new ControlWire();
        $scope.wire2 = new ControlWire();
        $scope.wire3 = new ControlWire();
        $scope.wire4 = new ControlWire();
        $scope.wire5 = new ControlWire();
        $scope.wire6 = new ControlWire();

        $scope.errors = [];
        $scope.$on('error', function (event, message) {
            $scope.errors.push(message)
        });
    }
);