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
                $scope.busLeftIsSet = true;
                $scope.setDirection($scope.direction);
                $scope.checkForFinishedInitialization();
            });
            $scope.$watch('busRight', function (newValue) {
                if (newValue) {
                    $scope.busRight.enrollToDirective($scope.filter, $scope.getConnectionPositions);
                }
                $scope.filter.setRightBus(newValue);
                $scope.busRightIsSet = true;
                $scope.setDirection($scope.direction);
                $scope.checkForFinishedInitialization();
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
                if ($scope.busLeftIsSet && $scope.busRightIsSet) {
                    $scope.setDirection(newValue);
                }
            });

            $scope.setDirection = function (direction) {
                var input;
                if (direction == 'left') {
                    $scope.direction = 'left';
                    if ($scope.busRight && $scope.busRightIsSet) {
                        input = $scope.busRight.registerReaderAndRead($scope.filter);
                        $scope.filter.setValue(input, $scope.busRight);
                    }
                    if ($scope.busLeft && $scope.busLeftIsSet) {
                        $scope.busLeft.unregisterReader($scope.filter);
                    }
                } else {
                    $scope.direction = 'right';
                    if ($scope.busLeft && $scope.busLeftIsSet) {
                        input = $scope.busLeft.registerReaderAndRead($scope.filter);
                        $scope.filter.setValue(input, $scope.busLeft);
                    }
                    if ($scope.busRight && $scope.busRightIsSet) {
                        $scope.busRight.unregisterReader($scope.filter);
                    }
                }
                $scope.filter.setDirection($scope.direction);
                $scope.directionIsSet = true;
                $scope.checkForFinishedInitialization();
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

            $scope.checkForFinishedInitialization = function () {
                if ($scope.controllerIsRead &&
                    $scope.busLeftIsSet &&
                    $scope.busRightIsSet &&
                    $scope.directionIsSet &&
                    !$scope.initializationSuccessful) {
                    $scope.initializationSuccessful = true;
                    $scope.$emit('componentInitialized', $scope.filter);
                }
            };

            $scope.controllerIsRead = true;
            $scope.checkForFinishedInitialization();
        },
        templateUrl: 'partials/component_Filter.html'
    };
});