'use strict';

var bonsaiApp = angular.module(
        'Bonsai',
        [
            'ngAnimate',
            'ngRoute',
            'localization'
        ]
    )
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {templateUrl: '/partials/introduction.html', controller: 'bonsaiPageCtrl'}).
            when('/documentation/', {templateUrl: '/partials/documentation.html', controller: 'bonsaiPageCtrl'}).
            when('/bonsai/', {templateUrl: '/partials/main.html', controller: 'bonsaiCpuCtrl'}).
            otherwise({templateUrl: '/partials/introduction.html', controller: 'bonsaiPageCtrl'});
        // use the HTML5 History API
		$locationProvider.html5Mode(true).hashPrefix('!');
    }])
    .factory('$exceptionHandler', function ($injector) {
        return function (exception, cause) {
            if (exception.localization) {
                $injector.get('$rootScope').$broadcast('error', exception);
            } else {
                if (cause) {
                    console.log("Cause: " + cause);
                }
                throw exception;
            }
        };
    })
    .run(function ($rootScope, $window, $document, $location, localize) {
        // Menu structure
        var menu = {
            'documentation': {
                'micro': true
            },
            'development': {
                'plan': true,
                'github': true,
                'js': true,
                'angular': true,
                'jasmine': true
            },
            'demo': true
        };
        // root scope functions
        $rootScope.getLanguages = function () {
            return ['en', 'de'];
        };
        $rootScope.$watch('language', function (newLang) {
            localize.setLanguage(newLang);
            $rootScope.$broadcast('langChange', newLang);
        });
        $rootScope.$watch(
            function () {
                return $location.path();
            },
            function (path) {
                var pathParts = path.split('/');
                var currentMenu = menu;
                for (var i = 0; i < pathParts.length; i++) {
                    if (pathParts[i]) {
                        if (currentMenu[pathParts[i]]) {
                            currentMenu = currentMenu[pathParts[i]]
                        } else {
                            currentMenu = undefined;
                        }
                    }
                }
                $rootScope.menu = currentMenu;
                $rootScope.author = undefined;
            }
        );
        // initialization
        if (!$rootScope.language) {
            $rootScope.language = $window.navigator.userLanguage ||
                $window.navigator.language ||
                $document.getElementsByTagName('html')[0].lang;
            if ($rootScope.language && ($rootScope.language.length > 2)) {
                $rootScope.language = $rootScope.language.substr(0, 2);
            }
        }
        $rootScope.menu = menu;
    });