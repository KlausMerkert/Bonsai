'use strict';

bonsaiApp.directive('orgate', function ($interval) {
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
        controller: function ($scope) {
            $scope.logicGate = new OrGate($scope.inA, $scope.inB, $scope.out);

            $scope.topCSS = ($scope.top - 0.17) + 'em';
            $scope.leftCSS = $scope.left + 'em';

            $scope.getConnectionPositions = function (wire) {
                if (wire === $scope.inA) {
                    return [{top: $scope.top, left: ($scope.left + 1.37)}];
                } else if (wire === $scope.inB) {
                    return [{top: ($scope.top + 0.7), left: ($scope.left + 1.37)}];
                } else if (wire === $scope.out) {
                    return [{top: ($scope.top + 0.4), left: ($scope.left - 0.14)}];
                } else {
                    console.log("This Wire is not connected: " + wire.getName());
                }
            };

            // We have to wait for a very short time to enroll to the buses
            // because the wire needs to be fully initialized.
            $interval(function () {
                $scope.inA.connectToDirective($scope.logicGate, $scope.getConnectionPositions);
                $scope.inB.connectToDirective($scope.logicGate, $scope.getConnectionPositions);
            }, 1, 1);
        },
        link: function ($scope, element, attrs) {
            attrs.$observe('gateName', function() {
                if ($scope.gateName) {
                    $scope.logicGate.setName($scope.gateName);
                }
            });

            $scope.logicGate.getPositions = $scope.getConnectionPositions;
        },
        templateUrl: 'partials/component_OrGate.html'
    };
});