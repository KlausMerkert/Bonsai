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
        controller: function ($scope) {
            $scope.comp = new CompareToZero($scope.bus, $scope.wire);
            $scope.topCSS = ($scope.top + 3) + 'px';
            $scope.leftCSS = ($scope.left - 11) + 'px';
        },
        link: function ($scope, element, attrs) {
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

            $scope.comp.getPositions = $scope.getConnectionPositions;

            // We have to wait for a very short time to enroll to the bus
            // because the handler needs to be fully initialized.
            $interval(function () {
                $scope.comp.bus.enrollToDirective($scope.comp, $scope.getConnectionPositions);
                $scope.comp.bus.registerReaderAndRead($scope.comp);
            }, 1, 1);
        },
        templateUrl: 'partials/component_CompareToZero.html'
    };
});