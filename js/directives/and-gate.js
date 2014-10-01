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

            $scope.$emit('componentInitialized', $scope);
        },
        templateUrl: 'partials/component_AndGate.html'
    };
});