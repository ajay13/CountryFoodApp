'use strict';

var app = angular.module('com.module.cook');

app.service('CookService', ["$http", "$q", function ($http, $q) {

    //var userURL = 'rest/user';
    var userURL = 'https://countryfood.cfapps.io/cms/cooks/';
    
    this.add = function (cook) {
        return $http.post(userURL + '/add',cook);
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
