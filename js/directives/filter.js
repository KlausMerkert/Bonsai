'use strict';

bonsaiApp.directive('filter', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            statement: '=',
            busTop: '=',
            busBottom: '=',
            top: '=',
            left: '=',
            filterName: '@'
        },
        link: function ($scope, element, attrs) {
            $scope.filter = new Filter($scope.statement);

            $scope.$watch('statement', function () {
                $scope.filter.setStatement($scope.statement);
            });

            $scope.$watch('busTop', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (oldValue) {
                        $scope.filter.removeBus(oldValue);
                    }
                }
                if (newValue) {
                    $scope.filter.addBus(newValue);
                }
            });
            $scope.$watch('busBottom', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (oldValue) {
                        $scope.filter.removeBus(oldValue);
                    }
                }
                if (newValue) {
                    $scope.filter.addBus(newValue);
                }
            });

            $scope.$watch('top', function () {
                $scope.topCSS = $scope.top + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = $scope.left + 'px';
            });

            attrs.$observe('filterName', function() {
                if ($scope.filterName) {
                    $scope.filter.setName($scope.filterName);
                }
            });

            $scope.getConnectionPositions = function (bus) {
                if (bus === $scope.busTop) {
                    return [{top: $scope.top -4, left: $scope.left}];
                } else if (bus === $scope.busBottom) {
                    return [{top: ($scope.top + 31), left: $scope.left}];
                } else {
                    console.log("This bus is not connected: " + bus.getName());
                }
            };

            // We have to wait for a very short time to enroll to the buses
            // because the wire needs to be fully initialized.
            $interval(function () {
                if ($scope.busTop) {
                    $scope.busTop.enrollToDirective($scope.filter, $scope.getConnectionPositions);
                    $scope.busTop.registerReaderAndRead($scope.filter);
                }
                if ($scope.busBottom) {
                    $scope.busBottom.enrollToDirective($scope.filter, $scope.getConnectionPositions);
                    $scope.busBottom.registerReaderAndRead($scope.filter);
                }
            }, 1, 1);
        },
        templateUrl: 'partials/component_Filter.html'
    };
});