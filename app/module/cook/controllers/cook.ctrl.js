'use strict';

angular.module('com.module.cook')
    .controller('CookCtrl', CookCtrl);

CookCtrl.$inject = ["$scope", "CookService", "CoreService", "$rootScope"];

function CookCtrl($scope, CookService, CoreService,$rootScope) {

  var cook = this;
  cook.info =  {};
  cook.info.name = "";
  cook.info.description = "";
  cook.info.gender = "";
  cook.info.mobileno = "";
  cook.info.address = "";
  cook.info.specility = "";

  cook.cookList = [];

  cook.editInfo =  {};

  cook.currentpage = 1;

  cook.get = get;
  cook.add = add;
  cook.clear = clear;
  cook.edit = edit;
  cook.getEditCook = getEditCook;
  cook.SearchTag = SearchTag;
  cook.deleteCook = deleteCook;
  
  cook.get(cook.currentpage);

  function add() {
        CookService.add(cook.info).success(function (data, status, headers) {
            toastr.success("Cook successfully added.", '', {timeOut: 5000});
            cook.get(cook.currentpage);
            cook.clear();
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };


   function get(pageno) {
        $scope.paggination = [];
        CookService.getCookList(pageno).success(function (data, status, headers) {

            cook.cookList = data.cmsCooksBeanList;
            $scope.paggination = data.count;

            console.log(cook.cookList);   
            if(cook.cookList.length >= 1){
              $('#pagination-demo').twbsPagination({
                totalPages: $scope.paggination,
                visiblePages: $scope.paggination,
                onPageClick: function (event, page) {
                    cook.get(page);
                    cook.currentpage = page;
                }
            });
            }

        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };

    function edit () {
        CookService.edit(cook.editInfo).success(function (data, status, headers) {
            cook.get(cook.currentpage);
            toastr.success("User successfully updated.", '', {timeOut: 5000});
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };


   function deleteCook(id) {

        CoreService.confirmation('Are you sure?', 'Delete cannot be undone.', function () {
            CookService.delete(id).success(function (data, status, headers) {
                cook.get(cook.currentpage);
                toastr.success("User successfully deleted.", '', {timeOut: 5000});
            }).error(function (error) {
                    console.log("user:" + error.message);
                });
        }, function () {
            return false;
        });
    };



  function getEditCook(id) {
        var obj = angular.copy(cook.SearchTag(id));
        cook.editInfo = obj;
    };

  function SearchTag(id) {
        var i = null;
        var cooks =   cook.cookList;

        for (i = 0; cooks.length > i; i += 1) {
            if (cooks[i].id === id) {
                return cooks[i];
            }
        }

        return null;
    };


 function clear() {
      cook.info =  {};
      cook.info.name = "";
      cook.info.description = "";
      cook.info.gender = "";
      cook.info.mobileno = "";
      cook.info.address = "";
      cook.info.specility = "";
    };
}