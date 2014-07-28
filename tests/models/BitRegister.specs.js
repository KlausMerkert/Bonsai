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

describe('BitRegister', function() {
    it('should get correct binary bits', function () {
        var val = 123456;
        var callback = function (x) {val = x;};
        var bitreg = new BitRegister(callback, 'test bitregister', 3);
        expect(bitreg.getBit(0)).toBe(1);
        expect(bitreg.getBit(1)).toBe(1);
        expect(bitreg.getBit(2)).toBe(0);
        bitreg.setValue(4);
        expect(bitreg.getBit(0)).toBe(0);
        expect(bitreg.getBit(1)).toBe(0);
        expect(bitreg.getBit(2)).toBe(1);
        expect(bitreg.getBit(3)).toBe(0);
    });

    it('should set binary bits correctly', function () {
        var val = 123456;
        var callback = function (x) {val = x;};
        var bitreg = new BitRegister(callback, 'test bitregister', 3);
        bitreg.setBit(2, 1);
        expect(bitreg.value).toBe(7);
        expect(val).toBe(7);
        bitreg.setBit(1, 0);
        bitreg.setBit(3, 1);
        expect(val).toBe(13);
    });
});