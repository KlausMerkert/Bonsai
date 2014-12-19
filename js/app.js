'use strict';

// Menu structure
var menu = [
    {
        'name': "documentation",
        'title': "_documentation_",
        'link': '/documentation/',
        'partial': 'documentation.html',
        'submenu': [
            {
                'name': "micro",
                'title': "_micro_",
                'link': '/documentation/micro/',
                'partial': 'documentation_micro.html'
            }
        ]
    },
    {
        'name': "development",
        'title': "_development_",
        'link': '/development/',
        'partial': 'development.html',
        'submenu': [
            {
                'name': "plan",
                'title': "_plan_",
                'link': '/development/plan/',
                'partial': 'development_plan.html'
            },
            {
                'name': "github",
                'title': "_github_",
                'link': '/development/github/',
                'partial': 'development_github.html'
            },
            {
                'name': "js",
                'title': "_js_",
                'link': '/development/js/',
                'partial': 'development_js.html'
            },
            {
                'name': "angular",
                'title': "_angular_",
                'link': '/development/angular/',
                'partial': 'development_angular.html'
            },
            {
                'name': "jasmine",
                'title': "_jasmine_",
                'link': '/development/jasmine/',
                'partial': 'development_jasmine.html'
            }
        ]
    },
    {
        'name': "assembler",
        'title': "_assembler_",
        'link': '/assembler/'
    },
    {
        'name': "circuit",
        'title': "_circuit_",
        'link': '/circuit/',
        'partial': 'circuit.html'
    }
];

var bonsaiApp = angular.module(
    'Bonsai',
    [
        'ngAnimate',
        'ngRoute',
        'localization',
        'ServerServices'
    ]
);

bonsaiApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: '/partials/introduction.html', controller: 'bonsaiPageCtrl'});
    $routeProvider.when('/imprint/', {templateUrl: '/partials/imprint.html', controller: 'bonsaiPageCtrl'});
    var registerMenuRoutes = function (menu) {
        for (var i = 0; i < menu.length; i++) {
            if (menu[i].link && menu[i].partial) {
                $routeProvider.
                    when(menu[i].link, {templateUrl: '/partials/' + menu[i].partial, controller: 'bonsaiPageCtrl'});
            }
            if (menu[i].submenu) {
                registerMenuRoutes(menu[i].submenu);
            }
        }
    };
    registerMenuRoutes(menu);
    $routeProvider.
        when('/bonsai/', {templateUrl: '/partials/main.html', controller: 'bonsaiCpuCtrl'}).
        when('/assembler/', {templateUrl: '/partials/assembler.html', controller: 'bonsaiAssemblerCtrl'}).
        when('/bonsai/assembler/', {templateUrl: '/partials/assembler.html', controller: 'bonsaiAssemblerCtrl'});
    $routeProvider.otherwise({templateUrl: '/partials/introduction.html', controller: 'bonsaiPageCtrl'});
    // use the HTML5 History API
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

bonsaiApp.factory('$exceptionHandler', function ($injector) {
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
});

bonsaiApp.run(function ($rootScope, $window, $document, $location, localize, PageCounter) {
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
    var findPartial = function (path) {
        if (path == '/') {
            return 'introduction.html';
        }
        if (path == '/imprint/') {
            return 'imprint.html';
        }
        var findPartialInMenu = function (path, menu) {
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].link == path) {
                    return menu[i].partial
                }
                if (menu[i].submenu) {
                    var found = findPartialInMenu(path, menu[i].submenu);
                    if (found) {
                        return found;
                    }
                }
            }
            return false;
        };
        return findPartialInMenu(path, menu);
    };
    $rootScope.$watch(
        function () {
            return $location.path();
        },
        function (path) {
            PageCounter.count(path, findPartial(path)).success(function (data) {
                if (data.count) {
                    $rootScope.viewsCount = data.count;
                }
                if (data.last_change) {
                    $rootScope.lastChange = new Date(data.last_change * 1000);
                }
            });
            var pathParts = path.split('/');
            var currentMenu = [];
            angular.forEach(menu, function (menuEntry) {
                if (menuEntry.name == pathParts[1]) {
                    currentMenu = menu;
                }
            });
            if ((path == '/') || (path == '/imprint/')) {
                currentMenu = menu;
            }
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
            $rootScope.currentPath = path;
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