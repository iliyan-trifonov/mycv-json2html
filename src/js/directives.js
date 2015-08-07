(function (angular) {
    'use strict';

    angular.module('MyCV.directives', [])

    .directive('personalInformation', [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/personal-information.html',
                scope: true,
                controllerAs: 'pi',
                bindToController: {
                    data: '='
                },
                controller: ['privatePropMessage', function (privatePropMessage) {
                    ['address', 'phone', 'email', 'skype', 'birthdate'].forEach(function (prop) {
                        if (!this.data[prop]) {
                            this.data[prop] = {
                                private: true,
                                value: privatePropMessage
                            };
                        } else {
                            this.data[prop] = {
                                private: false,
                                value: privatePropMessage
                            };
                        }
                    }, this);
                }]
            };
        }
    ])

    .directive('skills', [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/skills.html',
                scope: true,
                controller: function () {},
                controllerAs: 'sk',
                bindToController: {
                    skills: '=data'
                }
            };
        }
    ])

    .directive('languages', [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/languages.html',
                scope: true,
                controller: function () {},
                controllerAs: 'langCtrl',
                bindToController: {
                    languages: '=data'
                }
            };
        }
    ])

    .directive('workExperience', [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/work-experience.html',
                scope: true,
                controller: function () {},
                controllerAs: 'we',
                bindToController: {
                    data: '='
                }
            };
        }
    ])

    .directive('educationAndTraining', [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/education-and-training.html',
                scope: true,
                controller: function () {},
                controllerAs: 'et',
                bindToController: {
                    data: '='
                }
            };
        }
    ])

    .directive('project', [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/project.html',
                scope: true,
                controllerAs: 'proj',
                bindToController: {
                    data: '='
                },
                controller: function () {
                    this.showDemoUrl = this.data.demoUrl &&
                        this.data.demoUrl.url &&
                        this.data.demoUrl.name;
                }
            };
        }
    ])

    ;
})(angular);
