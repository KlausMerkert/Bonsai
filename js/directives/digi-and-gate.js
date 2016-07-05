'use strict';

bonsaiApp.directive('digiandgate', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            inA: '=',
            inB: '=',
            out: '=',
            top: '=',
            left: '=',
            label: '=',
            toplabel: '=',
            leftlabel: '=',
            fontsize: '=',
            circle: '=',
            gateName: '@'
        },
        link: function ($scope, element, attrs) {  	
            $scope.logicGate = new AndGate($scope.inA, $scope.inB, $scope.out);

            $scope.topCSS = ($scope.top - 3) + 'px';
            $scope.leftCSS = $scope.left + 'px';

            attrs.$observe('gateName', function() {
                if ($scope.gateName) {
                    $scope.logicGate.setName($scope.gateName);
                }
            });

            $scope.getConnectionPositions = function (wire) {
                if (wire === $scope.inA) {
                    return [{top: $scope.top + 4, left: ($scope.left - 1)}];
                } else if (wire === $scope.inB) {
                    return [{top: ($scope.top + 29), left: ($scope.left - 1)}];
                } else if (wire === $scope.out) {
                    if ($scope.circle) {
                      return [{top: ($scope.top + 16), left: ($scope.left + 42)}];
                    }
                    else {
                    	return [{top: ($scope.top + 16), left: ($scope.left + 33)}];
                    }
                } else {
                    console.log("This Wire is not connected: " + wire.getName());
                }
            };
            
            $scope.$watch('label', function(newLabel, oldLabel) {
            	  if (typeof($scope.label) == "undefined") {
								    $scope.label = '1';            	  
            	  }
            });
            
            $scope.$watch('toplabel', function(newLabel, oldLabel) {
            	  if (typeof($scope.toplabel) == "undefined") {
								    $scope.toplabel = 4;            	  
            	  }
            });
            
             $scope.$watch('leftlabel', function(newLabel, oldLabel) {
            	  if (typeof($scope.leftlabel) == "undefined") {
								    $scope.leftlabel = 2;            	  
            	  }
            });
            
             $scope.$watch('fontsize', function(newLabel, oldLabel) {
            	  if (typeof($scope.fontsize) == "undefined") {
								    $scope.fontsize = 24;            	  
            	  }
            });
            
            $scope.$watch('circle', function(newLabel, oldLabel) {
            	  if (typeof($scope.circle) == "undefined") {
								    $scope.circle = false;            	  
            	  }
            });

            $scope.$watch('inA', function (newInA, oldInA) {
                if (newInA) {
                    newInA.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                    newInA.registerReaderAndRead($scope.logicGate);
                }
                if (oldInA && (newInA != oldInA)) {
                    oldInA.resign($scope.logicGate);
                }
                $scope.inAEnrolled = true;
                $scope.checkForFinishedInitialization();
            });

            $scope.$watch('inB', function (newInB, oldInB) {
                if (newInB) {
                    newInB.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                    newInB.registerReaderAndRead($scope.logicGate);
                }
                if (oldInB && (newInB != oldInB)) {
                    oldInB.resign($scope.logicGate);
                }
                $scope.inBEnrolled = true;
                $scope.checkForFinishedInitialization();
            });

            $scope.$watch('out', function (newOut, oldOut) {
                if (newOut) {
                    newOut.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                }
                if (oldOut && (newOut != oldOut)) {
                    oldOut.resign($scope.logicGate);
                }
                $scope.outEnrolled = true;
                $scope.checkForFinishedInitialization();
            });

            $scope.checkForFinishedInitialization = function () {
                if ($scope.controllerIsRead &&
                    $scope.inAEnrolled &&
                    $scope.inBEnrolled &&
                    $scope.outEnrolled &&
                    !$scope.initializationSuccessful) {
                    $scope.initializationSuccessful = true;
                    $scope.$emit('componentInitialized', $scope.logicGate);
                }
            };

            $scope.$on('sendInitialValues', function (event, message) {
                $scope.logicGate.setValue();
            });

            $scope.controllerIsRead = true;
            $scope.checkForFinishedInitialization();
        },
        templateUrl: '/partials/component_DigiGate.html'
    };
});