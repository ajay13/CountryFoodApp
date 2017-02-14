'use strict';

var app = angular.module('com.module.user', []);

app.config(["$stateProvider",  "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	 $urlRouterProvider.otherwise('/');

   /* $stateProvider
    .state('cook', {
      url:'/',
      templateUrl: 'module/cook/views/cook.html'
    })*/
    /*.state('home', {
      url:'/home',
      templateUrl: 'home.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })*/;

}]);
