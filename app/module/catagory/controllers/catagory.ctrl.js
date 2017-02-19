'use strict';

angular.module('com.module.catagory')
    .controller('CatagoryCtrl', CatagoryCtrl);

CatagoryCtrl.$inject = ["$scope", "CatagoryService", "CoreService"];

function CatagoryCtrl($scope, CatagoryService, CoreService) {
  var catagory = this;
  catagory.info =  {};
  catagory.info.name = "";
  catagory.info.description = "";

  catagory.catagoryList = {};

  catagory.editInfo =  {};

  catagory.currentpage = 1;

  catagory.get = get;
  catagory.add = add;
  catagory.clear = clear;
  catagory.edit = edit;
  catagory.getEditcatagory = getEditcatagory;
  catagory.SearchTag = SearchTag;
  catagory.deletecatagory = deletecatagory;
  
  catagory.get(catagory.currentpage);

  function add() {
        CatagoryService.add(catagory.info).success(function (data, status, headers) {
            toastr.success("catagory successfully added.", '', {timeOut: 5000});
            catagory.get(catagory.currentpage);
            catagory.clear();
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };


   function get(pageno) {
        $scope.paggination = [];
        CatagoryService.getCatagoryList(pageno).success(function (data, status, headers) {

            catagory.catagoryList = data.cmsCatagoryBeanList;
            $scope.paggination = data.count;
            
         if(catagory.catagoryList.length >= 1){
            $('#pagination-demo').twbsPagination({
                totalPages: $scope.paggination,
                visiblePages: $scope.paggination,
                onPageClick: function (event, page) {
                    catagory.get(page);
                    catagory.currentpage = page;
                }
            });
           } 

        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };

    function edit () {
        CatagoryService.edit(catagory.editInfo).success(function (data, status, headers) {
            catagory.get(catagory.currentpage);
            toastr.success("User successfully updated.", '', {timeOut: 5000});
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };


   function deletecatagory(id) {

        CoreService.confirmation('Are you sure?', 'Delete cannot be undone.', function () {
            CatagoryService.delete(id).success(function (data, status, headers) {
                catagory.get(catagory.currentpage);
                toastr.success("User successfully deleted.", '', {timeOut: 5000});
            }).error(function (error) {
                    console.log("user:" + error.message);
                });
        }, function () {
            return false;
        });
    };



  function getEditcatagory(id) {
        var obj = angular.copy(catagory.SearchTag(id));
        catagory.editInfo = obj;
    };

  function SearchTag(id) {
        var i = null;
        var catagorys =   catagory.catagoryList;

        for (i = 0; catagorys.length > i; i += 1) {
            if (catagorys[i].id === id) {
                return catagorys[i];
            }
        }

        return null;
    };


 function clear() {
      catagory.info =  {};
      catagory.info.name = "";
      catagory.info.description = "";
    };
}