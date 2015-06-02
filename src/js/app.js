(function (angular) {
    'use strict';

    angular.module('MyCV', [
        'MyCV.controllers',
        'MyCV.services',
        'MyCV.directives',
        'ngRoute'
    ])

    .value('configFile', 'js/config.json')
    .value('privatePropMessage', 'To be disclosed in person')

    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/partials/main.html',
                controller: 'MainCtrl',
                controllerAs: 'mc',
                resolve: {
                    config: 'getConfig'
                }
            })
            .when('/projects', {
                templateUrl: 'templates/partials/projects.html',
                controller: 'ProjectsCtrl',
                controllerAs: 'pp',
                resolve: {
                    config: 'getConfig'
                }
            })
            .otherwise({
                redirectTo: '/'
            });
        }
    ])

    ;
})(angular);
