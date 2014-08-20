'use strict';
(function(undefined) {

    var activityReporter = angular.module('ActivityReporter', [
        'ar:env', 'xeditable', 'ui.bootstrap', 'dialogs.main','dialogs.default-translations'
    ]);

    activityReporter.run(function(editableOptions) {
        editableOptions.theme = 'bs3';
    });

    activityReporter.controller('mainCtrl', ['$scope', 'env:buildName', 'env:buildVersion', '$dialogs', function($scope, envBuildName, envBuildVersion, $dialogs) {
        $scope.buildName = envBuildName;
        $scope.buildVersion = envBuildVersion;
        var dlg = null;

        $scope.items = [{text:'Top Item', subItems:[{text:'I am a item', subItems:[]}, {text:'I am also a item', subItems:[]}]},{text:'Second Item', subItems:[]}];

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
            $scope.parentItem = {text: 'Create New Item'}
        } else {
            $scope.parentItem = data;
        }
        

        $scope.cancel = function(){
            $modalInstance.dismiss('canceled');
        }; // end cancel
  
        $scope.save = function(){
            $modalInstance.close($scope.item.text);
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
})();
