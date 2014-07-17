'use strict';

bonsaiApp.directive('andgate', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            inA: '=',
            inB: '=',
            out: '=',
            top: '=',
            left: '='
        },
        controller: function ($scope) {
            $scope.logicGate = new AndGate($scope.out);
            $scope.topCSS = $scope.top + 'em';
            $scope.leftCSS = $scope.left + 'em';

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top, left: $scope.left}];
            };

            // We have to wait for a very short time to enroll to the buses
            // because the wire needs to be fully initialized.
            $interval(function () {
                $scope.inA.connectToDirective($scope.logicGate, $scope.getConnectionPositions);
                $scope.inB.connectToDirective($scope.logicGate, $scope.getConnectionPositions);
            }, 1, 1);
        },
        templateUrl: 'partials/component_AndGate.html'
    };
});