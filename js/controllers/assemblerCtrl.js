'use strict';

bonsaiApp.controller('bonsaiAssemblerCtrl',
    function ($scope, $timeout, $rootScope, BinaryProgram) {
        $scope.splitLines = function (string) {
            return string.replace(/\r\n|\n\r|\n|\r/g, "\n").split("\n")
        };

        $scope.isNumber = function (data) {
            if (isNaN(parseInt(data))) {
                return false;
            }
            return angular.isNumber(parseInt(data));
        };

        $scope.getLineNumbers = function (dataString) {
            if (!angular.isString(dataString)) {
                dataString = '';
            }
            var lines = $scope.splitLines(dataString);
            var lineNumbers = [];
            for (var i = 0; i < lines.length; i++) {
                lineNumbers.push(i);
            }
            return lineNumbers;
        };

        $scope.program = "tst 1\njmp 5\ndec 1\ninc 0\njmp 0\nhlt";
        $scope.data = "3\n5";

        $scope.$watch('program', function (newText, oldText) {
            var lines = $scope.splitLines(newText);
            $scope.formattedProgram = [];
            angular.forEach(lines, function (line, index) {
                var matches = line.match(/^(inc|dec|tst|jmp)[ \t](\d+)([ \t]+;.*)?$/);
                if (matches) { // complete and correct line for commands with addresses
                    $scope.formattedProgram.push({
                        command: matches[1],
                        completion: '',
                        address: matches[2],
                        correct: true
                    });
                    return null;
                }
                matches = line.match(/^(hlt)[ \t]*([ \t];.*)?$/);
                if (matches) { // complete and correct line for hlt command
                    $scope.formattedProgram.push({
                        command: matches[1],
                        completion: '',
                        address: '',
                        correct: true
                    });
                    return null;
                }
                matches = line.match(/^[ \t]*;(.*)$/);
                if (matches) { // comment
                    $scope.formattedProgram.push({
                        command: '',
                        completion: '',
                        address: '',
                        correct: true
                    });
                    return null;
                }
                matches = line.match(/^(inc|dec|tst|jmp)[ \t]?$/);
                if (matches) { // incomplete line without completion
                    $scope.formattedProgram.push({
                        command: matches[1],
                        completion: '',
                        address: ''
                    });
                    return null;
                }
                matches = line.match(/^(in?|de?|ts?|jm?|hl?)$/);
                if (matches) { // incomplete line with completion
                    var completion = '';
                    if (matches[1] == 'in') {
                        completion = 'c'
                    }
                    if (matches[1] == 'i') {
                        completion = 'nc'
                    }
                    if (matches[1] == 'de') {
                        completion = 'c'
                    }
                    if (matches[1] == 'd') {
                        completion = 'ec'
                    }
                    if (matches[1] == 'ts') {
                        completion = 't'
                    }
                    if (matches[1] == 't') {
                        completion = 'st'
                    }
                    if (matches[1] == 'jm') {
                        completion = 'p'
                    }
                    if (matches[1] == 'j') {
                        completion = 'mp'
                    }
                    if (matches[1] == 'hl') {
                        completion = 't'
                    }
                    if (matches[1] == 'h') {
                        completion = 'lt'
                    }
                    $scope.formattedProgram.push({
                        command: matches[1],
                        completion: completion,
                        address: ''
                    });
                    return null;
                }
                if ((oldText) && ($scope.splitLines(oldText)[index])) {
                    matches = $scope.splitLines(oldText)[index].match(/^(in?|de?|ts?|jm?|hl?)$/);
                    if (matches) {
                        var numberMatches = line.match(/^(in?|de?|ts?|jm?|hl?)([ \t]+)?(\d+)?$/);
                        if (numberMatches) {
                            var insertCommand = function (lineNumber, command, address) {
                                var countedLines = 0;
                                for (var i = 0; i < $scope.program.length; i++) {
                                    if (countedLines == lineNumber) {
                                        var delIndex = $scope.program.indexOf("\n", i);
                                        if (delIndex < 0) {
                                            delIndex = $scope.program.length - 1;
                                        }
                                        $scope.program = $scope.program.slice(0, i) +
                                            command + ' ' + address + "\n" +
                                            $scope.program.slice(delIndex + 1);
                                        return null;
                                    }
                                    if ($scope.program[i] == "\n") {
                                        countedLines++;
                                    }
                                }
                            };
                            var address = '';
                            if (numberMatches[3]) {
                                address = numberMatches[3];
                            }
                            if (numberMatches[1][0] == 'i') {
                                insertCommand(index, 'inc', address);
                            }
                            if (numberMatches[1][0] == 'd') {
                                insertCommand(index, 'dec', address);
                            }
                            if (numberMatches[1][0] == 't') {
                                insertCommand(index, 'tst', address);
                            }
                            if (numberMatches[1][0] == 'j') {
                                insertCommand(index, 'jmp', address);
                            }
                            if (numberMatches[1][0] == 'h') {
                                insertCommand(index, 'hlt', '');
                            }
                        }
                    }
                }
                $scope.formattedProgram.push({
                    command: '',
                    completion: '',
                    address: ''
                });
                return null;
            });
        });

        $scope.$watch('formattedProgram', function () {
            $timeout(function () {
                $scope.programHeight = document.getElementById('formattedProgram').clientHeight - 4 + 'px';
            }, 0);
        });

        $scope.$watch('data', function (newText) {
            var number, separationMatches, show;
            var dataArray = [];
            while (newText.indexOf("\n") >= 0) {
                separationMatches = newText.match(/^(\d*)[ \t]*(;[^\n]*)?(\n([\s\S]*))?$/);
                if (separationMatches) {
                    number = parseInt(separationMatches[1]);
                    newText = separationMatches[4];
                    show = true;
                    if (isNaN(number)) {
                        number = 0;
                        show = false;
                    }
                    dataArray.push({
                        number: number,
                        correct: true,
                        show: show
                    });
                } else {
                    separationMatches = newText.match(/^([^\n]*)(\n([\s\S]*))?$/);
                    newText = separationMatches[3];
                    dataArray.push({
                        number: 0,
                        correct: false,
                        show: false
                    });
                }
            }
            separationMatches = newText.match(/^(\d*)[ \t]*(;[^\n]*)?(\n([\s\S]*))?$/);
            if (separationMatches) {
                number = parseInt(separationMatches[1]);
                show = true;
                if (isNaN(number)) {
                    number = 0;
                    show = false;
                }
                dataArray.push({
                    number: number,
                    correct: true,
                    show: show
                });
            } else {
                dataArray.push({
                    number: 0,
                    correct: false,
                    show: false
                });
            }
            $scope.listedData = dataArray;
        });

        $scope.$watch('nextExecutionPosition', function (newValue) {
            if (!(angular.isNumber(newValue) || typeof newValue == 'undefined')) {
                $scope.executionPosition = undefined;
                $scope.nextExecutionPosition = undefined;
            }
        });

        $scope.convertListedData = function (data) {
            var lines = $scope.splitLines($scope.data);
            var matches, newData = '';
            for (var i = 0; i < lines.length; i++) {
                matches = lines[i].match(/^(\d*)([ \t]*)(;.*)?$/);
                if (matches) {
                    if (i < data.length && data[i].show) {
                        newData = newData + data[i].number;
                    } else {
                        newData = newData + matches[1];
                    }
                    if (matches[3]) {
                        newData = newData + matches[2] + matches[3];
                    }
                } else {
                    newData = newData + lines[i];
                }
                if (i < data.length - 1) {
                    newData = newData + "\n";
                }
            }
            i++;
            while (i < data.length) {
                newData = newData + data[i].length;
                if (i < data.length - 1) {
                    newData = newData + "\n";
                }
                i++;
            }
            return newData;
        };

        $scope.startAutomaticExecution = function () {
            $scope.executionRunning = true;
            $scope.automaticStep();
        };

        $scope.pauseAutomaticExecution = function () {
            $scope.executionRunning = false;
        };

        $scope.stopAndReset = function () {
            $scope.executionRunning = false;
            $scope.executionPosition = undefined;
            $scope.nextExecutionPosition = undefined;
        };

        $scope.step = function () {
            if (angular.isNumber($scope.executionPosition)) {
                $scope.executionPosition = $scope.nextExecutionPosition;
            } else {
                $scope.executionPosition = -1;
                $scope.nextExecutionPosition = 0;
            }
            if ($scope.executionPosition >= $scope.formattedProgram.length) {
                $scope.stopAndReset();
                return null;
            }
            if ($scope.executionPosition < 0) {
                return null;
            }
            var command = $scope.formattedProgram[$scope.executionPosition];
            if (command.correct) {
                if (command.command == 'inc') {
                    if (command.address >= $scope.listedData.length) {
                        $scope.errors.push({
                            lineNo: $scope.executionPosition,
                            message: '_addressNotInDataError_'
                        });
                        return null;
                    }
                    $scope.listedData[parseInt(command.address)].number++;
                    $scope.data = $scope.convertListedData($scope.listedData);
                    $scope.nextExecutionPosition++;
                } else if (command.command == 'dec') {
                    if (command.address >= $scope.listedData.length) {
                        $scope.errors.push({
                            lineNo: $scope.executionPosition,
                            message: '_addressNotInDataError_'
                        });
                        return null;
                    }
                    $scope.listedData[parseInt(command.address)].number--;
                    $scope.data = $scope.convertListedData($scope.listedData);
                    $scope.nextExecutionPosition++;
                } else if (command.command == 'jmp') {
                    if (0 < command.address >= $scope.formattedProgram.length) {
                        $scope.errors.push({
                            lineNo: $scope.executionPosition,
                            message: '_addressNotInProgramError_'
                        });
                        return null;
                    }
                    $scope.nextExecutionPosition = parseInt(command.address);
                } else if (command.command == 'tst') {
                    if ($scope.listedData[parseInt(command.address)].number == 0) {
                        if ($scope.nextExecutionPosition + 1 >= $scope.formattedProgram.length) {
                            $scope.errors.push({
                                lineNo: $scope.executionPosition,
                                message: '_addressNotInProgramError_'
                            });
                            return null;
                        }
                        $scope.nextExecutionPosition++;
                    } else {
                        if ($scope.nextExecutionPosition + 2 >= $scope.formattedProgram.length) {
                            $scope.errors.push({
                                lineNo: $scope.executionPosition,
                                message: '_addressNotInProgramError_'
                            });
                            return null;
                        }
                        $scope.nextExecutionPosition += 2;
                    }
                } else if (command.command == 'hlt') {
                    $scope.stopAndReset();
                    return null;
                }
            }
        };

        $scope.automaticStep = function () {
            if ($scope.executionRunning) {
                $scope.step();
                $timeout($scope.automaticStep, $scope.delayTime);
            }
        };

        $scope.openFilePicker = function () {
            $scope.cpuFileName = undefined;
            var input = document.getElementById('filename');
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

        $scope.load = function () {
            $scope.$apply(function () {
                $scope.stopAndReset();
                var input = document.getElementById('filename');
                var file = input.files[0];
                var reader = new FileReader();
                reader.addEventListener("loadend", function () {
                    $scope.$apply(function () {
                        var lines = $scope.splitLines(reader.result);
                        $scope.program = '';
                        $scope.data = '';
                        for (var i = 0; i < lines.length; i++) {
                            var dataMatches = lines[i].match(/^[ \t]*#(.*)?$/);
                            if (dataMatches) {
                                if ($scope.data.length > 0) {
                                    $scope.data = $scope.data + "\n" + dataMatches[1];
                                } else {
                                    $scope.data = dataMatches[1];
                                }
                            } else {
                                if ($scope.program.length > 0) {
                                    if (!(i == lines.length -1 && lines[i].length == 0)) {
                                        $scope.program = $scope.program + "\n" + lines[i];
                                    }
                                } else {
                                    $scope.program = lines[i];
                                }
                            }
                        }
                        $scope.assemblerFileName = file.name;
                    });
                });
                reader.readAsText(file);
            });
        };

        $scope.save = function () {
            var content = $scope.program + "\n";
            var dataLines = $scope.splitLines($scope.data);
            for (var i = 0; i < dataLines.length; i++) {
                content = content + '#' + dataLines[i];
                if (i < dataLines.length - 1) {
                    content = content + "\n";
                }
            }
            var fs = new FileSaver(content, "program.bon", $scope.assemblerFileName);
            fs.save();
        };

        $scope.fourRoot = function (x) {
            return Math.sqrt(Math.sqrt(Math.sqrt(Math.sqrt(x))));
        };

        $scope.square = function (x) {
            return x*x;
        };

        $scope.compile = function () {
            var dataOffset = $scope.formattedProgram.length;
            var compiled = '';
            angular.forEach($scope.formattedProgram, function (programLine) {
                var address = parseInt(programLine.address);
                var opcode = '0';
                if (programLine.command == 'dec') {
                    opcode = '1';
                    address = address + dataOffset;
                }
                if (programLine.command == 'inc') {
                    opcode = '2';
                    address = address + dataOffset;
                }
                if (programLine.command == 'jmp') {
                    opcode = '3';
                }
                if (programLine.command == 'tst') {
                    opcode = '4';
                    address = address + dataOffset;
                }
                if (programLine.command == 'hlt') {
                    opcode = '5';
                }
                if (isNaN(address)) {
                    address = '0000';
                } else {
                    address = address.toString();
                }
                while (address.length < 4) {
                    address = '0' + address;
                }
                compiled = compiled + opcode + address + "\n"
            });
            angular.forEach($scope.listedData, function (dataLine, index) {
                compiled = compiled + dataLine.number.toString();
                if (index < $scope.listedData.length - 1) {
                    compiled = compiled + "\n";
                }
            });
            $scope.compiledProgram = compiled;
            BinaryProgram.setProgram(compiled);
        };

        $scope.delayTime = 0;
        $scope.errors = [];

        $rootScope.viewsCount = 42;
        $rootScope.lastChange = Date.now();

        $scope.$watch('author', function (author) {
            $rootScope.author = author;
        });
    }
);