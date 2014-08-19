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

        $scope.items = [{label:'Top Item', text:'This is the top item!'},{label:'Second Item', text:null, children:[{label:'sub item one', text:'This is the text for sub item one', children:[{label:'sub sub item...', text:'I think you get the point....'}]}]}];
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
