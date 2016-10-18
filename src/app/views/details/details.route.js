'use strict';

(function() {

  angular
    .module('dhsniem')
    .config(function($stateProvider) {
      $stateProvider
        .state('main.details', {
          url: '/details?entityID',
          templateUrl: 'app/views/details/details.view.html',
          controller: 'DetailsCtrl',
          controllerAs: 'DetailsCtrl'
        });
    });

}());
