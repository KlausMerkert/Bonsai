/****************************************************************************************
 * Copyright (c) 2014 Johannes Merkert, Klaus Merkert                                   *
 *                                                                                      *
 * This file is part of Bonsai.                                                         *
 *                                                                                      *
 * Bonsai is free software; you can redistribute it and/or modify it under              *
 * the terms of the GNU General Public License as published by the Free Software        *
 * Foundation; either version 3 of the License, or (at your option) any later           *
 * version.                                                                             *
 *                                                                                      *
 * Bonsai is distributed in the hope that it will be useful, but WITHOUT ANY            *
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A      *
 * PARTICULAR PURPOSE. See the GNU General Public License for more details.             *
 *                                                                                      *
 * You should have received a copy of the GNU General Public License along with         *
 * Bonsai. If not, see <http://www.gnu.org/licenses/>.                                  *
 ****************************************************************************************/

describe('BusRouter', function(){
    it('should be able to collect all endpoints', function () {
        var connections = [
            {'getPositions': function () {return [1, 2, 3]}},
            {'getPositions': function () {return [4, 5]}},
            {'getPositions': function () {return [6, 7, 8]}}
        ];
        var router = new BusRouter(connections, null);
        for (var i = 0; i < 8; i++) {
            expect(router.getEndpoints()[i]).toBe(i + 1);
        }
    });

    it('should construct connection parts with 3 endpoints in a 3x3 grid (K-Shaped)', function () {
        var router = new BusRouter([], undefined);
        var goodConnections = [
            {'connection': [{'i': 2, 'j': 1}, {'i': 1, 'j': 1}], 'dist': 1, 'weight': 1},
            {'connection': [{'i': 1, 'j': 1}, {'i': 1, 'j': 2}], 'dist': 1, 'weight': 1},
            {'connection': [{'i': 1, 'j': 1}, {'i': 1, 'j': 0}], 'dist': 1, 'weight': 1},
            {'connection': [{'i': 1, 'j': 0}, {'i': 0, 'j': 0}], 'dist': 1, 'weight': 1},
        ];
        var grid = {
            'XCoordinates': [1, 2, 3],
            'YCoordinates': [1, 3, 3.5]
        };
        var connectionParts = router.constructConnectionParts(goodConnections, grid);
        expect(connectionParts.length).toBe(3);
        var expected = [
            [
                [{'i': 2, 'j': 1}, {'i': 1, 'j': 1}]
            ],
            [
                [{'i': 1, 'j': 1}, {'i': 1, 'j': 0}],
                [{'i': 1, 'j': 0}, {'i': 0, 'j': 0}]
            ],
            [
                [{'i': 1, 'j': 1}, {'i': 1, 'j': 2}]
            ]
        ];
        expect(connectionParts).toEqual(expected);
    });

    it('should construct connection parts with 3 endpoints in a 3x3 grid (S-Shaped)', function () {
        var router = new BusRouter([], undefined);
        var goodConnections = [
            {'connection': [{'i': 1, 'j': 1}, {'i': 1, 'j': 0}], 'dist': 1, 'weight': 19.88},
            {'connection': [{'i': 2, 'j': 0}, {'i': 1, 'j': 0}], 'dist': 7, 'weight': 0.01},
            {'connection': [{'i': 0, 'j': 2}, {'i': 1, 'j': 2}], 'dist': 11.5, 'weight': 13.5},
            {'connection': [{'i': 1, 'j': 1}, {'i': 1, 'j': 2}], 'dist': 2, 'weight': 0.01},
        ];
        var grid = {
            'XCoordinates': [1, 2, 3],
            'YCoordinates': [1, 3, 3.5]
        };
        var connectionParts = router.constructConnectionParts(goodConnections, grid);
        console.log(connectionParts);
        expect(connectionParts.length).toBe(2);
    });

    it('should find two corners', function () {
        var router = new BusRouter([], undefined);
        var connections = [
            {'connection': [{'i': 1, 'j': 1}, {'i': 1, 'j': 0}], 'dist': 1, 'weight': 19.88},
            {'connection': [{'i': 2, 'j': 0}, {'i': 1, 'j': 0}], 'dist': 7, 'weight': 0.01},
            {'connection': [{'i': 0, 'j': 2}, {'i': 1, 'j': 2}], 'dist': 11.5, 'weight': 13.5},
            {'connection': [{'i': 1, 'j': 1}, {'i': 1, 'j': 2}], 'dist': 2, 'weight': 0.01},
        ];
        var corners = router.findCorners(connections);
        expect(corners.length).toBe(2);
        expect(corners).toEqual([
            {'i': 1, 'j': 0},
            {'i': 1, 'j': 2}
        ]);
    })
});