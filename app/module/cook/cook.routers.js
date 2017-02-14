'use strict';

var app = angular.module('com.module.cook', []);

app.config(["$stateProvider",  "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	 /*$urlRouterProvider.otherwise('/');*/

    $stateProvider
    .state('cooks', {
      url:'/cooks',
      templateUrl: 'module/cook/views/cook.html'
    });

}]);
