'use strict';

angular.module('com.module.menu')
    .controller('MenuCtrl', MenuCtrl);

MenuCtrl.$inject = ["$scope", "CookService", "CatagoryService", "MenuService","CoreService"];

function MenuCtrl($scope, CookService, CatagoryService,MenuService,CoreService,fileUpload) {


var menu = this;
menu.cookInfo =  [];
menu.catagoryInfo = [];
menu.selectedCookId = "";
menu.selectedCatagoryId = "";

menu.searchCook = searchCook;
menu.cookSelect = cookSelect;

menu.searchCatagory = searchCatagory;
menu.catagorySelect = catagorySelect;
menu.getMenu = getMenu;
menu.add = add;
menu.editMenu = editMenu;

menu.searchOption = {};
menu.searchOption.cookId = "";
menu.searchOption.catagoryId = "";

menu.editedMenu = {};

menu.addMenu = {};
menu.addMenu.cooksId = "";
menu.addMenu.menuCatagoryId = "";
menu.addMenu.itemName = "";
menu.addMenu.description = "";
menu.addMenu.price = "";

menu.menuList = [];

menu.currentpage = 1;


function cookSelect(cook){
  menu.selectedCookId = cook.id;
}

function searchCook(typed) {
  CookService.get(typed).success(function (data, status, headers) {
            menu.cookInfo =  data;
        }).error(function (error) {
                console.log("user:" + error.message);
            });
}

function catagorySelect(catagory){
  menu.selectedCatagoryId = catagory.id;
}

function searchCatagory(typed) {
  CatagoryService.get(typed).success(function (data, status, headers) {
            menu.catagoryInfo = data;
        }).error(function (error) {
                console.log("user:" + error.message);
            });
}

function getMenu(){
  $scope.paggination = [];
   MenuService.getMenuList(1,menu.selectedCookId, menu.selectedCatagoryId).success(function (data, status, headers) {

            menu.menuList  = data.cmsMenuBeanList;
            $scope.paggination = data.count;

           $scope.paggination = data.count;
            
         if(menu.menuList.length >= 1){
            $('#pagination-demo').twbsPagination({
                totalPages: $scope.paggination,
                visiblePages: $scope.paggination,
                onPageClick: function (event, page) {
                    menu.getMenu(page,menu.selectedCookId, menu.selectedCatagoryId);
                    menu.currentpage = page;
                }
            });
           } 

        }).error(function (error) {
                console.log("user:" + error.message);
            });
}

 function add() {

     menu.addMenu.cooksId = menu.selectedCookId;
     menu.addMenu.menuCatagoryId = menu.selectedCatagoryId;

        var file = $scope.myFile;
        MenuService.addMenu(menu.addMenu).success(function (data, status, headers) {
            toastr.success("Menu successfully added.", '', {timeOut: 5000});
            MenuService.uploadFileWithMenu(file,data);
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };


    function editMenu(menu){
        var obj = angular.copy(menu);
        menu.editedMenu = obj;
        console.info(menu.editedMenu);
    }

}