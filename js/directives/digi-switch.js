'use strict';

bonsaiApp.directive('digiswitch', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            wire: '=',
            value: '=',
            switchName: '@',
            top: '=',
            left: '=',
            color: '='
        },
        link: function ($scope, element, attrs) {
            $scope.colorCSS = 'rgb(255, 0, 0)';

            $scope.switch = new ManualSwitch(function (value) {
                $scope.value = value;
            }, $scope.wire, undefined);

            $scope.toggle = function () {
                $scope.switch.toggle();
            };

            attrs.$observe('switchName', function() {
                if ($scope.switchName) {
                    $scope.switch.setName($scope.switchName);
                }
            });

            $scope.$watch('value', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.switch.setValue(newValue);
                }
            });

            $scope.$watch('top', function () {
                $scope.topCSS = ($scope.top - 7) + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = ($scope.left + 3) + 'px';
            });

            $scope.$watch('color', function (newValue) {
                if (newValue) {
                    $scope.colorCSS = $scope.color;
                }
            });

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top, left: $scope.left + 23}];
            };

            $scope.$watch('wire', function (newWire, oldWire) {
                console.log(newWire);
                if (newWire) {
                    newWire.enrollToDirective(
                        $scope.switch,
                        $scope.getConnectionPositions
                    );
                }
                if (oldWire && (newWire != oldWire)) {
                    oldWire.resign($scope.switch);
                }
                $scope.wireEnrolled = true;
                $scope.checkForFinishedInitialization();
            });

            $scope.checkForFinishedInitialization = function () {
                if ($scope.controllerIsRead &&
                    $scope.wireEnrolled &&
                    !$scope.initializationSuccessful) {
                    $scope.initializationSuccessful = true;
                    $scope.$emit('componentInitialized', $scope.switch);
                }
            };

            $scope.$on('sendInitialValues', function (event, message) {
                $scope.switch.setValue($scope.value);
            });

            $scope.controllerIsRead = true;
            $scope.checkForFinishedInitialization();
        },
        templateUrl: '/partials/component_DigiSwitch.html'
    };
});