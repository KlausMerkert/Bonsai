'use strict';

bonsaiApp.directive('andgate', function () {
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
            $scope.logicGate = new AndGate($scope.inA, $scope.inB, $scope.out);

            $scope.topCSS = ($scope.top - 3) + 'px';
            $scope.leftCSS = $scope.left + 'px';

            attrs.$observe('gateName', function() {
                if ($scope.gateName) {
                    $scope.logicGate.setName($scope.gateName);
                }
            });

            $scope.getConnectionPositions = function (wire) {
                if (wire === $scope.inA) {
                    return [{top: $scope.top, left: ($scope.left + 21)}];
                } else if (wire === $scope.inB) {
                    return [{top: ($scope.top + 11), left: ($scope.left + 21)}];
                } else if (wire === $scope.out) {
                    return [{top: ($scope.top + 5), left: ($scope.left - 2)}];
                } else {
                    console.log("This Wire is not connected: " + wire.getName());
                }
            };

            $scope.$watch('inA', function (newInA, oldInA) {
                if (newInA) {
                    newInA.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                    newInA.registerReaderAndRead($scope.logicGate);
                }
                if (oldInA && (newInA != oldInA)) {
                    oldInA.resign($scope.logicGate);
                }
            });

            $scope.$watch('inB', function (newInB, oldInB) {
                if (newInB) {
                    newInB.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                    newInB.registerReaderAndRead($scope.logicGate);
                }
                if (oldInB && (newInB != oldInB)) {
                    oldInB.resign($scope.logicGate);
                }
            });

            $scope.$watch('out', function (newOut, oldOut) {
                if (newOut) {
                    newOut.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                }
                if (oldOut && (newOut != oldOut)) {
                    oldOut.resign($scope.logicGate);
                }
            });

            $scope.logicGate.setValue();

            $scope.$emit('componentInitialized', $scope);
        },
        templateUrl: 'partials/component_AndGate.html'
    };
});