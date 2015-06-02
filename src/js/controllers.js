(function (angular) {
    'use strict';

    angular.module('MyCV.controllers', [])

    .controller('MainCtrl', [
        'config',
        function (config) {
            this.personalInformation = config.data.personal_information;
            this.skills = config.data.skills;
            this.languages = config.data.languages_spoken;
            this.workExperience = config.data.work_experience;
            this.educationAndTraining = config.data.education_and_training;
        }
    ])

    .controller('ProjectsCtrl', [
        'config',
        function (config) {
            this.projects = config.data.projects;
        }
    ])
    ;
})(angular);
