'use strict';

bonsaiApp.directive('simulation', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            example: '@'
        },
        controller: [
            '$scope', '$rootScope', 'ExampleStorage', 'BinaryProgram',
            function ($scope, $rootScope, ExampleStorage, BinaryProgram) {
            $scope.language = $rootScope.language;
            $scope.$on('langChange', function (event, newLang) {
                $scope.language = newLang;
            });

            $scope.getI18nName = function (data) {
                if (data[$scope.language] && 'name' in data[$scope.language]) {
                    return data[$scope.language]['name'];
                } else {
                    return data['name'];
                }
            };

            $scope.getI18nText = function (data) {
                if (data[$scope.language] && 'text' in data[$scope.language]) {
                    return data[$scope.language]['text'];
                } else {
                    return data['text'];
                }
            };

            $scope.getI18nTopOffset = function (data) {
                if (data[$scope.language] && 'top' in data[$scope.language] && data[$scope.language]['top']) {
                    return data[$scope.language]['top'];
                } else {
                    return 0;
                }
            };

            $scope.getI18nLeftOffset = function (data) {
                if (data[$scope.language] && 'left' in data[$scope.language] && data[$scope.language]['left']) {
                    return data[$scope.language]['left'];
                } else {
                    return 0;
                }
            };

            $scope.calculateComponentCount = function (cpu) {
                var componentCount = 0;
                angular.forEach(cpu, function (value, key) {
                    if (!(key in {'buses': '', 'labels': ''}) && (angular.isArray(value))) {
                        componentCount += value.length;
                    }
                });
                return componentCount;
            };

            $scope.loadBonsai = function () {
                var exampleGenerator = new ExampleGenerator();
                $scope.cpu = exampleGenerator.generateBonsai();
                var matcher = new BusMatcher($scope.cpu);
                matcher.createBuses();
                matcher.matchAllComponents();
                $scope.cpu = matcher.getCpu();
                $scope.componentCount = $scope.calculateComponentCount($scope.cpu);
                $scope.selectedEditor = undefined;
                $scope.loaded = true;
            };

            $scope.loadExample = function (exampleName) {
                ExampleStorage.loadExample(exampleName).success(function (data) {
                    $scope.initializedComponents = [];
                    $scope.cpu = angular.fromJson(data);
                    try {
                        var matcher = new BusMatcher($scope.cpu);
                        matcher.createBuses();
                        matcher.matchAllComponents();
                        $scope.cpu = matcher.getCpu();
                        $scope.componentCount = $scope.calculateComponentCount($scope.cpu);
                        $scope.loaded = true;
                    } catch (exception) {
                        $scope.clearCpu();
                        throw exception;
                    }
                    $scope.selectedEditor = undefined;
                }).error($scope.loadBonsai);
            };

            $scope.hasBinaryProgram = function () {
                return BinaryProgram.hasProgram();
            };

            $scope.loadFromAssembler = function (memoryNumber) {
                $scope.cpu.memories[memoryNumber].content = BinaryProgram.getProgram();
            };
        }],
        link: function ($scope, element, attrs) {
            $scope.base = 10;
            $scope.initializedComponents = [];
            $scope.cpu = {};

            attrs.$observe('example', function() {
                if ($scope.example) {
                    $scope.loadExample($scope.example);
                } else if (!$scope.loaded) {
                    $scope.loadBonsai();
                }
            });

            $scope.$watch('cpu', function (newCpu) {
                $scope.componentCount = $scope.calculateComponentCount(newCpu);
            });

            $scope.$on('componentInitialized', function (event, modelObject) {
                $scope.initializedComponents.push(modelObject);
                event.stopPropagation();
                if ($scope.initializedComponents.length >= $scope.componentCount) {
                    $scope.$broadcast('sendInitialValues', true);
                }
            });

            $scope.getMousePosition = function($event) {
                if ($scope.editMode) {
                    var componentsDiv = $event.target;
                    while (!angular.element(componentsDiv).hasClass('components') && (componentsDiv != document.body)) {
                        componentsDiv = componentsDiv.parentNode;
                    }
                    $scope.MouseX = $event.clientX - Math.round(componentsDiv.getBoundingClientRect().left) - 2;
                    $scope.MouseY = $event.clientY - Math.round(componentsDiv.getBoundingClientRect().top) - 3;
                }
            };

            $scope.selectEditor = function (index) {
                $scope.selectedEditor = index;
            };

            $scope.splitLines = function (string) {
                return string.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n")
            };
            $scope.openFilePickerForMemory = function (editorName, index) {
                $scope.cpuFileName = undefined;
                var input = document.getElementById('filename-'+editorName);
                // This hack resets the input.
                try {
                    input.value = '';
                    if(input.value){
                        input.type = "text";
                        input.type = "file";
                    }
                } catch(e) {}
                // End of the reset hack.
                $scope.readMemoryNumber = index;
                input.click();
            };
            $scope.readFile = function () {
                var memoryNumber = $scope.readMemoryNumber;
                $scope.readMemoryNumber = undefined;
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

            $scope.getCpuFilenameInput = function (element) {
                while (element != document.body) {
                    for (var i = 0; i < element.parentNode.childNodes.length; i++) {
                        if ((element.parentNode.childNodes[i].type == 'file') &&
                            angular.element(element.parentNode.childNodes[i]).hasClass('cpu-filename')) {
                            return element.parentNode.childNodes[i];
                        }
                    }
                    element = element.parentNode;
                }
                return null;
            };

            $scope.openFilePicker = function ($event) {
                $scope.cpuFileName = undefined;
                $scope.cpuFileNameInput = $scope.getCpuFilenameInput($event.target);
                if ($scope.cpuFileNameInput) {
                    // This hack resets the input.
                    try {
                        $scope.cpuFileNameInput.value = '';
                        if ($scope.cpuFileNameInput.value) {
                            $scope.cpuFileNameInput.type = "text";
                            $scope.cpuFileNameInput.type = "file";
                        }
                    } catch (e) {
                    }
                    // End of the reset hack.
                    $scope.cpuFileNameInput.click();
                } else {
                    console.log("Could not find the matching file input element. File loading aborted.");
                }
            };

            $scope.loadCpu = function () {
                $scope.$apply(function () {
                    $scope.clearCpu();
                    var file = $scope.cpuFileNameInput.files[0];
                    var reader = new FileReader();
                    reader.addEventListener("loadend", function () {
                        $scope.$apply(function () {
                            $scope.initializedComponents = [];
                            $scope.cpu = angular.fromJson(reader.result);
                            try {
                                var matcher = new BusMatcher($scope.cpu);
                                matcher.createBuses();
                                matcher.matchAllComponents();
                                $scope.cpu = matcher.getCpu();
                                $scope.componentCount = $scope.calculateComponentCount($scope.cpu);
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
                var oneOfMyComponents = false;
                for (var i = 0; i < $scope.initializedComponents.length; i++) {
                    if (message.thrower == $scope.initializedComponents[i]) {
                        oneOfMyComponents = true;
                    }
                }
                if ($scope.cpu['buses']) {
                    for (i = 0; i < $scope.cpu['buses'].length; i++) {
                        if (message.thrower == $scope.cpu['buses'][i].object) {
                            oneOfMyComponents = true;
                        }
                    }
                }
                if (oneOfMyComponents) {
                    $scope.errors.push(message);
                }
            });
        },
        templateUrl: '/partials/simulation.html'
    };
});