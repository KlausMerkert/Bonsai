'use strict';

bonsaiApp.directive('filter', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            statement: '=',
            busLeft: '=',
            busRight: '=',
            top: '=',
            left: '=',
            filterName: '@'
        },
        link: function ($scope, element, attrs) {
            $scope.filter = new Filter($scope.statement);

            $scope.showStatement = false;
            $scope.toggleShowStatement = function () {
                $scope.showStatement = !$scope.showStatement;
            };

            $scope.$watch('statement', function () {
                $scope.filter.setStatement($scope.statement);
            });

            $scope.$watch('busLeft', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (oldValue) {
                        $scope.filter.removeBus(oldValue);
                    }
                }
                if (newValue) {
                    $scope.filter.addBus(newValue);
                }
            });
            $scope.$watch('busRight', function (newValue, oldValue) {
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
                $scope.topCSS = ($scope.top - 7) + 'px';
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
                if (bus === $scope.busLeft) {
                    return [{top: $scope.top, left: $scope.left}];
                } else if (bus === $scope.busRight) {
                    return [{top: $scope.top, left: $scope.left + 24}];
                } else {
                    console.log("This bus is not connected: " + bus.getName());
                }
            };

            // We have to wait for a very short time to enroll to the buses
            // because the wire needs to be fully initialized.
            $interval(function () {
                if ($scope.busLeft) {
                    $scope.busLeft.enrollToDirective($scope.filter, $scope.getConnectionPositions);
                    $scope.busLeft.registerReaderAndRead($scope.filter);
                }
                if ($scope.busRight) {
                    $scope.busRight.enrollToDirective($scope.filter, $scope.getConnectionPositions);
                    $scope.busRight.registerReaderAndRead($scope.filter);
                }
            }, 1, 1);
        },
        templateUrl: 'partials/component_Filter.html'
    };
});