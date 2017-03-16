'use strict';

var app = angular.module('com.module.cook');

app.service('CookService', ["$http", "$q", function ($http, $q) {
    
    var cookURL = "http://localhost:8080/SpringRestSecurityOauth/cms/cooks";

    var otherUrl = "http://localhost:8080/SpringRestSecurityOauth/cms/other";

   // var cookURL = "http://countryfood.cfapps.io/cms/cooks";

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

    this.getCast = function () {
        return $http.get(otherUrl + '/getCast');
    };

    this.uploadFileWithMenu = function(file, cookId){
        var fd = new FormData();
        fd.append('file', file);
        fd.append("cookId", cookId);
        $http.post(cookURL+ '/fileupload', fd,{
          withCredentials : false,
          headers : {
          'Content-Type' : undefined
          },
          transformRequest : angular.identity
         })
        .success(function(){
        })
        .error(function(){
        });
    };

     this.getAllSpeciality = function () {
        return $http.get(cookURL + '/getCooksSpeciality');
    };



}]);
