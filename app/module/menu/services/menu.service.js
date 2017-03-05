'use strict';

var app = angular.module('com.module.menu');

app.service('MenuService', ["$http", "$q", function ($http, $q) {
    
    //var menuURL = "http://localhost:8080/SpringRestSecurityOauth/cms/menu";

    var menuURL = "http://countryfood.cfapps.io/cms/menu";

    this.getMenuUnit = function () {
        return $http.get(menuURL + '/getMenuUnit');
    };

    this.addMenu = function (menu) {
        return $http.post(menuURL + '/add',menu);
    };


    this.uploadFileWithMenu = function(file, menuId){
        var fd = new FormData();
        fd.append('file', file);
        fd.append("menuid", menuId);
        $http.post(menuURL+ '/fileupload', fd,{
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
 

    this.getMenuList = function (pageno,cookId,catagoryId) {
        return $http.get(menuURL + '/menuList?pageno='+pageno+'&cookId='+cookId+'&catagoryId='+catagoryId);
    };

    this.updateMenu = function (menu) {
        return $http.post(menuURL + '/edit',menu);
    };

     this.delete = function (id) {
        return $http.post(menuURL + '/delete?id='+id);
    };

}]);
