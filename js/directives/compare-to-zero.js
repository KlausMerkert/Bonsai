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
                $scope.active = active;
            });
            $scope.active = 0;

            $scope.$watch('top', function () {
                $scope.topCSS = ($scope.top + 3) + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = ($scope.left - 10) + 'px';
            });

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

            $scope.$watch('bus', function (newBus, oldBus) {
                if (newBus) {
                    $scope.comp.setBus(newBus);
                    newBus.enrollToDirective($scope.comp, $scope.getConnectionPositions);
                    newBus.registerReaderAndRead($scope.comp);
                }
                if (oldBus && (newBus != oldBus)) {
                    oldBus.resign($scope.comp);
                }
            });

            $scope.$watch('wire', function (newWire, oldWire) {
                if (newWire) {
                    newWire.enrollToDirective($scope.comp, $scope.getConnectionPositions);
                }
                if (oldWire && (newWire != oldWire)) {
                    oldWire.resign($scope.comp);
                }
            });

            $scope.$emit('componentInitialized', $scope);
        },
        templateUrl: 'partials/component_CompareToZero.html'
    };
});