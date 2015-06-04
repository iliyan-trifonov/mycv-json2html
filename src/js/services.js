(function (angular) {
    'use strict';

    angular.module('MyCV.services', [])

    .service('getConfig', ['$http', 'configFile', function ($http, configFile) {
        return function () {
            return $http({
                url: configFile,
                method: 'GET',
                cache: true
            })
        };
    }])

    ;
})(angular);
