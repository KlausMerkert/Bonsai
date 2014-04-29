bonsaiApp.directive('register', function ($interval) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            value: '=',
            top: '=',
            left: '='
        },
        controller: function ($scope) {
            $scope.data = $scope.value;
            $scope.topCSS = $scope.top + 'em';
            $scope.leftCSS = $scope.left + 'em';
            $scope.connections = [];

            $scope.toggleState = function (connection) {
                for (var i = 0; i < $scope.connections.length; i++) {
                    if ($scope.connections[i].handler == connection.handler) {
                        if ($scope.connections[i].state >= 1) {
                            $scope.connections[i].state = -1;
                        } else {
                            $scope.connections[i].state++;
                        }
                    }
                }
            };

            this.addConnection = function (handler) {
                $scope.connections.push({state: 0, handler: handler});
            };
        },
        link: function ($scope, element, attrs) {
            $scope.writeCallback = function (value) {
                $scope.data = value;
            };

            $scope.getConnectionPositions = function (busHandler) {
                var positions = [];
                for (var i = 0; i < $scope.connections.length; i++) {
                    if ($scope.connections[i].handler == busHandler) {
                        if (i%2 == 0) {
                            positions.push({top: $scope.top-1.55, left: $scope.left+1.4});
                        } else {
                            positions.push({top: $scope.top+0.12, left: $scope.left+1.4});
                        }
                    }
                }
                return positions;
            };

            // We have to wait for a very short time to enroll to the busses
            // because the handler needs to be fully initialized.
            $interval(function () {
                for (var i = 0; i < $scope.connections.length; i++) {
                    $scope.connections[i].handler.enroll(element, $scope.writeCallback, $scope.getConnectionPositions);
                }
            }, 1, 1);
        },
        templateUrl: 'partials/component_Register.html'
    };
});

bonsaiApp.directive('connection', function () {
    return {
        require: '^register',
        restrict: 'E',
        scope: {
            handler: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.addConnection($scope.handler);
        },
        template: ''
    };
});

