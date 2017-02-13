'use strict';

angular.module('com.module.user')
    .controller('UserCtrl', UserCtrl);

UserCtrl.$inject = ["$scope", "UserService", "CoreService"];

function UserCtrl($scope, UserService, CoreService) {
    $scope.object = {};
    $scope.object.firstName = '';
    $scope.object.lastName = '';
    $scope.object.phoneno = '';
    $scope.object.emailid = '';
    $scope.object.address = '';
    $scope.object.sex = '';

    $scope.userlist = {};
    $scope.paggination = 1;
    $scope.currentpage = 1;

    $scope.edituser = {};

    $scope.add = function () {
        UserService.add($scope.object).success(function (data, status, headers) {
            $scope.get($scope.currentpage);
            toastr.success("User successfully added.", '', {timeOut: 5000});
            $scope.clear();
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };

    $scope.edit = function () {
        UserService.edit($scope.edituser).success(function (data, status, headers) {
            $scope.get($scope.currentpage);
            toastr.success("User successfully updated.", '', {timeOut: 5000});
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };

    $scope.get = function (pageno) {
        $scope.paggination = [];
        UserService.get(pageno).success(function (data, status, headers) {
            $scope.userlist = data.userDetailBeanList;
            $scope.paggination = data.count;

            $('#pagination-demo').twbsPagination({
                totalPages: $scope.paggination,
                visiblePages: $scope.paggination,
                onPageClick: function (event, page) {
                    $scope.get(page);
                    $scope.currentpage = page;
                }
            });
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };

    $scope.delete = function (id) {

        CoreService.confirmation('Are you sure?', 'Delete cannot be undone.', function () {
            UserService.delete(id).success(function (data, status, headers) {
                $scope.get($scope.currentpage);
                toastr.success("User successfully deleted.", '', {timeOut: 5000});
            }).error(function (error) {
                    console.log("user:" + error.message);
                });
        }, function () {
            return false;
        });
    };


    $scope.getEditUser = function (id) {
        var obj = angular.copy($scope.SearchTag(id));
        $scope.edituser = obj;
    };

    $scope.SearchTag = function (id) {
        var i = null;
        var users = $scope.userlist;

        for (i = 0; users.length > i; i += 1) {
            if (users[i].id === id) {
                return users[i];
            }
        }

        return null;
    };

    $scope.clear = function () {
        $scope.object = {};
        $scope.object.firstName = '';
        $scope.object.lastName = '';
        $scope.object.phoneno = '';
        $scope.object.emailid = '';
        $scope.object.address = '';
        $scope.object.sex = '';
    };


    $scope.get(1);

}