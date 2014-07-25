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

            $scope.topCSS = ($scope.top - 3) + 'px';
            $scope.leftCSS = $scope.left + 'px';

            $scope.getConnectionPositions = function (wire) {
                if (wire === $scope.inA) {
                    return [{top: $scope.top, left: ($scope.left + 22)}];
                } else if (wire === $scope.inB) {
                    return [{top: ($scope.top + 11), left: ($scope.left + 22)}];
                } else if (wire === $scope.out) {
                    return [{top: ($scope.top + 6), left: ($scope.left - 2)}];
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