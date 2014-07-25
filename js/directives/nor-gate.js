'use strict';

bonsaiApp.directive('norgate', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            inA: '=',
            inB: '=',
            out: '=',
            top: '=',
            left: '=',
            gateName: '@'
        },
        link: function ($scope, element, attrs) {
            $scope.logicGate = new NorGate($scope.inA, $scope.inB, $scope.out);

            $scope.topCSS = ($scope.top - 3) + 'px';
            $scope.leftCSS = $scope.left + 'px';

            attrs.$observe('gateName', function() {
                if ($scope.gateName) {
                    $scope.logicGate.setName($scope.gateName);
                }
            });

            $scope.getConnectionPositions = function (wire) {
                if (wire === $scope.inA) {
                    return [{top: $scope.top, left: ($scope.left + 22)}];
                } else if (wire === $scope.inB) {
                    return [{top: ($scope.top + 11), left: ($scope.left + 22)}];
                } else if (wire === $scope.out) {
                    return [{top: ($scope.top + 6), left: ($scope.left - 10)}];
                } else {
                    console.log("This Wire is not connected: " + wire.getName());
                }
            };

            // We have to wait for a very short time to enroll to the buses
            // because the wire needs to be fully initialized.
            $interval(function () {
                if ($scope.inA) {
                    $scope.inA.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                    $scope.inA.registerReaderAndRead($scope.logicGate);
                }
                if ($scope.inB) {
                    $scope.inB.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                    $scope.inB.registerReaderAndRead($scope.logicGate);
                }
                if ($scope.out) {
                    $scope.out.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                }
                $scope.logicGate.setValue();
            }, 1, 1);
        },
        templateUrl: 'partials/component_NorGate.html'
    };
});