'use strict';

bonsaiApp.directive('slider', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            model: '=',
            valueMin: '=',
            valueMax: '=',
            displayMin: '=',
            displayMax: '=',
            scalingFunction: '=',
            displayScalingFunction: '='
        },
        link: function ($scope, element, attrs) {
            $scope.position = 0;
            var sliderBarElement = element[0].firstChild;
            angular.forEach(element[0].firstChild.childNodes, function (el) {
                if (el.nodeName == 'DIV') {
                    sliderBarElement = el;
                }
            });
            var rect = sliderBarElement.getBoundingClientRect();
            $scope.leftOffset = rect.left;
            $scope.width = rect.right - rect.left - 4;

            $scope.$watch('model', function (newValue) {
                var min = parseFloat($scope.valueMin);
                if (isNaN(min)) {
                    min = 0;
                }
                var max = parseFloat($scope.valueMax);
                if (isNaN(max)) {
                    max = 100;
                }
                var f = $scope.scalingFunction;
                if (!f) {
                    f = function (x) {
                        return x;
                    }
                }
                var range = [min, max];
                for (var i = 0; i < 10; i++) {
                    var testPosition = range[0] + (range[1]-range[0])/2;
                    if (newValue < f(testPosition/$scope.width)*(max-min)+min) {
                        range[1] = testPosition;
                    } else {
                        range[0] = testPosition;
                    }
                }
                $scope.position = testPosition;
            });

            $scope.startDrag = function (event) {
                event.preventDefault();
                $scope.dragging = true;
                var sliderBarElement = element[0].firstChild;
                angular.forEach(element[0].firstChild.childNodes, function (el) {
                    if (el.nodeName == 'DIV') {
                        sliderBarElement = el;
                    }
                });
                var rect = sliderBarElement.getBoundingClientRect();
                $scope.leftOffset = rect.left;
                $scope.width = rect.right - rect.left - 4;
                $scope.drag(event);
            };

            $scope.stopDrag = function (event) {
                $scope.dragging = undefined;
            };

            $scope.drag = function (event) {
                if ($scope.dragging) {
                    $scope.position = event.clientX - $scope.leftOffset;
                    if ($scope.position < 0) {
                        $scope.position = 0;
                    }
                    if ($scope.position > $scope.width) {
                        $scope.position = $scope.width;
                    }
                    var min = parseFloat($scope.valueMin);
                    if (isNaN(min)) {
                        min = 0;
                    }
                    var max = parseFloat($scope.valueMax);
                    if (isNaN(max)) {
                        max = 100;
                    }
                    var f = $scope.scalingFunction;
                    if (!f) {
                        f = function (x) {
                            return x;
                        }
                    }
                    $scope.model = f($scope.position/$scope.width)*(max-min)+min;
                    var displayMin = parseFloat($scope.displayMin);
                    if (isNaN(displayMin)) {
                        displayMin = 0;
                    }
                    var displayMax = parseFloat($scope.displayMax);
                    if (isNaN(displayMax)) {
                        displayMax = 100;
                    }
                    var df = $scope.displayScalingFunction;
                    if (!df) {
                        df = function (x) {
                            return x;
                        }
                    }
                    $scope.displayValue = df($scope.position/$scope.width)*(displayMax-displayMin)+displayMin;
                }
            };
        },
        templateUrl: '/partials/element_slider.html'
    };
});