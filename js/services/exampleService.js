'use strict';

bonsaiApp.factory('ExampleStorage', function ($http) {
    return {
        loadExample: function (name) {
            return $http.get('examples/' + name + '.json');
        }
    };
});