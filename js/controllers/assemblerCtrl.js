'use strict';

bonsaiApp.controller('bonsaiAssemblerCtrl',
    function ($scope, $timeout) {
        $scope.splitLines = function (string) {
            return string.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n")
        };

        $scope.program = [
            {
                instruction: 'in',
                codecompletion: 'c',
                address: 14
            },
            {
                instruction: 'de',
                codecompletion: 'c',
                address: 13
            }
        ];
        $scope.data = "Hallo\nWelt!";

        $scope.editProgram = function ($event) {
            //console.log(String.fromCharCode($event.keyCode));
            $timeout(function () {
                var StrippedProgram = $event.target.innerHTML.replace(/(<([^>]+)>)/ig," ");
                console.log($scope.splitLines($event.target.innerHTML));
            }, 0);
        };

        $scope.$watch('data', function (newText, oldText) {

        });
    }
);