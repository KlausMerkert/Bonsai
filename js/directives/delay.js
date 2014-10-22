'use strict';

bonsaiApp.directive('delay', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            busLeft: '=',
            busRight: '=',
            delay: '=',
            top: '=',
            left: '=',
            direction: '=',
            delayName: '@'
        },
        link: function ($scope, element, attrs) {
            $scope.delayObject = new Delay($scope.delay);

            $scope.delayObject.delayCall = function (value, bus) {
                $scope.$apply(function () {
                    $scope.delayObject.delayedActions(value, bus);
                });
            };

            $scope.showValue = false;
            $scope.toggleShowValue = function () {
                $scope.showValue = !$scope.showValue;
            };

            $scope.$watch('busLeft', function (newValue) {
                if (newValue) {
                    newValue.enrollToDirective($scope.delayObject, $scope.getConnectionPositions);
                }
                $scope.delayObject.setLeftBus(newValue);
                $scope.leftWireEnrolled = true;
                $scope.checkForFinishedInitialization();
            });
            $scope.$watch('busRight', function (newValue) {
                if (newValue) {
                    newValue.enrollToDirective($scope.delayObject, $scope.getConnectionPositions);
                }
                $scope.delayObject.setRightBus(newValue);
                $scope.rightWireEnrolled = true;
                $scope.checkForFinishedInitialization();
            });

            $scope.$watch('direction', function (newValue) {
                if (newValue == 'left') {
                    $scope.busRight.registerReaderAndRead($scope.delayObject);
                } else {
                    $scope.busLeft.registerReaderAndRead($scope.delayObject);
                }
                $scope.delayObject.setDirection(newValue);
            });

            $scope.setDirection = function (direction) {
                if (direction == 'left') {
                    $scope.direction = 'left';
                } else {
                    $scope.direction = 'right';
                }
            };

            $scope.$watch('delay', function () {
                $scope.delayObject.setDelay($scope.delay);
            });

            $scope.$watch('top', function () {
                $scope.topCSS = ($scope.top - 2) + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = $scope.left + 'px';
            });

            attrs.$observe('delayName', function() {
                if ($scope.delayName) {
                    $scope.delayObject.setName($scope.delayName);
                }
            });

            $scope.getConnectionPositions = function (bus) {
                if (bus === $scope.busLeft) {
                    return [{top: $scope.top, left: ($scope.left - 2)}];
                } else if (bus === $scope.busRight) {
                    return [{top: $scope.top, left: ($scope.left + 19)}];
                } else {
                    console.log("This bus is not connected: " + bus.getName());
                }
            };

            $scope.checkForFinishedInitialization = function () {
                if ($scope.controllerIsRead &&
                    $scope.leftWireEnrolled &&
                    $scope.rightWireEnrolled &&
                    !$scope.initializationSuccessful) {
                    $scope.initializationSuccessful = true;
                    $scope.$emit('componentInitialized', $scope.delayObject);
                }
            };

            $scope.controllerIsRead = true;
            $scope.checkForFinishedInitialization();
        },
        templateUrl: '/partials/component_Delay.html'
    };
});