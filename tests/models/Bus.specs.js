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

describe('Bus', function() {
    it('should be createable', function () {
        var bus = new Bus();
        expect(bus.name).toBe('unnamed Bus');
        expect(bus.value).toBeUndefined();
        expect(bus.connections.length).toBe(0);
        expect(bus.readers.length).toBe(0);
        expect(bus.active).toBeFalsy();
    });

    it('should return the right width', function () {
        var bus = new Bus();
        expect(bus.getWidth()).toBe(1);
        bus.setMax(2);
        expect(bus.getMax()).toBe(2);
        expect(bus.getWidth()).toBe(2);
        bus.setMax(255);
        expect(bus.getWidth()).toBe(8);
        bus.setMax(256);
        expect(bus.getWidth()).toBe(9);
    });

    it('should be able to set and get the name', function () {
        var bus = new Bus();
        expect(bus.name).toBe('unnamed Bus');
        bus.setName('Hugo der Bus');
        expect(bus.getName()).toBe('Hugo der Bus');
    });
});