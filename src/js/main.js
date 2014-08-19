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

        $scope.createNewTopItem = function(){
            console.log('Add new Topic Item!!');
        }
    }]);

    activityReporter.controller('dialogCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
        $scope.newSubItem = function(parentItem) {
            console.log('Add new subitem');
            console.log(parentItem);
        };

        $scope.editItem = function(item){
            console.log('EDIT ME!!');
            console.log(item);
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
