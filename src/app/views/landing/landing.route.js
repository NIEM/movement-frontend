'use strict';

(function() {

  angular
    .module('dhsniem')
    .config(function($stateProvider) {
      $stateProvider
        .state('landing', {
          url: '/landing',
          templateUrl: 'app/views/landing/landing.view.html',
          controller: 'LandingCtrl',
          controllerAs: 'LandingCtrl',
          title: 'landing'
        });
    });

}());
