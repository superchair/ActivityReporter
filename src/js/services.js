(function(undefined){
    var services = angular.module('DBServices', []);

    services.provider('DB:getRootRecords', [ function() {
        return {
            $get : ['$http', '$q', function($http, $q) {
                return function() {
                    var deffered = $q.defer();
                    $http(
                        {
                            method: 'GET', 
                            url: 'http://10.132.7.50:8080/rest/db/activityreporter?filter=parentId=0',
                            headers:{
                                'X-Dreamfactory-Application-Name' : 'ActivityReporter'
                            }
                        }
                        ).
                        success(function(data, status, headers, config) {
                            // this callback will be called asynchronously
                            // when the response is available
                            deffered.resolve(data.record);
                        }).
                        error(function(data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            debugger
                            deffered.reject();
                        });
                    return deffered.promise;
                    //return [{text:'Top Item', subItems:[{text:'I am a item', subItems:[]}, {text:'I am also a item', subItems:[]}]},{text:'Second Item', subItems:[]}];
                };
            }] 
        };
    }]);

    services.provider('DB:getRecordsByParentId', [ function() {
        return {
            $get : ['$http', '$q', function($http, $q) {
                return function(id) {
                    var deffered = $q.defer();
                    $http(
                        {
                            method: 'GET', 
                            url: 'http://10.132.7.50:8080/rest/db/activityreporter?filter=parentId=' + id,
                            headers:{
                                'X-Dreamfactory-Application-Name' : 'ActivityReporter'
                            }
                        }
                        ).
                        success(function(data, status, headers, config) {
                            // this callback will be called asynchronously
                            // when the response is available
                            deffered.resolve(data.record);
                        }).
                        error(function(data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            debugger
                            deffered.reject();
                        });
                    return deffered.promise;
                    //return [{text:'Top Item', subItems:[{text:'I am a item', subItems:[]}, {text:'I am also a item', subItems:[]}]},{text:'Second Item', subItems:[]}];
                };
            }] 
        };
    }]);
})();