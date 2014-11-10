'use strict';

bonsaiApp.controller('bonsaiAssemblerCtrl',
    function ($scope, $timeout) {
        $scope.splitLines = function (string) {
            return string.replace(/\r\n|\n\r|\n|\r/g, "\n").split("\n")
        };

        $scope.program = "tst 1\njmp 5\ndec 1\ninc 0\njmp 0\njmp 5";
        $scope.data = "3\n5";

        $scope.$watch('program', function (newText, oldText) {
            var lines = $scope.splitLines(newText);
            $scope.formattedProgram = [];
            angular.forEach(lines, function (line, index) {
                var matches = line.match(/^(inc|dec|tst|jmp)[ \t](\d+)$/);
                if (matches) { // complete and correct line
                    $scope.formattedProgram.push({
                        command: matches[1],
                        completion: '',
                        address: matches[2],
                        correct: true
                    })
                } else {
                    matches = line.match(/^(inc|dec|tst|jmp)[ \t]?$/);
                    if (matches) { // incomplete line without completion
                        $scope.formattedProgram.push({
                            command: matches[1],
                            completion: '',
                            address: ''
                        })
                    } else {
                        matches = line.match(/^(in?|de?|ts?|jm?)$/);
                        if (matches) { // incomplete line without completion
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
                            $scope.formattedProgram.push({
                                command: matches[1],
                                completion: completion,
                                address: ''
                            })
                        } else {
                            if ((oldText) && ($scope.splitLines(oldText)[index])) {
                                matches = $scope.splitLines(oldText)[index].match(/^(in?|de?|ts?|jm?)$/);
                                if (matches) {
                                    var numberMatches = line.match(/^(in?|de?|ts?|jm?)([ \t]+)?(\d+)?$/);
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
                                                        command + ' ' + address +
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
                                    }
                                }
                            }
                            $scope.formattedProgram.push({
                                command: '',
                                completion: '',
                                address: ''
                            });
                        }
                    }
                }
            });
        });

        $scope.$watch('formattedProgram', function () {
            $timeout(function () {
                $scope.programHeight = document.getElementById('formattedProgram').clientHeight - 4 + 'px';
            }, 0);
        });

        $scope.$watch('data', function (newText) {
            var number, line, newlinePosition;
            var dataArray = [];
            while (newText.indexOf("\n") >= 0) {
                newlinePosition = newText.indexOf("\n");
                line = newText.slice(0, newlinePosition);
                newText = newText.slice(newlinePosition + 1);
                number = parseInt(line);
                if (isNaN(number)) {
                    number = 0;
                }
                dataArray.push(number);
            }
            number = parseInt(newText);
            if (isNaN(number)) {
                number = 0;
            }
            dataArray.push(number);
            $scope.data = $scope.convertListedData(dataArray);
            $scope.listedData = dataArray;
        });

        $scope.convertListedData = function (data) {
            var string = '';
            for (var i = 0; i < data.length; i++) {
                string = string + data[i];
                if (i < data.length - 1) {
                    string = string + "\n";
                }
            }
            return string;
        };

        $scope.startAutomaticExecution = function () {
            $scope.executionRunning = true;
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
                    $scope.listedData[parseInt(command.address)]++;
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
                    $scope.listedData[parseInt(command.address)]--;
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
                    if ($scope.listedData[parseInt(command.address)] == 0) {
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
                }
            }
        };

        $scope.errors = [];
    }
);