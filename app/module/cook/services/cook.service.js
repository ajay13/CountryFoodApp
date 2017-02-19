'use strict';

var app = angular.module('com.module.cook');

app.service('CookService', ["$http", "$q", function ($http, $q) {
    
    var cookURL = "http://localhost:8080/SpringRestSecurityOauth/cms/cooks";

    this.add = function (cook) {
        return $http.post(cookURL + '/add',cook);
    };

   this.getCookList = function (pageno) {
        return $http.get(cookURL + '/cooklist?pageno='+pageno);
    };

   this.edit = function (cook) {
        return $http.post(cookURL + '/edit',cook);
    };

    this.delete = function (id) {
        return $http.post(cookURL + '/delete?id='+id);
    };

   this.get = function (typed) {
        return $http.get(cookURL + '/cook?cookname='+typed);
    };
}]);
