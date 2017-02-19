'use strict';

var app = angular.module('com.module.cook');

app.service('MenuService', ["$http", "$q", function ($http, $q) {
    
    var menuURL = "http://localhost:8080/SpringRestSecurityOauth/cms/menu";

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

}]);
