bonsaiApp.directive('bus', function () {
    return {
        restrict: 'E',
        scope: {
            handler: '=',
            color: '=',
            top: '=',
            left: '='
        },
        link: function ($scope, element, attrs) {
            $scope.localHandler = $scope.handler || {};
            $scope.topCSS = $scope.top + 'em';
            $scope.leftCSS = $scope.left + 'em';

            $scope.connections = [];

            $scope.value = null;
            $scope.active = false;
            $scope.writerIndex = -1;

            var findInConnections = function (enrollee) {
                var index = -1;
                for (var i = 0; i < $scope.connections.length; i++) {
                    if ($scope.connections[i].enrollee == enrollee) {
                        index = i;
                    }
                }
                return index;
            };

            var isInList = function (element, list) {
                for (var i = 0; i < list.length; i++) {
                    if (angular.equals(element, list[i])) {
                        return true;
                    }
                }
                return false;
            };

            var isInConnections = function (candidate, connections) {
                for (var i = 0; i < connections.length; i++) {
                    if (angular.equals(
                        candidate.connection,
                        connections[i].connection
                    )) {
                        return true;
                    }
                    if (angular.equals(
                        candidate.connection,
                        [connections[i].connection[1], connections[i].connection[0]]
                    )) {
                        return true;
                    }
                }
                return false;
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
                    var j = 0;
                    while (j < clusters.length) {
                        if (isInList(connections[i].connection[0], clusters[j]) && !connectionAdded) {
                            if (!isInList(connections[i].connection[1], clusters[j])) {
                                clusters[j].push(connections[i].connection[1]);
                                // check if we should merge clusters
                                var k = j+1;
                                while (k < clusters.length) {
                                    if (isInList(connections[i].connection[1], clusters[k])) {
                                        for (var l = 0; l < clusters[k].length; l++) {
                                            if (!isInList(clusters[k][l], clusters[j])) {
                                                clusters[j].push(clusters[k][l]);
                                            }
                                        }
                                        clusters.splice(k,1);
                                    }
                                    k++;
                                }
                            }
                            connectionAdded = true;
                        } else if (isInList(connections[i].connection[1], clusters[j]) && !connectionAdded) {
                            if (!isInList(connections[i].connection[0], clusters[j])) {
                                clusters[j].push(connections[i].connection[0]);
                                // check if we should merge clusters
                                k = j+1;
                                while (k < clusters.length) {
                                    if (isInList(connections[i].connection[0], clusters[k])) {
                                        for (l = 0; l < clusters[k].length; l++) {
                                            if (!isInList(clusters[k][l], clusters[j])) {
                                                clusters[j].push(clusters[k][l]);
                                            }
                                        }
                                        clusters.splice(k,1);
                                    }
                                    k++;
                                }
                            }
                            connectionAdded = true;
                        }
                        j++;
                    }
                    if (!connectionAdded) {
                        clusters.push([connections[i].connection[0], connections[i].connection[1]]);
                    }
                }
                // Check if all points are in a cluster and add a one point cluster for each which is not.
                for (i = 0; i < points.length; i++) {
                    var pointFound = false;
                    for (j = 0; j < clusters.length; j++) {
                        if (isInList(points[i], clusters[j])) {
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
                if (isInList(point, waypoints)) {
                    return 0.01;
                }
                var clusters = cluster(waypoints, alreadyFoundConnections);
                var weightSum = 0;
                for (var k = 0; k < clusters.length; k++) {
                    if (!isInList(point, clusters[k])) {
                        var clusterMinWeight = 1000;
                        for (var l = 0; l < clusters[k].length; l++) {
                            var weight = Math.sqrt(
                                (grid.XCoordinates[point.i] - grid.XCoordinates[clusters[k][l].i]) *
                                    (grid.XCoordinates[point.i] - grid.XCoordinates[clusters[k][l].i]) +
                                    (grid.YCoordinates[point.j] - grid.YCoordinates[clusters[k][l].j]) *
                                        (grid.YCoordinates[point.j] - grid.YCoordinates[clusters[k][l].j])
                            );
                            if (weight < clusterMinWeight) {
                                clusterMinWeight = weight;
                            }
                        }
                        weightSum = weightSum + clusterMinWeight;
                    }
                }
                return weightSum;
            };

            var findGoodConnections = function (alreadyFoundConnections, grid, waypoints) {
                // find all possible waypoint connections
                var possibleNewConnections = [];
                var connection;
                for (var k = 0; k < waypoints.length; k++) {
                    if (waypoints[k].i + 1 < grid.XCoordinates.length) {
                        connection = [
                            waypoints[k],
                            {i: waypoints[k].i + 1, j: waypoints[k].j}
                        ];
                        if (!isInConnections({connection: connection}, alreadyFoundConnections)) {
                            possibleNewConnections.push({
                                connection: connection,
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
                    if (waypoints[k].i - 1 >= 0) {
                        connection = [
                            waypoints[k],
                            {i: waypoints[k].i - 1, j: waypoints[k].j}
                        ];
                        if (!isInConnections({connection: connection}, alreadyFoundConnections)) {
                            possibleNewConnections.push({
                                connection: connection,
                                dist: grid.XCoordinates[waypoints[k].i] - grid.XCoordinates[waypoints[k].i - 1],
                                weight: getWaypointWeight(
                                    {i: waypoints[k].i - 1, j: waypoints[k].j},
                                    grid,
                                    waypoints,
                                    alreadyFoundConnections
                                )
                            });
                        }
                    }
                    if (waypoints[k].j - 1 >= 0) {
                        connection = [
                            waypoints[k],
                            {i: waypoints[k].i, j: waypoints[k].j - 1}
                        ];
                        if (!isInConnections({connection: connection}, alreadyFoundConnections)) {
                            possibleNewConnections.push({
                                connection: connection,
                                dist: grid.YCoordinates[waypoints[k].j] - grid.YCoordinates[waypoints[k].j - 1],
                                weight: getWaypointWeight(
                                    {i: waypoints[k].i, j: waypoints[k].j - 1},
                                    grid,
                                    waypoints,
                                    alreadyFoundConnections
                                )
                            });
                        }
                    }
                    if (waypoints[k].j + 1 < grid.YCoordinates.length) {
                        connection = [
                            waypoints[k],
                            {i: waypoints[k].i, j: waypoints[k].j + 1}
                        ];
                        if (!isInConnections({connection: connection}, alreadyFoundConnections)) {
                            possibleNewConnections.push({
                                connection: connection,
                                dist: grid.YCoordinates[waypoints[k].j + 1] - grid.YCoordinates[waypoints[k].j],
                                weight: getWaypointWeight(
                                    {i: waypoints[k].i, j: waypoints[k].j + 1},
                                    grid,
                                    waypoints,
                                    alreadyFoundConnections
                                )
                            });
                        }
                    }
                }
                // sort the connections by weight
                possibleNewConnections.sort(function (a, b) {
                    //return (a.weight * a.dist) - (b.weight * b.dist);
                    return a.weight - b.weight;
                });
                // remove duplicate connections
                for (var i = 0; i < possibleNewConnections.length; i++) {
                    if (isInConnections(possibleNewConnections[i], alreadyFoundConnections)) {
                        possibleNewConnections.splice(i, 1);
                    }
                }
                if (possibleNewConnections.length > 0) {
                    // select the connection with the smallest weight
                    alreadyFoundConnections.push(possibleNewConnections[0]);
                    // add the new waypoint
                    if (!isInList(possibleNewConnections[0].connection[0], waypoints)) {
                        waypoints.push(possibleNewConnections[0].connection[0]);
                    }
                    if (!isInList(possibleNewConnections[0].connection[1], waypoints)) {
                        waypoints.push(possibleNewConnections[0].connection[1]);
                    }
                    // recursively add the rest of the connections if necessary
                    var clusters = cluster(waypoints, alreadyFoundConnections);
                    if (clusters.length > 1) {
                        alreadyFoundConnections = findGoodConnections(alreadyFoundConnections, grid, waypoints);
                    }
                }
                return alreadyFoundConnections;
            };

            var constructConnectionParts = function (goodConnections, grid) {
                // get junction points
                var countgrid = [];
                for (var i = 0; i < grid.XCoordinates.length; i++) {
                    countgrid.push([]);
                    for (var j = 0; j < grid.YCoordinates.length; j++) {
                        countgrid[i].push(0);
                    }
                }
                for (i = 0; i < goodConnections.length; i++) {
                    countgrid[goodConnections[i].connection[0].i][goodConnections[i].connection[0].j]++;
                    countgrid[goodConnections[i].connection[1].i][goodConnections[i].connection[1].j]++;
                }
                var junctionPoints = [];
                for (i = 0; i < countgrid.length; i++) {
                    for (j = 0; j < countgrid[i].length; j++) {
                        if (countgrid[i][j] > 2) {
                            junctionPoints.push({i: i, j: j});
                        }
                    }
                }
                // begin connections at the first junction point
                var remainingConnections = angular.copy(goodConnections);
                var connectionParts = [];
                for (i = 0; i < junctionPoints.length; i++) {
                    var point = junctionPoints[i];
                    var connectionsToFollow = [];
                    for (j = 0; j < remainingConnections.length; j++) {
                        if (angular.equals(point, remainingConnections[j].connection[0])) {
                            connectionParts.push([remainingConnections[j].connection]);
                            if (countgrid[remainingConnections[j].connection[1].i][remainingConnections[j].connection[1].j] == 2) {
                                connectionsToFollow.push({
                                    point: remainingConnections[j].connection[1],
                                    part: connectionParts.length-1
                                });
                            }
                            remainingConnections.splice(j, 1);
                        } else if (angular.equals(point, remainingConnections[j].connection[1])) {
                            connectionParts.push([remainingConnections[j].connection]);
                            if (countgrid[remainingConnections[j].connection[0].i][remainingConnections[j].connection[0].j] == 2) {
                                connectionsToFollow.push({
                                    point: remainingConnections[j].connection[0],
                                    part: connectionParts.length-1
                                });
                            }
                            remainingConnections.splice(j, 1);
                        }
                    }
                    while (connectionsToFollow.length > 0) {
                        point = connectionsToFollow[0].point;
                        for (j = 0; j < remainingConnections.length; j++) {
                            if (angular.equals(point, remainingConnections[j].connection[0])) {
                                connectionParts[connectionsToFollow[0].part].push(remainingConnections[j].connection);
                                if (countgrid[remainingConnections[j].connection[1].i][remainingConnections[j].connection[1].j] != 2) {
                                    connectionsToFollow.splice(0, 1);
                                } else {
                                    connectionsToFollow[0].point = remainingConnections[j].connection[1];
                                }
                                remainingConnections.splice(j, 1);
                            }
                            if (angular.equals(point, remainingConnections[j].connection[1])) {
                                connectionParts[connectionsToFollow[0].part].push(remainingConnections[j].connection);
                                if (countgrid[remainingConnections[j].connection[0].i][remainingConnections[j].connection[0].j] != 2) {
                                    connectionsToFollow.splice(0, 1);
                                } else {
                                    connectionsToFollow[0].point = remainingConnections[j].connection[0];
                                }
                                remainingConnections.splice(j, 1);
                            }
                        }
                    }
                }
                if (remainingConnections.length > 0) {
                    var junctionlessPart = [];
                    for (i = 0; i < remainingConnections.length; i++) {
                        junctionlessPart.push(remainingConnections[i].connection);
                    }
                    connectionParts.push(junctionlessPart);
                }
                return connectionParts;
            };

            var constructParts = function (connectionParts, grid) {
                var parts = [];
                for (var k = 0; k < connectionParts.length; k++) {
                    var connectionPart = connectionParts[k];
                    // calculate min and max for the coordinates
                    var Xmin = 1000.0;
                    var Ymin = 1000.0;
                    var Xmax = 0.0;
                    var Ymax = 0.0;
                    var indexXmin = 1000;
                    var indexYmin = 1000;
                    var indexXmax = 0;
                    var indexYmax = 0;
                    for (var i = 0; i < connectionPart.length; i++) {
                        Xmin = Math.min(
                            grid.XCoordinates[connectionPart[i][0].i],
                            grid.XCoordinates[connectionPart[i][1].i],
                            Xmin
                        );
                        Ymin = Math.min(
                            grid.YCoordinates[connectionPart[i][0].j],
                            grid.YCoordinates[connectionPart[i][1].j],
                            Ymin
                        );
                        Xmax = Math.max(
                            grid.XCoordinates[connectionPart[i][0].i],
                            grid.XCoordinates[connectionPart[i][1].i],
                            Xmax
                        );
                        Ymax = Math.max(
                            grid.YCoordinates[connectionPart[i][0].j],
                            grid.YCoordinates[connectionPart[i][1].j],
                            Ymax
                        );
                        indexXmin = Math.min(connectionPart[i][0].i, connectionPart[i][1].i, indexXmin);
                        indexYmin = Math.min(connectionPart[i][0].j, connectionPart[i][1].j, indexYmin);
                        indexXmax = Math.max(connectionPart[i][0].i, connectionPart[i][1].i, indexXmax);
                        indexYmax = Math.max(connectionPart[i][0].j, connectionPart[i][1].j, indexYmax);
                    }
                    // determine the type
                    if (indexXmax == indexXmin) {
                        parts.push({
                            type: 'vertical',
                            top: Ymin+'em',
                            left: Xmin+'em',
                            width: '0',
                            height: (Ymax-Ymin)+'em'
                        });
                    } else if (indexYmax == indexYmin) {
                        parts.push({
                            type: 'horizontal',
                            top: Ymin+'em',
                            left: Xmin+'em',
                            width: (Xmax-Xmin)+'em',
                            height: '0'
                        });
                    } else { // the part must be a corner
                        var corners = {topleft: false, topright: false, bottomright: false, bottomleft: false};
                        for (i = 0; i < connectionPart.length; i++) {
                            if ((connectionPart[i][0].i == indexXmin && connectionPart[i][0].j == indexYmin) ||
                                (connectionPart[i][1].i == indexXmin && connectionPart[i][1].j == indexYmin)) {
                                corners.topleft = true;
                            }
                            if ((connectionPart[i][0].i == indexXmax && connectionPart[i][0].j == indexYmin) ||
                                (connectionPart[i][1].i == indexXmax && connectionPart[i][1].j == indexYmin)) {
                                corners.topright = true;
                            }
                            if ((connectionPart[i][0].i == indexXmax && connectionPart[i][0].j == indexYmax) ||
                                (connectionPart[i][1].i == indexXmax && connectionPart[i][1].j == indexYmax)) {
                                corners.bottomright = true;
                            }
                            if ((connectionPart[i][0].i == indexXmin && connectionPart[i][0].j == indexYmax) ||
                                (connectionPart[i][1].i == indexXmin && connectionPart[i][1].j == indexYmax)) {
                                corners.bottomleft = true;
                            }
                        }
                        if (corners.bottomleft && corners.topleft && corners.topright) {
                            parts.push({
                                type: 'topleft',
                                top: Ymin+'em',
                                left: Xmin+'em',
                                width: (Xmax-Xmin)+'em',
                                height: (Ymax-Ymin)+'em'
                            });
                        } else if (corners.topleft && corners.topright && corners.bottomright) {
                            parts.push({
                                type: 'topright',
                                top: Ymin+'em',
                                left: Xmin+'em',
                                width: (Xmax-Xmin)+'em',
                                height: (Ymax-Ymin)+'em'
                            });
                        } else if (corners.topright && corners.bottomright && corners.bottomleft) {
                            parts.push({
                                type: 'bottomright',
                                top: Ymin+'em',
                                left: Xmin+'em',
                                width: (Xmax-Xmin)+'em',
                                height: (Ymax-Ymin)+'em'
                            });
                        } else {
                            parts.push({
                                type: 'bottomleft',
                                top: Ymin+'em',
                                left: Xmin+'em',
                                width: (Xmax-Xmin)+'em',
                                height: (Ymax-Ymin)+'em'
                            });
                        }
                    }
                }
                return parts;
            };

            var updateVisibleParts = function () {
                // get all endpoints
                var endpoints = getEndpoints();
                // get the grid
                var grid = getGrid(endpoints);
                // recursively find all good connections in the grid
                var goodConnections = findGoodConnections([], grid, grid.indexEndpoints);
                // combine connections to parts
                var connectionParts = constructConnectionParts(goodConnections, grid);
                // set the parts
                $scope.visibleParts = constructParts(connectionParts, grid);
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
                    throw NotEnrolledReadException(
                        reader + " is not enrolled to the bus an can not read.",
                        reader
                    );
                }
            };

            $scope.localHandler.stopReading = function (reader) {
                var index = findInConnections(reader);
                if (index >= 0) {
                    $scope.connections[index].is_reading = false;
                }
            };

            $scope.localHandler.isReading = function (reader) {
                var index = findInConnections(reader);
                if (index >= 0) {
                    return $scope.connections[index].is_reading;
                }
                return false;
            };

            $scope.localHandler.write = function (writer, data) {
                var index = findInConnections(writer);
                if (index >= 0) {
                    if ($scope.active && $scope.writerIndex != index) {
                        throw BusOccupiedException(
                            "This bus is already occupied by enrollee no.: " + $scope.writerIndex + ".",
                            $scope.writerIndex
                        );
                    } else {
                        $scope.connections[index].is_reading = false;
                        $scope.writerIndex = index;
                        $scope.active = true;
                        if ($scope.value != data) {
                            $scope.value = data;
                            for (var i = 0; i < $scope.connections.length; i++) {
                                if ($scope.connections[i].is_reading) {
                                    $scope.connections[i].callback($scope.value);
                                }
                            }
                        }
                    }
                } else {
                    throw NotEnrolledWriteException(
                        writer + " is not enrolled to the bus an can not write.",
                        writer
                    );
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

            $scope.localHandler.isWriting = function (writer) {
                var index = findInConnections(writer);
                if (index >= 0) {
                    if (index == $scope.writerIndex) {
                        return true;
                    }
                }
                return false;
            };
        },
        templateUrl: 'partials/component_Bus.html'
    }
});