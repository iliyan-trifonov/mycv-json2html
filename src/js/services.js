(function (angular) {
    'use strict';

    angular.module('MyCV.services', [])

    .service('getConfig', function ($http, configFile) {
        return $http({
            url: configFile,
            method: 'GET',
            cache: true
        });
    })

    ;
})(angular);
