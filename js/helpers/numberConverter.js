'use strict';

bonsaiApp.filter('binary', function () {
    return function (number) {
        if (number === 0) {
            return '0';
        }
        var result = '';
        var digit;
        while (number > 0) {
            digit = number % 2;
            number = Math.floor(number / 2);
            result = digit + result;
        }
        return result;
    };
});

bonsaiApp.filter('octal', function () {
    return function (number) {
        if (number === 0) {
            return '0';
        }
        var result = '';
        var digit;
        while (number > 0) {
            digit = number % 8;
            number = Math.floor(number / 8);
            result = digit + result;
        }
        return result;
    };
});

bonsaiApp.filter('hexadecimal', function () {
    return function (number) {
        if (number === 0) {
            return '0';
        }
        var result = '';
        var digit;
        while (number > 0) {
            digit = number % 16;
            number = Math.floor(number / 16);
            if (digit === 10) {
                result = 'a' + result;
            } else if (digit === 11) {
                result = 'b' + result;
            } else if (digit === 12) {
                result = 'c' + result;
            } else if (digit === 13) {
                result = 'd' + result;
            } else if (digit === 14) {
                result = 'e' + result;
            } else if (digit === 15) {
                result = 'f' + result;
            } else {
                result = digit + result;
            }
        }
        return result;
    };
});