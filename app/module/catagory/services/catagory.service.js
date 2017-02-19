'use strict';

var app = angular.module('com.module.catagory');

app.service('CatagoryService', ["$http", "$q", function ($http, $q) {

    var catagoryURL = "http://localhost:8080/SpringRestSecurityOauth/cms/menucatagory";

    this.add = function (catagory) {
        return $http.post(catagoryURL + '/add',catagory);
    };

   this.getCatagoryList = function (pageno) {
        return $http.get(catagoryURL + '/catagorylist?pageno='+pageno);
    };

   this.edit = function (catagory) {
        return $http.post(catagoryURL + '/edit',catagory);
    };

    this.delete = function (id) {
        return $http.post(catagoryURL + '/delete?id='+id);
    };

    this.get = function (typed) {
        return $http.get(catagoryURL + '/catagory?catagoryname='+typed);
    };
    
}]);
