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
            when('/documentation/micro/', {templateUrl: '/partials/documentation_micro.html', controller: 'bonsaiPageCtrl'}).
            when('/development/', {templateUrl: '/partials/development.html', controller: 'bonsaiPageCtrl'}).
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
                'name': "documentation",
                'title': "_documentation_",
                'link': '/documentation/',
                'submenu': [
                    {
                        'name': "micro",
                        'title': "_micro_",
                        'link': '/documentation/micro/'
                    }
                ]
            },
            {
                'name': "development",
                'title': "_development_",
                'link': '/development/',
                'submenu': [
                    {
                        'name': "plan",
                        'title': "_plan_",
                        'link': '/development/plan/'
                    },
                    {
                        'name': "github",
                        'title': "_github_",
                        'link': '/development/github/'
                    },
                    {
                        'name': "js",
                        'title': "_js_",
                        'link': '/development/js/'
                    },
                    {
                        'name': "angular",
                        'title': "_angular_",
                        'link': '/development/angular/'
                    },
                    {
                        'name': "jasmine",
                        'title': "_jasmine_",
                        'link': '/development/jasmine/'
                    }
                ]
            },
            {
                'name': "bonsai",
                'title': "_demo_",
                'link': '/bonsai/',
                'submenu': []
            }
        ];
        // root scope functions
        $rootScope.getLanguages = function () {
            return ['en', 'de'];
        };
        $rootScope.setLanguage = function (lang) {
            $rootScope.language = lang;
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
                var navigationPath = [];
                for (var i = 0; i < pathParts.length; i++) {
                    if (pathParts[i]) {
                        for (var j = 0; j < currentMenu.length; j++) {
                            if ((currentMenu[j].name == pathParts[i]) && (currentMenu[j].submenu)) {
                                navigationPath.push({'title': currentMenu[j].title, 'link': currentMenu[j].link});
                                currentMenu = currentMenu[j].submenu;
                            }
                        }
                    }
                }
                $rootScope.navigationPath = navigationPath;
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