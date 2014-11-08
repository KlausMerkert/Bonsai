'use strict';

bonsaiApp.controller('bonsaiAssemblerCtrl',
    function ($scope, $timeout) {
        $scope.splitLines = function (string) {
            return string.replace(/\r\n|\n\r|\n|\r/g, "\n").split("\n")
        };

        $scope.program = "inc 14\ndec 12";
        $scope.data = "Hallo\nWelt!";

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

        $scope.$watch('data', function (newText, oldText) {

        });
    }
);