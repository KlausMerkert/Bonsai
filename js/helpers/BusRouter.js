'use strict';

function BusRouter (connections, handler) {
    this.connections = connections;
    this.handler = handler;
}

BusRouter.prototype.printPoint = function (point) {
    return "(" + point.i + ", " + point.j + ")";
};

BusRouter.prototype.printPointList = function (pointList) {
    var convertedPointList = [];
    for (var i = 0; i < pointList.length; i++) {
        convertedPointList.push(this.printPoint(pointList[i]));
    }
    return "[" + convertedPointList.join(", ") + "]"
};

BusRouter.prototype.printCoordinatePointList = function (list) {
    var convertedList = [];
    for (var i = 0; i < list.length; i++) {
        convertedList.push("(" + list[i].left + ", " + list[i].top + ")");
    }
    return "[" + convertedList.join(", ") + "]"
};

BusRouter.prototype.printConnections = function (connections) {
    var points = [];
    for (var i = 0; i < connections.length; i++) {
        points.push(this.printPoint(connections[i].connection[0]) + "->" +
            this.printPoint(connections[i].connection[1]));
    }
    return "[" + points.join(", ") + "]";
};

BusRouter.prototype.setConnections = function (connections) {
    this.connections = connections;
};

BusRouter.prototype.isInList = function (element, list) {
    for (var i = 0; i < list.length; i++) {
        if (angular.equals(element, list[i])) {
            return true;
        }
    }
    return false;
};

BusRouter.prototype.isInConnections = function (candidate, connections) {
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

BusRouter.prototype.getEndpoints = function () {
    var endpoints = [];
    for (var i = 0; i < this.connections.length; i++) {
        var connectionEndpoints = this.connections[i].getPositions(this.handler);
        for (var j = 0; j < connectionEndpoints.length; j++) {
            endpoints.push(connectionEndpoints[j]);
        }
    }
    return endpoints;
};

BusRouter.prototype.getGrid = function (endpoints) {
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

BusRouter.prototype.cluster = function (points, connections) {
    var clusters = [];
    for (var i = 0; i < connections.length; i++) {
        var connectionAdded = false;
        // Test if one of the connection point is already in one of the clusters and
        // add the other point if it is not already in there.
        var j = 0;
        while (j < clusters.length) {
            if (this.isInList(connections[i].connection[0], clusters[j]) && !connectionAdded) {
                if (!this.isInList(connections[i].connection[1], clusters[j])) {
                    clusters[j].push(connections[i].connection[1]);
                    // check if we should merge clusters
                    var k = j+1;
                    while (k < clusters.length) {
                        if (this.isInList(connections[i].connection[1], clusters[k])) {
                            for (var l = 0; l < clusters[k].length; l++) {
                                if (!this.isInList(clusters[k][l], clusters[j])) {
                                    clusters[j].push(clusters[k][l]);
                                }
                            }
                            clusters.splice(k,1);
                        }
                        k++;
                    }
                }
                connectionAdded = true;
            } else if (this.isInList(connections[i].connection[1], clusters[j]) && !connectionAdded) {
                if (!this.isInList(connections[i].connection[0], clusters[j])) {
                    clusters[j].push(connections[i].connection[0]);
                    // check if we should merge clusters
                    k = j+1;
                    while (k < clusters.length) {
                        if (this.isInList(connections[i].connection[0], clusters[k])) {
                            for (l = 0; l < clusters[k].length; l++) {
                                if (!this.isInList(clusters[k][l], clusters[j])) {
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
            if (this.isInList(points[i], clusters[j])) {
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

BusRouter.prototype.getWaypointWeight = function (point, grid, waypoints, alreadyFoundConnections) {
    if (this.isInList(point, waypoints)) {
        return 0.01;
    }
    var clusters = this.cluster(waypoints, alreadyFoundConnections);
    var weightSum = 0;
    for (var k = 0; k < clusters.length; k++) {
        if (!this.isInList(point, clusters[k])) {
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

BusRouter.prototype.findGoodConnections = function (alreadyFoundConnections, grid, waypoints) {
    // find all possible waypoint connections
    var possibleNewConnections = [];
    var connection;
    for (var k = 0; k < waypoints.length; k++) {
        if (waypoints[k].i + 1 < grid.XCoordinates.length) {
            connection = [
                waypoints[k],
                {i: waypoints[k].i + 1, j: waypoints[k].j}
            ];
            if (!this.isInConnections({connection: connection}, alreadyFoundConnections)) {
                possibleNewConnections.push({
                    connection: connection,
                    dist: grid.XCoordinates[waypoints[k].i + 1] - grid.XCoordinates[waypoints[k].i],
                    weight: this.getWaypointWeight(
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
            if (!this.isInConnections({connection: connection}, alreadyFoundConnections)) {
                possibleNewConnections.push({
                    connection: connection,
                    dist: grid.XCoordinates[waypoints[k].i] - grid.XCoordinates[waypoints[k].i - 1],
                    weight: this.getWaypointWeight(
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
            if (!this.isInConnections({connection: connection}, alreadyFoundConnections)) {
                possibleNewConnections.push({
                    connection: connection,
                    dist: grid.YCoordinates[waypoints[k].j] - grid.YCoordinates[waypoints[k].j - 1],
                    weight: this.getWaypointWeight(
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
            if (!this.isInConnections({connection: connection}, alreadyFoundConnections)) {
                possibleNewConnections.push({
                    connection: connection,
                    dist: grid.YCoordinates[waypoints[k].j + 1] - grid.YCoordinates[waypoints[k].j],
                    weight: this.getWaypointWeight(
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
        if (this.isInConnections(possibleNewConnections[i], alreadyFoundConnections)) {
            possibleNewConnections.splice(i, 1);
        }
    }
    if (possibleNewConnections.length > 0) {
        // select the connection with the smallest weight
        alreadyFoundConnections.push(possibleNewConnections[0]);
        // add the new waypoint
        if (!this.isInList(possibleNewConnections[0].connection[0], waypoints)) {
            waypoints.push(possibleNewConnections[0].connection[0]);
        }
        if (!this.isInList(possibleNewConnections[0].connection[1], waypoints)) {
            waypoints.push(possibleNewConnections[0].connection[1]);
        }
        // recursively add the rest of the connections if necessary
        var clusters = this.cluster(waypoints, alreadyFoundConnections);
        if (clusters.length > 1) {
            alreadyFoundConnections = this.findGoodConnections(alreadyFoundConnections, grid, waypoints);
        }
    }
    return alreadyFoundConnections;
};

BusRouter.prototype.getCountGrid = function (connections, dimensions) {
    var countGrid = [];
    for (var i = 0; i < dimensions.y; i++) {
        countGrid.push([]);
        for (var j = 0; j < dimensions.x; j++) {
            countGrid[i].push(0);
        }
    }
    for (i = 0; i < connections.length; i++) {
        countGrid[connections[i].connection[0].j][connections[i].connection[0].i]++;
        countGrid[connections[i].connection[1].j][connections[i].connection[1].i]++;
    }
    return countGrid;
};

BusRouter.prototype.constructConnectionParts = function (goodConnections, grid) {
    // get junction points
    var countGrid = this.getCountGrid(goodConnections, {x: grid.XCoordinates.length, y: grid.YCoordinates.length});

    /*var countGrid = [];
    for (var i = 0; i < grid.YCoordinates.length; i++) {
        countGrid.push([]);
        for (var j = 0; j < grid.YCoordinates.length; j++) {
            countGrid[i].push(0);
        }
    }
    for (i = 0; i < goodConnections.length; i++) {
        countGrid[goodConnections[i].connection[0].i][goodConnections[i].connection[0].j]++;
        countGrid[goodConnections[i].connection[1].i][goodConnections[i].connection[1].j]++;
    }*/

    var junctionPoints = [];
    for (var i = 0; i < countGrid.length; i++) {
        for (var j = 0; j < countGrid[i].length; j++) {
            if (countGrid[i][j] > 2) {
                junctionPoints.push({i: i, j: j});
            }
        }
    }
    console.log(this.printPointList(junctionPoints));
    // begin connections at the first junction point
    var remainingConnections = angular.copy(goodConnections);
    var connectionParts = [];
    for (i = 0; i < junctionPoints.length; i++) {
        var point = junctionPoints[i];
        var connectionsToFollow = [];
        for (j = 0; j < remainingConnections.length; j++) {
            if (angular.equals(point, remainingConnections[j].connection[0])) {
                connectionParts.push([remainingConnections[j].connection]);
                if (countGrid[remainingConnections[j].connection[1].i][remainingConnections[j].connection[1].j] == 2) {
                    connectionsToFollow.push({
                        point: remainingConnections[j].connection[1],
                        part: connectionParts.length-1
                    });
                }
                remainingConnections.splice(j, 1);
            } else if (angular.equals(point, remainingConnections[j].connection[1])) {
                connectionParts.push([remainingConnections[j].connection]);
                if (countGrid[remainingConnections[j].connection[0].i][remainingConnections[j].connection[0].j] == 2) {
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
                    if (countGrid[remainingConnections[j].connection[1].i][remainingConnections[j].connection[1].j] != 2) {
                        connectionsToFollow.splice(0, 1);
                    } else {
                        connectionsToFollow[0].point = remainingConnections[j].connection[1];
                    }
                    remainingConnections.splice(j, 1);
                } else if (angular.equals(point, remainingConnections[j].connection[1])) {
                    connectionParts[connectionsToFollow[0].part].push(remainingConnections[j].connection);
                    if (countGrid[remainingConnections[j].connection[0].i][remainingConnections[j].connection[0].j] != 2) {
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
        var chain = this.sortConnectionsToChain(
            remainingConnections,
            {'x': grid.XCoordinates.length, 'y': grid.YCoordinates.length});
        var corners = this.findCorners(chain);
        var junctionLessPart;
        var iteration = 0;
        while ((corners.length > 1) && (iteration < remainingConnections.length)) {
            // follow the chain to the first corner
            junctionLessPart = [];
            for (i = 0; i < chain.length; i++) {
                var cornerFound = false;
                for (j = 0; j < corners.length; j++) {
                    if (((chain[i].connection[0].i == corners[j].i) && (chain[i].connection[0].j == corners[j].j)) ||
                        ((chain[i].connection[1].i == corners[j].i) && (chain[i].connection[1].j == corners[j].j))) {
                        cornerFound = true;
                    }
                }
                junctionLessPart.push(chain[i].connection);
                chain.splice(i, 1);
                if (cornerFound) {
                    junctionLessPart.push(chain[i].connection);
                    chain.splice(i, 1);
                    break;
                }
            }
            connectionParts.push(junctionLessPart);
            corners = this.findCorners(chain);
            iteration++;
        }
        junctionLessPart = [];
        for (i = 0; i < chain.length; i++) {
            junctionLessPart.push(chain[i].connection);
        }
        connectionParts.push(junctionLessPart);
    }
    return connectionParts;
};

BusRouter.prototype.findCorners = function (connections) {
    var corners = [];
    for (var i = 0; i < connections.length - 1; i++) {
        var connI = connections[i].connection;
        for (var j = i + 1; j < connections.length; j++) {
            var connJ = connections[j].connection;
            if (((connI[0].i == connJ[0].i) && (connI[0].j == connJ[0].j)) ||
                ((connI[1].i == connJ[1].i) && (connI[1].j == connJ[1].j))) {
                if ((Math.min(connI[0].i, connI[1].i, connJ[0].i, connJ[1].i) <
                    Math.max(connI[0].i, connI[1].i, connJ[0].i, connJ[1].i)) &&
                    (Math.min(connI[0].j, connI[1].j, connJ[0].j, connJ[1].j) <
                    Math.max(connI[0].j, connI[1].j, connJ[0].j, connJ[1].j))) {
                    // connections[i] and connections[j] form a corner. The corner is the point they share.
                    if ((connI[0].i == connJ[0].i) && (connI[0].j == connJ[0].j)) {
                        corners.push(connI[0]);
                    } else if ((connI[1].i == connJ[1].i) && (connI[0].j == connJ[0].j)) {
                        corners.push(connI[1]);
                    } else if ((connI[0].i == connJ[0].i) && (connI[1].j == connJ[1].j)) {
                        corners.push(connI[0]);
                    } else {
                        corners.push(connI[1]);
                    }
                }
            }
        }
    }
    return corners;
};

BusRouter.prototype.sortConnectionsToChain = function (connections, gridDimensions) {
    // find a start point
    var startPoint = connections[0].connection[0];
    var countGrid = this.getCountGrid(connections, gridDimensions);
    for (var i = 0; i < countGrid.length; i++) {
        for (var j = 0; j < countGrid[i].length; j++) {
            if (countGrid[i][j] == 1) {
                startPoint = {'i': j, 'j': i};
                break;
            }
        }
    }
    // traverse the chain
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(this.printPoint(startPoint));
    var position = startPoint;
    var chainedConnections = [];
    var remainingConnections = angular.copy(connections);
    while (remainingConnections.length > 0) {
        console.log(this.printConnections(remainingConnections));
        var connectionFound = false;
        for (i = 0; i < remainingConnections.length; i++) {
            if ((remainingConnections[i].connection[0].i == position.i) &&
                (remainingConnections[i].connection[0].j == position.j)) {
                position = remainingConnections[i].connection[1];
                chainedConnections.push(remainingConnections[i]);
                remainingConnections.splice(i, 1);
                connectionFound = true;
                break;
            } else if ((remainingConnections[i].connection[1].i == position.i) &&
                       (remainingConnections[i].connection[1].j == position.j)) {
                position = remainingConnections[i].connection[0];
                chainedConnections.push(remainingConnections[i]);
                remainingConnections.splice(i, 1);
                connectionFound = true;
                break;
            }
        }
        if (!connectionFound) {
            console.log("This seems to be disconnected. That should not happen!");
            break;
        }
    }
    return chainedConnections;
};

BusRouter.prototype.constructParts = function (connectionParts, grid) {
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

BusRouter.prototype.updateVisibleParts = function () {
    // get all endpoints
    var endpoints = this.getEndpoints();
    console.log("Endpoints: " + this.printCoordinatePointList(endpoints));
    // get the grid
    var grid = this.getGrid(endpoints);
    // recursively find all good connections in the grid
    var goodConnections = this.findGoodConnections([], grid, grid.indexEndpoints);
    console.log("Good connections: " + this.printConnections(goodConnections));
    // combine connections to parts
    var connectionParts = this.constructConnectionParts(goodConnections, grid);
    // set the parts
    return this.constructParts(connectionParts, grid);
};