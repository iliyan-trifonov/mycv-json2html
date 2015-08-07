(function (angular) {
    'use strict';

    angular.module('MyCV', [
        'MyCV.controllers',
        'MyCV.services',
        'MyCV.directives',
        'ngRoute',
        'ngAnimate'
    ])

    .value('configFile', 'js/config.json')
    .value('privatePropMessage', 'To be disclosed in person')

    .config([
        '$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/partials/main.html',
                controller: 'MainCtrl',
                controllerAs: 'mc',
                resolve: {
                    config: ['getConfig', function (getConfig) {
                        return getConfig();
                    }]
                }
            })
            .when('/projects', {
                templateUrl: 'templates/partials/projects.html',
                controller: 'ProjectsCtrl',
                controllerAs: 'pp',
                resolve: {
                    config: ['getConfig', function (getConfig) {
                        return getConfig();
                    }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });

            $locationProvider.html5Mode(true);
        }
    ])

    .run(['$rootScope', 'getConfig', function ($rootScope, getConfig) {
        getConfig().then(function (config) {
            $rootScope.cvTitle = config.data.cvTitle;
            $rootScope.cvDescription = config.data.cvDescription;
        });

        //autoscroll on top on route change (better than ng-view's autoscroll)
        $rootScope.$on("$routeChangeSuccess", function () {
            window.scrollTo(0, 0);
        });
    }])

    ;
})(angular);
