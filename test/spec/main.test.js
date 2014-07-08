'use strict';

describe('MODULE ActivityReport', function() {

    describe('CONTROLLER mainCtrl', function() {

        it('should exist', function() {
            module('ActivityReporter');
            inject([
                '$controller',
                function($controller) {
                    var scope = {};

                    var ctrl = $controller('mainCtrl', {
                        $scope: scope,
                        'env:buildName': 'buildname',
                        'env:buildVersion': 'buildversion'
                    });

                    expect(ctrl).toBeDefined();
                    expect(scope.buildName).toBeDefined();
                    expect(scope.buildVersion).toBeDefined();
                }
            ]);
        });

    }); //CONTROLLER mainCtrl
    
}); //MODULE ActivityReport
