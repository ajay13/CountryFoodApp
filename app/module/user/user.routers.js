'use strict';

var app = angular.module('com.module.user', []);

app.config(["$stateProvider",  "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	 $urlRouterProvider.otherwise('/');

/*module/user/views/user.html*/
    $stateProvider
    .state('login', {
      url:'/',
      templateUrl: 'login.html'
    })
    .state('home', {
      url:'/home',
      templateUrl: 'home.html'
    });

}]);
