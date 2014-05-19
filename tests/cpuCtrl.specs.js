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
 * Findeco is distributed in the hope that it will be useful, but WITHOUT ANY           *
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A      *
 * PARTICULAR PURPOSE. See the GNU General Public License for more details.             *
 *                                                                                      *
 * You should have received a copy of the GNU General Public License along with         *
 * Bonsai. If not, see <http://www.gnu.org/licenses/>.                                  *
 ****************************************************************************************/

describe('BonsaiCpuCtrl', function(){
    var scope = {};
    var ctrl = null;

    beforeEach(angular.mock.module('Bonsai'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('bonsaiCpuCtrl', {
            $scope: scope
        });
    }));

    it('should be registered', inject(function ($rootScope, $injector) {
        expect(ctrl).not.toBe(null);
        expect(scope.dataBusHandler).not.toBe(null);
        expect(scope.adressBusHandler).not.toBe(null);
        expect(scope.errors).toBeDefined();
        expect(scope.errors.length).toBe(0);
    }));
});