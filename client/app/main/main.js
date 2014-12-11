'use strict';

angular.module('gaheenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });

angular.module('app', ['ui.bootstrap']);
function CarouselDemoCtrl($scope){
  $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: '/assets/images/placeholder-1.jpg'
    },
    {
      image: '/assets/images/placeholder-2.jpg'
    },
    {
      image: '/assets/images/placeholder-3.jpg'
    }    
  ];
}