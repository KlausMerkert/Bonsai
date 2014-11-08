'use strict';

bonsaiApp.controller('bonsaiAssemblerCtrl',
    function ($scope, $timeout) {
        $scope.splitLines = function (string) {
            return string.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n")
        };

        $scope.program = "inc 14\ndec 12";
        $scope.data = "Hallo\nWelt!";

        $scope.$watch('program', function (newText, oldText) {
            var lines = $scope.splitLines(newText);
            $scope.formattedProgram = [];
            angular.forEach(lines, function (line) {
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
                    if (matches[1] == 'in') { completion = 'c' }
                    if (matches[1] == 'i') { completion = 'nc' }
                    if (matches[1] == 'de') { completion = 'c' }
                    if (matches[1] == 'd') { completion = 'ec' }
                    if (matches[1] == 'ts') { completion = 't' }
                    if (matches[1] == 't') { completion = 'st' }
                    if (matches[1] == 'jm') { completion = 'p' }
                    if (matches[1] == 'j') { completion = 'mp' }
                    $scope.formattedProgram.push({
                        command: matches[1],
                        completion: completion,
                        address: ''
                    })
                } else {
                    $scope.formattedProgram.push({
                        command: '',
                        completion: '',
                        address: ''
                    })
                }}}
            });
            console.log($scope.formattedProgram);
        });

        $scope.$watch('data', function (newText, oldText) {

        });
    }
);