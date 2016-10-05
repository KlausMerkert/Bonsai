'use strict';

bonsaiApp.directive('digifagate', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            ina: '=',
            inb: '=',
            inx: '=',
            outs: '=', 
            outue: '=', 
            top: '=',
            left: '=',
            label: '=',
            toplabel: '=',
            leftlabel: '=',
            fontsize: '=',
            gateName: '@'
        },
        link: function ($scope, element, attrs) {  	
            console.log("aus digi-fa.js ina =",$scope.ina);
            console.log("aus digi-fa.js inb =",$scope.inb);
            console.log("aus digi-fa.js inx =",$scope.inx);
            console.log("aus digi-fa.js gateName =",$scope.gateName);
            $scope.logicGate = new FAGate($scope.ina, $scope.inb, $scope.inx, $scope.outs, $scope.outue);

            $scope.topCSS = ($scope.top - 3) + 'px';
            $scope.leftCSS = $scope.left + 'px';

            attrs.$observe('gateName', function() {
                if ($scope.gateName) {
                    $scope.logicGate.setName($scope.gateName);
                }
            });

            $scope.getConnectionPositions = function (wire) {
                if (wire === $scope.ina) {
                    return [{top: $scope.top + 4, left: ($scope.left - 1)}];
                } else if (wire === $scope.inb) {
                    return [{top: ($scope.top + 29), left: ($scope.left - 1)}];
                } else if (wire === $scope.inx) {
                    return [{top: ($scope.top + 54), left: ($scope.left - 1)}];
                } else if (wire === $scope.outs) {
                    return [{top: ($scope.top + 4), left: ($scope.left + 33)}]; 
                } else if (wire === $scope.outue) {
                   	return [{top: ($scope.top + 29), left: ($scope.left + 33)}]; 
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
            

            $scope.$watch('ina', function (newInA, oldInA) {
                if (newInA) {
                    newInA.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                    newInA.registerReaderAndRead($scope.logicGate);
                }
                if (oldInA && (newInA != oldInA)) {
                    oldInA.resign($scope.logicGate);
                }
                $scope.inaEnrolled = true;
                $scope.checkForFinishedInitialization();
            });

            $scope.$watch('inb', function (newInB, oldInB) {
                if (newInB) {
                    newInB.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                    newInB.registerReaderAndRead($scope.logicGate);
                }
                if (oldInB && (newInB != oldInB)) {
                    oldInB.resign($scope.logicGate);
                }
                $scope.inbEnrolled = true;
                $scope.checkForFinishedInitialization();
            });
            
            $scope.$watch('inx', function (newInC, oldInC) {
                if (newInC) {
                    newInC.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                    newInC.registerReaderAndRead($scope.logicGate);
                }
                if (oldInC && (newInC != oldInC)) {
                    oldInC.resign($scope.logicGate);
                }
                $scope.inxEnrolled = true;
                $scope.checkForFinishedInitialization();
            });

            $scope.$watch('outs', function (newOut, oldOut) {                              
                if (newOut) {
                    newOut.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                }
                if (oldOut && (newOut != oldOut)) {
                    oldOut.resign($scope.logicGate);
                }
                $scope.outsEnrolled = true;
                $scope.checkForFinishedInitialization();
            });
            
            $scope.$watch('outue', function (newOutUe, oldOutUe) {                              
                if (newOutUe) {
                    newOutUe.enrollToDirective($scope.logicGate, $scope.getConnectionPositions);
                }
                if (oldOutUe && (newOutUe != oldOutUe)) {
                    oldOutUe.resign($scope.logicGate);
                }
                $scope.outueEnrolled = true;
                $scope.checkForFinishedInitialization();
            });

            $scope.checkForFinishedInitialization = function () {
                if ($scope.controllerIsRead &&
                    $scope.inaEnrolled &&
                    $scope.inbEnrolled &&
                    $scope.inxEnrolled &&
                    $scope.outsEnrolled &&
                    $scope.outueEnrolled &&
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
        templateUrl: '/partials/component_DigiFAGate.html'
    };
});