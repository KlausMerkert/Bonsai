'use strict';

bonsaiApp.directive('filter', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            statement: '=',
            busLeft: '=',
            busRight: '=',
            top: '=',
            left: '=',
            direction: '=',
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

            $scope.$watch('busLeft', function (newValue) {
                if (newValue) {
                    $scope.busLeft.enrollToDirective($scope.filter, $scope.getConnectionPositions);
                }
                $scope.filter.setLeftBus(newValue);
            });
            $scope.$watch('busRight', function (newValue) {
                if (newValue) {
                    $scope.busRight.enrollToDirective($scope.filter, $scope.getConnectionPositions);
                }
                $scope.filter.setRightBus(newValue);
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

            $scope.$watch('direction', function (newValue) {
                if (newValue == 'left') {
                    $scope.busRight.registerReaderAndRead($scope.filter);
                } else {
                    $scope.busLeft.registerReaderAndRead($scope.filter);
                }
                $scope.filter.setDirection(newValue);
            });

            $scope.setDirection = function (direction) {
                if (direction == 'left') {
                    $scope.direction = 'left';
                } else {
                    $scope.direction = 'right';
                }
            };

            $scope.getConnectionPositions = function (bus) {
                if (bus === $scope.busLeft) {
                    return [{top: $scope.top, left: $scope.left}];
                } else if (bus === $scope.busRight) {
                    return [{top: $scope.top, left: $scope.left + 24}];
                } else {
                    console.log("This bus is not connected: " + bus.getName());
                }
            };

            $scope.$emit('componentInitialized', $scope);
        },
        templateUrl: 'partials/component_Filter.html'
    };
});