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
        $scope.readFile = function (input, editor) {
            console.log(input);
            var file = (input.srcElement || input.target).files[0];
            //fileReader.readAsDataUrl($scope.file, $scope)
            //          .then(function(result) {
            //              $scope.imageSrc = result;
            //          });

            //var file = files[0];
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                editor.content = reader.result;
                $scope.updateSaveLink(editor);
            });
            console.log(file);
            console.log(typeof file);
            reader.readAsText(file);
        };
        $scope.updateSaveLink = function (editor) {
            var blob = new Blob([editor.content], {type : 'text/plain'});
            editor.saveLink = URL.createObjectURL(blob);
        };
        for (var i = 0; i < $scope.editors.length; i++) {
            $scope.updateSaveLink($scope.editors[i]);
        }

        $scope.dataBus = new Bus();
        $scope.addressBus = new Bus();

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