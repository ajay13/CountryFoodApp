'use strict';

var app = angular.module('com.module.menu');

app.service('MenuService',["$http", "$q", function ($http, $q) {

    //var userURL = 'rest/user';
    var userURL = 'https://countryfood.cfapps.io/cms/cooks';
    
    this.add = function (cook) {
        return $http.post(userURL + '/add',cook);
    };

    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    };

    /* this.get = function () {
        return $http.get(userURL + '/userlist?pageno=');
    };

     this.edit = function (user) {
        return $http.post(userURL + '/edit',user);
    };

      this.delete = function (id) {
        return $http.post(userURL + '/delete?id='+id);
    };*/

}]);
