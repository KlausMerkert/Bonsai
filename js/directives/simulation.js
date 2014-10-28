'use strict';

bonsaiApp.directive('simulation', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            example: '@'
        },
        controller: ['$scope', 'ExampleStorage', function ($scope, ExampleStorage) {
            $scope.loadBonsai = function () {
                var exampleGenerator = new ExampleGenerator();
                $scope.cpu = exampleGenerator.generateBonsai();
                var matcher = new BusMatcher($scope.cpu);
                matcher.createBuses();
                matcher.matchAllComponents();
                $scope.selectedEditor = undefined;
            };

            $scope.loadExample = function (exampleName) {
                ExampleStorage.loadExample(exampleName).success(function (data) {
                    $scope.initializedComponentCount = 0;
                    $scope.cpu = angular.fromJson(data);
                    try {
                        var matcher = new BusMatcher($scope.cpu);
                        matcher.createBuses();
                        matcher.matchAllComponents();
                        $scope.cpu = matcher.getCpu();
                    } catch (exception) {
                        $scope.clearCpu();
                        throw exception;
                    }
                    $scope.selectedEditor = undefined;
                }).error($scope.loadBonsai);
            };
        }],
        link: function ($scope, element, attrs) {
            $scope.base = 10;
            $scope.initializedComponentCount = 0;

            $scope.cpu = {};
            if ($scope.example) {
                $scope.loadExample($scope.example);
            } else {
                $scope.loadBonsai();
            }

            attrs.$observe('example', function() {
                if ($scope.example) {
                    $scope.loadExample($scope.example);
                }
            });

            $scope.$watch('cpu', function (newCpu) {
                var componentCount = 0;
                angular.forEach(newCpu, function (value, key) {
                    if (!(key in {'buses': '', 'labels': ''}) && (angular.isArray(value))) {
                        componentCount += value.length;
                    }
                });
                $scope.componentCount = componentCount;
            });

            $scope.$on('componentInitialized', function () {
                $scope.initializedComponentCount++;
                if ($scope.initializedComponentCount >= $scope.componentCount) {
                    $scope.$broadcast('sendInitialValues', true);
                }
            });

            $scope.getMousePosition = function($event) {
                var getOffset = function( el ) {
                    var _x = 0;
                    var _y = 0;
                    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                        _x += el.offsetLeft - el.scrollLeft;
                        _y += el.offsetTop - el.scrollTop;
                        el = el.offsetParent;
                    }
                    return { top: _y, left: _x };
                };
                if ($scope.editMode) {
                    var offset = getOffset(document.getElementById('CpuCanvas'));
                    $scope.MouseX = $event.clientX - offset.left - 1;
                    $scope.MouseY = $event.clientY - offset.top - 3;
                }
            };

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
                $scope.initializedComponentCount = 0;
                $scope.cpu = {};
            };

            $scope.openFilePicker = function () {
                $scope.cpuFileName = undefined;
                var input = document.getElementById('cpu-filename');
                // This hack resets the input.
                try {
                    input.value = '';
                    if(input.value){
                        input.type = "text";
                        input.type = "file";
                    }
                } catch(e) {}
                // End of the reset hack.
                input.click();
            };

            $scope.loadCpu = function () {
                $scope.$apply(function () {
                    $scope.clearCpu();
                    var input = document.getElementById('cpu-filename');
                    var file = input.files[0];
                    var reader = new FileReader();
                    reader.addEventListener("loadend", function () {
                        $scope.$apply(function () {
                            $scope.initializedComponentCount = 0;
                            $scope.cpu = angular.fromJson(reader.result);
                            try {
                                var matcher = new BusMatcher($scope.cpu);
                                matcher.createBuses();
                                matcher.matchAllComponents();
                                $scope.cpu = matcher.getCpu();
                            } catch (exception) {
                                $scope.clearCpu();
                                throw exception;
                            }
                            $scope.selectedEditor = undefined;
                            $scope.cpuFileName = file.name;
                        });
                    });
                    reader.readAsText(file);
                });
            };

            $scope.saveCpu = function () {
                var fs = new FileSaver($scope.cpu, "bonsai.json", $scope.cpuFileName);
                fs.cpuToJson();
                fs.save();
            };

            $scope.errors = [];
            $scope.$on('error', function (event, message) {
                $scope.errors.push(message)
            });
        },
        templateUrl: '/partials/simulation.html'
    };
});