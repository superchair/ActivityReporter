'use strict';
(function(undefined) {

    var activityReporter = angular.module('ActivityReporter', [
        'ar:env', 'xeditable', 'ui.bootstrap', 'dialogs.main','dialogs.default-translations'
    ]);

    activityReporter.run(function(editableOptions) {
        editableOptions.theme = 'bs3';
    });

    activityReporter.controller('mainCtrl', ['$scope', 'env:buildName', 'env:buildVersion', function($scope, envBuildName, envBuildVersion) {
        $scope.buildName = envBuildName;
        $scope.buildVersion = envBuildVersion;

        $scope.items = [{text:'Top Item', subItems:[{text:'I am a top level item'}, {text:'I am also a top level item'}]},{text:'Second Item', subItems:[]}];
    }]);

    activityReporter.controller('dialogCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
        $scope.launch = function() {
            console.log("Hi you pressed me :P");
        };
    }]);

    activityReporter.directive('listItem', function() {
        return {
            restrict:'E',
            templateUrl:'templates/list.html',
            scope: {
                item:'='
            }
        };
    });
})();
