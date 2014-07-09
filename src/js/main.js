'use strict';
(function(undefined) {

    var activityReporter = angular.module('ActivityReporter', [
        'ar:env',
        'ar:inputfield'
    ]);

    activityReporter.controller('mainCtrl', ['$scope', 'env:buildName', 'env:buildVersion', function($scope, envBuildName, envBuildVersion) {
        $scope.text = 'example';
        $scope.buildName = envBuildName;
        $scope.buildVersion = envBuildVersion;
    }]);
})();
