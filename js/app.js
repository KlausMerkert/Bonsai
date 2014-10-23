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
        var menu = [
            {
                'title': "_documentation_",
                'link': '/documentation/',
                'submenu': [
                    {
                        'title': "_micro_",
                        'link': '/documentation/micro/'
                    }
                ]
            },
            {
                'title': "_development_",
                'link': '/development/',
                'submenu': [
                    {
                        'title': "_plan_",
                        'link': '/development/plan/'
                    },
                    {
                        'title': "_github_",
                        'link': '/development/github/'
                    },
                    {
                        'title': "_js_",
                        'link': '/development/js/'
                    },
                    {
                        'title': "_angular_",
                        'link': '/development/angular/'
                    },
                    {
                        'title': "_jasmine_",
                        'link': '/development/jasmine/'
                    }
                ]
            },
            {
                'title': "_demo_",
                'link': '/bonsai/'
            }
        ];
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
                        if (currentMenu[i].submenu) {
                            currentMenu = currentMenu[i].submenu
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