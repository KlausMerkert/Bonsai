bonsaiApp.directive('bus', function () {
    return {
        restrict: 'E',
        scope: {
            handler: '='
        },
        link: function ($scope, element, attrs) {
            $scope.localHandler = $scope.handler || {};

            $scope.connections = [];

            $scope.value = null;
            $scope.active = false;
            $scope.writerIndex = -1;

            var findInConnections= function (enrollee) {
                var index = -1;
                for (var i = 0; i < $scope.connections.length; i++) {
                    if ($scope.connections[i].enrollee == enrollee) {
                        index = i;
                    }
                }
                return index;
            };

            var getEndpoints = function () {
                var endpoints = [];
                for (var i = 0; i < $scope.connections.length; i++) {
                    var connectionEndpoints = $scope.connections[i].getPositions($scope.localHandler);
                    for (var j = 0; j < connectionEndpoints.length; j++) {
                        endpoints.push(connectionEndpoints[j]);
                    }
                }
                return endpoints;
            };

            var getGrid = function (endpoints) {
                var XCoordinates = [];
                var YCoordinates = [];
                for (var i = 0; i < endpoints.length; i++) {
                    if (XCoordinates.indexOf(parseFloat(endpoints[i].left)) < 0) {
                        XCoordinates.push(parseFloat(endpoints[i].left));
                    }
                    if (YCoordinates.indexOf(parseFloat(endpoints[i].top)) < 0) {
                        YCoordinates.push(parseFloat(endpoints[i].top));
                    }
                }
                XCoordinates.sort(function (a, b) {
                    return a - b
                });
                YCoordinates.sort(function (a, b) {
                    return a - b
                });
                // create endpoints list by grid indexes
                var indexEndpoints = [];
                for (i = 0; i < endpoints.length; i++) {
                    indexEndpoints.push({
                        i: XCoordinates.indexOf(endpoints[i].left),
                        j: YCoordinates.indexOf(endpoints[i].top)
                    });
                }
                return {XCoordinates: XCoordinates, YCoordinates: YCoordinates, indexEndpoints: indexEndpoints};
            };

            var cluster = function (points, connections) {
                var clusters = [];
                for (var i = 0; i < connections.length; i++) {
                    var connectionAdded = false;
                    // Test if one of the connection point is already in one of the clusters and
                    // add the other point if it is not already in there.
                    for (var j = 0; j < clusters.length; j++) {
                        if (clusters[j].indexOf(connections[i].connection[0]) >= 0) {
                            if (!clusters[j].indexOf(connections[i].connection[1]) >= 0) {
                                clusters[j].push(connections[i].connection[1]);
                            }
                            connectionAdded = true;
                        }
                        if (clusters[j].indexOf(connections[i].connection[1]) >= 0) {
                            if (!clusters[j].indexOf(connections[i].connection[0]) >= 0) {
                                clusters[j].push(connections[i].connection[0]);
                            }
                            connectionAdded = true;
                        }
                    }
                    if (!connectionAdded) {
                        clusters.push([connections[i].connection[0], connections[i].connection[1]]);
                    }
                }
                // Check if all points are in a cluster and add a one point cluster for each which is not.
                for (i = 0; i < points.length; i++) {
                    var pointFound = false;
                    for (j = 0; j < clusters.length; j++) {
                        if (clusters[j].indexOf(points[i]) >= 0) {
                            pointFound = true;
                        }
                    }
                    if (!pointFound) {
                        clusters.push([points[i]]);
                    }
                }
                // Finished
                return clusters;
            };

            var getWaypointWeight = function (point, grid, waypoints, alreadyFoundConnections) {
                if (waypoints.indexOf(point) >= 0) {
                    return 0;
                }
                var clusters = cluster(waypoints, alreadyFoundConnections);
                var weightSum = 0;
                for (var k = 0; k < clusters.length; k++) {
                    var clusterMinWeight = 1000;
                    for (var l = 0; l < clusters[k].length; l++) {
                        var weight = Math.sqrt(Math.sqrt(
                            (grid.XCoordinates[point.i] - grid.XCoordinates[clusters[k][l].i]) *
                            (grid.XCoordinates[point.i] - grid.XCoordinates[clusters[k][l].i]) +
                            (grid.XCoordinates[point.j] - grid.XCoordinates[clusters[k][l].j]) *
                            (grid.XCoordinates[point.j] - grid.XCoordinates[clusters[k][l].j])
                        ));
                        if (weight < clusterMinWeight) {
                            clusterMinWeight = weight;
                        }
                    }
                    weightSum = weightSum + clusterMinWeight;
                }
                return weightSum;
            };

            var findGoodConnections = function (alreadyFoundConnections, grid, waypoints) {
                // find all possible waypoint connections
                var possibleNewConnections = [];
                for (var k = 0; k < waypoints.length; k++) {
                    if (waypoints[k].j - 1 >= 0) {
                        possibleNewConnections.push({
                            connection: [
                                waypoints[k],
                                {i: waypoints[k].i, j: waypoints[k].j - 1}
                            ],
                            dist: grid.YCoordinates[waypoints[k].j] - grid.YCoordinates[waypoints[k].j - 1],
                            weight: getWaypointWeight(
                                {i: waypoints[k].i, j: waypoints[k].j - 1},
                                grid,
                                waypoints,
                                alreadyFoundConnections
                            )
                        });
                    }
                    if (waypoints[k].i - 1 >= 0) {
                        possibleNewConnections.push({
                            connection: [
                                waypoints[k],
                                {i: waypoints[k].i - 1, j: waypoints[k].j}
                            ],
                            dist: grid.XCoordinates[waypoints[k].i] - grid.XCoordinates[waypoints[k].i - 1],
                            weight: getWaypointWeight(
                                {i: waypoints[k].i-1, j: waypoints[k].j},
                                grid,
                                waypoints,
                                alreadyFoundConnections
                            )
                        });
                    }
                    if (waypoints[k].j + 1 < grid.YCoordinates.length) {
                        possibleNewConnections.push({
                            connection: [
                                waypoints[k],
                                {i: waypoints[k].i, j: waypoints[k].j + 1}
                            ],
                            dist: grid.YCoordinates[waypoints[k].j + 1] - grid.YCoordinates[waypoints[k].j],
                            weight: getWaypointWeight(
                                {i: waypoints[k].i, j: waypoints[k].j + 1},
                                grid,
                                waypoints,
                                alreadyFoundConnections
                            )
                        });
                    }
                    if (waypoints[k].i + 1 < grid.XCoordinates.length) {
                        possibleNewConnections.push({
                            connection: [
                                waypoints[k],
                                {i: waypoints[k].i + 1, j: waypoints[k].j}
                            ],
                            dist: grid.XCoordinates[waypoints[k].i + 1] - grid.XCoordinates[waypoints[k].i],
                            weight: getWaypointWeight(
                                {i: waypoints[k].i + 1, j: waypoints[k].j},
                                grid,
                                waypoints,
                                alreadyFoundConnections
                            )
                        });
                    }
                }
                // sort the waypoints by weight
                possibleNewConnections.sort(function (a, b) {
                    return (a.weight + a.dist) - (b.weight + b.dist);
                });
                //
                console.log(possibleNewConnections);
                return alreadyFoundConnections;
            };

            var updateVisibleParts = function () {
                // get all endpoints
                var endpoints = getEndpoints();
                // get the grid
                var grid = getGrid(endpoints);
                // recursively find all good connections in the grid
                var goodConnections = findGoodConnections([], grid, grid.indexEndpoints);
                // combine connections to parts
                var parts = [];

                // set the parts
                parts.push({type: 'horizontal', top: '7em', left: '5em', width: '3em', height: '1em'});
                parts.push({type: 'topright', top: '7em', left: '8em', width: '3em', height: '1em'});
                $scope.visibleParts = parts;
            };

            $scope.localHandler.enroll = function (enrollee, callback, getPositions) {
                $scope.connections.push({
                    enrollee: enrollee,
                    is_reading: false,
                    callback: callback,
                    getPositions: getPositions
                });
                updateVisibleParts();
            };

            $scope.localHandler.resign = function (resigner) {
                var index = findInConnections(resigner);
                if (index >= 0) {
                    $scope.connections.splice(index, 1);
                }
            };

            $scope.localHandler.registerMovement = function () {
                updateVisibleParts()
            };

            $scope.localHandler.startReading = function (reader) {
                var index = findInConnections(reader);
                if (index >= 0) {
                    $scope.connections[index].is_reading = true;
                    return $scope.value;
                } else {
                    throw reader + " is not enrolled to the bus an can not read.";
                }
            };

            $scope.localHandler.stopReading = function (reader) {
                var index = findInConnections(reader);
                if (index >= 0) {
                    $scope.connections[index].is_reading = false;
                }
            };

            $scope.localHandler.write = function (writer, data) {
                var index = findInConnections(writer);
                if (index >= 0) {
                    if ($scope.active && $scope.writerIndex != index) {
                        throw "This bus is already occupied by " +
                            $scope.connections[$scope.writerIndex].enrollee + ".";
                    } else {
                        $scope.connections[index].is_reading = false;
                        $scope.writerIndex = index;
                        $scope.active = true;
                        $scope.value = data;
                        for (var i = 0; i < $scope.connections.length; i++) {
                            if ($scope.connections[i].is_reading) {
                                $scope.connections[i].callback($scope.value);
                            }
                        }
                    }
                } else {
                    throw writer + " is not enrolled to the bus an can not write.";
                }
            };

            $scope.localHandler.stopWriting = function (writer) {
                var index = findInConnections(writer);
                if (index >= 0) {
                    if (index == $scope.writerIndex) {
                        $scope.active = false;
                        $scope.writerIndex = -1;
                        $scope.value = null;
                    }
                }
            };
        },
        templateUrl: 'partials/component_Bus.html'
    }
});