'use strict';

bonsaiApp.factory('BinaryProgram', function () {
    var binaryProgramService = {};

    binaryProgramService.setProgram = function (program) {
        sessionStorage.setItem('binaryProgram', program);
    };

    binaryProgramService.getProgram = function () {
        var program = sessionStorage.getItem('binaryProgram');
        if (!program) {
            program = '';
        }
        return program;
    };

    binaryProgramService.deleteProgram = function () {
        sessionStorage.removeItem('binaryProgram');
    };

    binaryProgramService.hasProgram = function () {
        return !!sessionStorage.getItem('binaryProgram');
    };

    return binaryProgramService;
});