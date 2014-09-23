'use strict';
(function(undefined) {

    var activityReporter = angular.module('ActivityReporter', [
        'ar:env', 'ui.bootstrap', 'dialogs.main','dialogs.default-translations', 'DBServices', 'ngCookies', 'ngResource', 'ngSanitize', 'dfUserManagement'
    ]);

    activityReporter.constant('DSP_URL', 'http://10.132.7.50:8080')
    activityReporter.constant('DSP_API_KEY', 'ActivityReporter')

    activityReporter.config(['$httpProvider', 'DSP_API_KEY', function($httpProvider, DSP_API_KEY){
        $httpProvider.defaults.headers.common['X-DRE']
    }])

    activityReporter.controller('mainCtrl', ['$scope', 'env:buildName', 'env:buildVersion', '$dialogs', 'DB:getAllRecords', function($scope, envBuildName, envBuildVersion, $dialogs, dbGetAllRecords) {
        $scope.buildName = envBuildName;
        $scope.buildVersion = envBuildVersion;
        var dlg = null;

        $scope.items = [];
        console.log('calling get all records')
        dbGetAllRecords().then(
            function(records) {
                $scope.items = records;
            },
            function() {
                //TODO notify of possible error
            }
        );

        $scope.createNewTopItem = function(){
            console.log('Add new Topic Item!!');
            dlg = $dialogs.create('/templates/dialog.html','dialogCtrl',undefined,{key: false,back: 'static'});
            dlg.result.then(function(itemName){
                var newItem = { text: itemName, subItems: []};
                $scope.items.push(newItem);
            },function(){
                console.log('No Input');
            });
        };
    }]);

    activityReporter.controller('dialogCtrl', function($scope, $modalInstance, data){
        $scope.item = {text: ''};
        if(data === undefined) {
            $scope.parentItem = {text: 'Create New Item'};
        } else {
            $scope.parentItem = data;
        }
        console.log(data);
        

        $scope.cancel = function(){
            $modalInstance.dismiss('canceled');
        }; // end cancel
  
        $scope.save = function(){
            $modalInstance.close($scope.item.text);
        }; // end save
    });

    activityReporter.controller('editDialogCtrl', function($scope, $modalInstance, data){
        $scope.item = data;

        $scope.cancel = function(){
            $modalInstance.dismiss(data);
        }; // end cancel
  
        $scope.save = function(){
            $modalInstance.close($scope.item);
        }; // end save
    });

    activityReporter.controller('itemCtrl', ['$scope', '$rootScope', '$dialogs', function($scope, $rootScope, $dialogs) {
        var dlg = null;
        $scope.newSubItem = function(parentItem) {
            console.log('Add new subitem');
            console.log(parentItem);
            dlg = $dialogs.create('/templates/dialog.html','dialogCtrl',parentItem,{key: false,back: 'static'});
            dlg.result.then(function(itemName){
                var newItem = { text: itemName, subItems: []};
                parentItem.subItems.push(newItem);
            },function(){
                console.log('No Input');
            });
        };

        $scope.editItem = function(item){
            console.log('EDIT ME!!');
            console.log(item);
            console.log(typeof(item));

            dlg = $dialogs.create('/templates/editDialog.html','editDialogCtrl',item,{key: false,back: 'static'});
            dlg.result.then(function(newItem){
                item.text = newItem.text
            },function(newItem){
                console.log('No Input');
            });
        };

        $scope.searchAndRemove = function(itemsArray, itemToRemove) {
            var i = itemsArray.indexOf(itemToRemove);
            if(i !== -1 ){
                itemsArray.splice(i, 1);
                return;
            } else {
                for(i = 0; i < itemsArray.length; i++){
                    if(itemsArray[i].subItems.length !== 0){
                        $scope.searchAndRemove(itemsArray[i].subItems, itemToRemove);
                    }
                }
            }
        };

        $scope.deleteItem = function(item){
            console.log('DELETE ME!!');

            dlg = $dialogs.confirm('Please Confirm','Delete Item? ' + item.text);
            dlg.result.then(function(){
                console.log('Fine then delete the item ');
                // TODO find a better way to remove the item if its in a subItems array.
                $scope.searchAndRemove($scope.items, item);
                
            },function(){
                console.log('Not deleting the item :P');
            });
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

    activityReporter.directive('autofocus', function() {
        return {
            restrict:'A',
            link : function (scope, element) {
                setTimeout(function() {
                    element[0].focus();
                }, 2);
                
            }
        };
    });


})();
