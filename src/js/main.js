'use strict';
(function(undefined) {

    var activityReporter = angular.module('ActivityReporter', [
        'ar:env'
    ]);

    activityReporter.controller('mainCtrl', ['$scope', 'env:buildName', 'env:buildVersion', function($scope, envBuildName, envBuildVersion) {
        $scope.buildName = envBuildName;
        $scope.buildVersion = envBuildVersion;
    }]);
})();
