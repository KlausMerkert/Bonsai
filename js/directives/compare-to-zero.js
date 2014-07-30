'use strict';

bonsaiApp.directive('comparetozero', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            bus: '=',
            wire: '=',
            compName: '@',
            top: '=',
            left: '='
        },
        link: function ($scope, element, attrs) {
            $scope.comp = new CompareToZero($scope.bus, $scope.wire, function (active) {
                if (active) {
                    $scope.color = 'rgb(255, 103, 97)';
                } else {
                    $scope.color = 'rgb(200, 200, 200)';
                }
            });
            $scope.color = 'rgb(200, 200, 200)';

            $scope.topCSS = ($scope.top + 3) + 'px';
            $scope.leftCSS = ($scope.left - 8) + 'px';

            attrs.$observe('compName', function() {
                if ($scope.compName) {
                    $scope.comp.setName($scope.compName);
                }
            });

            $scope.getConnectionPositions = function (connector) {
                if (connector === $scope.bus) {
                    return [
                        {top: $scope.top, left: $scope.left}
                    ];
                } else if (connector === $scope.wire) {
                    return [
                        {top: $scope.top + 21, left: $scope.left}
                    ];
                }
            };

            // We have to wait for a very short time to enroll to the bus
            // because the handler needs to be fully initialized.
            $interval(function () {
                $scope.comp.bus.enrollToDirective($scope.comp, $scope.getConnectionPositions);
                if ($scope.wire) {
                    $scope.wire.enrollToDirective($scope.comp, $scope.getConnectionPositions);
                }
                $scope.comp.setValue();
            }, 1, 1);
        },
        templateUrl: 'partials/component_CompareToZero.html'
    };
});