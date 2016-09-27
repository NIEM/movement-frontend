'use strict';

(function() {

  angular
    .module('dhsniem')
    .config(function($stateProvider) {
      $stateProvider
        .state('results', {
          url: '/results',
          templateUrl: 'app/views/results/results.view.html',
          controller: 'ResultsCtrl',
          controllerAs: 'ResultsCtrl',
          title: 'results'
        });
    });

}());
