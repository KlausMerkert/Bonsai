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
});