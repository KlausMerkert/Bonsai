'use strict';

bonsaiApp.controller('bonsaiCpuCtrl',
    function ($scope, $location) {
        $scope.base = 10;

        var exampleGenerator = new ExampleGenerator();
        if ($location.search()['example'] == 'singleregister') {
            $scope.cpu = exampleGenerator.generateSingleRegister();
        } else if ($location.search()['example'] == 'registertransfer') {
            $scope.cpu = exampleGenerator.generateRegisterTransfer();
        } else if ($location.search()['example'] == 'manual') {
            $scope.cpu = exampleGenerator.generateManualBonsai();
        } else {
            $scope.cpu = exampleGenerator.generateBonsai();
        }

        var matcher = new BusMatcher($scope.cpu);
        matcher.createBuses();
        matcher.matchAllComponents();

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
            reader.readAsText(file);
        };
        $scope.saveFile = function (memoryNumber) {
            var fs = new FileSaver(
                $scope.cpu.memories[memoryNumber].content,
                $scope.cpu.memories[memoryNumber].name + ".bonsai",
                $scope.cpu.memories[memoryNumber].fileName
            );
            fs.save();
        };

        $scope.toggleEditMode = function () {
            $scope.editMode = !$scope.editMode;
        };

        $scope.clearCpu = function () {
            $scope.cpu = {};
        };

        $scope.loadCpu = function () {
            $scope.clearCpu();
            var input = document.getElementById('cpu-filename');
            var file = input.files[0];
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                $scope.$apply(function () {
                    $scope.cpu = angular.fromJson(reader.result);
                    var matcher = new BusMatcher($scope.cpu);
                    matcher.createBuses();
                    matcher.matchAllComponents();
                    $scope.cpu = matcher.getCpu();
                    $scope.selectedEditor = undefined;
                    $scope.cpuFileName = file.name;
                });
            });
            reader.readAsText(file);
        };
        $scope.saveCpu = function () {
            var fs = new FileSaver($scope.cpu, "bonsai.cpu", $scope.cpuFileName);
            fs.cpuToJson();
            fs.save();
        };

        $scope.errors = [];
        $scope.$on('error', function (event, message) {
            $scope.errors.push(message)
        });
    }
);