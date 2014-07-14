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

describe('Memory', function() {
    it('should be createable', function () {
        var val = 0;
        var callback = function (x) {val = x;};
        var mem = new Memory(callback, 'testMemory');
        expect(mem.name).toBe('testMemory');
    });

    it('should return and set its name', function () {
        var val = 0;
        var callback = function (x) {val = x;};
        var mem = new Memory(callback, 'testMemory');
        expect(mem.getName()).toBe('testMemory');
        mem.setName('dudeldi');
        expect(mem.getName()).toBe('dudeldi');
    });

    it('should set address bus to read', function () {
        var addressBusMock = {
            registerReaderAndRead: function () {return 10}
        };
        var val = 0;
        var callback = function (x) {val = x;};
        var mem = new Memory(callback, 'testMemory');
        mem.setAddressBusConnection(addressBusMock, undefined);
        mem.setAddressBusState(-1);
        expect(mem.getAddressBus()).toBe(addressBusMock);
        expect(mem.addressBus.state).toBe(-1);
    });

    it('should be able to write data', function () {
        var addressBusMock = {
            registerReaderAndRead: function () {return 10}
        };
        var context = [
            {"address": undefined, 'value': undefined},
            {"address": undefined, 'value': undefined},
            {"address": undefined, 'value': undefined},
            {"address": undefined, 'value': undefined},
            {"address": undefined, 'value': undefined}
        ];
        var callback = function (x) {context = x;};
        var mem = new Memory(callback, 'testMemory');
        mem.setAddressBusConnection(addressBusMock, undefined);
        mem.setAddressBusState(-1);
        mem.writeData(123);
        expect(mem.content[10]).toBe(123);
        expect(context).toEqual([
            {"address": undefined, 'value': undefined},
            {"address": undefined, 'value': undefined},
            {"address": 10, 'value': 123},
            {"address": undefined, 'value': undefined},
            {"address": undefined, 'value': undefined}
        ]);
    });

    it('should get data with context', function () {
        var address = 10;
        var addressBusMock = {
            registerReaderAndRead: function () {return address}
        };
        var context = [
            {"address": undefined, 'value': undefined},
            {"address": undefined, 'value': undefined},
            {"address": undefined, 'value': undefined},
            {"address": undefined, 'value': undefined},
            {"address": undefined, 'value': undefined}
        ];
        var callback = function (x) {context = x;};
        var mem = new Memory(callback, 'testMemory');
        mem.setAddressBusConnection(addressBusMock, undefined);
        mem.setAddressBusState(-1);
        var data = [
            {address: 0, value: 55},
            {address: 7, value: 13},
            {address: 8, value: 44},
            {address: 10, value: 78},
            {address: 11, value: 0},
            {address: 27, value: -8},
            {address: 49, value: 17},
            {address: 1556, value: 5357457},
        ];
        for (var i = 0; i < data.length; i++) {
            address = data[i].address;
            mem.writeData(data[i].value);
            expect(mem.content[address]).toBe(data[i].value);
        }

    });
});