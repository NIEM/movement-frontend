'use strict';

(function() {

  angular
    .module('dhsniem')
    .config(function($stateProvider) {
      $stateProvider
        .state('main.', {
          url: '/details',
          templateUrl: 'app/views/details/details.view.html',
          controller: 'DetailsCtrl',
          controllerAs: 'DetailsCtrl',
          title: 'details'
        });
    });

}());
