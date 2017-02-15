'use strict';

angular.module('com.module.cook')
    .controller('CookCtrl', CookCtrl);

CookCtrl.$inject = ["$scope", "CookService", "CoreService"];

function CookCtrl($scope, CookService, CoreService) {
  var cook = this;
  cook.info =  {};
  cook.info.name = "";
  cook.info.description = "";
  cook.info.gender = "";
  cook.info.mobileNo = "";
  cook.info.address = "";
  cook.info.specility = "";


  cook.cookList = {};



  cook.add = function () {
        CookService.add(cook.info).success(function (data, status, headers) {
         /*   $scope.get($scope.currentpage);*/
            toastr.success("Cook successfully added.", '', {timeOut: 5000});
           /* $scope.clear();*/
        }).error(function (error) {
                console.log("user:" + error.message);
            });
          //  console.info(cook.info);
    };

}