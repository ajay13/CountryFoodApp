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

  cook.currentpage = 1;


  cook.get = get;
  cook.add = add;

  
  cook.get(cook.currentpage);

  function add() {
        CookService.add(cook.info).success(function (data, status, headers) {
            toastr.success("Cook successfully added.", '', {timeOut: 5000});
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };


   function get(pageno) {
        $scope.paggination = [];
        CookService.get(pageno).success(function (data, status, headers) {

            console.log(data);

            cook.cookList = data.cmsCooksBeanList;
            $scope.paggination = data.count;

            $('#pagination-demo').twbsPagination({
                totalPages: $scope.paggination,
                visiblePages: $scope.paggination,
                onPageClick: function (event, page) {
                    cook.get(page);
                    cook.currentpage = page;
                }
            });
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };

}