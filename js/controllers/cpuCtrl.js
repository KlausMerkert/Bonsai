'use strict';

bonsaiApp.controller('bonsaiCpuCtrl',
    function ($scope, $routeParams) {
        $scope.base = 10;

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

        $scope.dataBus = new Bus();
        $scope.addressBus = new Bus();
        $scope.testBus = new Bus();

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