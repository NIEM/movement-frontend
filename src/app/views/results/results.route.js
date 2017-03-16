'use strict';

(function() {

  angular
    .module('dhsniem')
    .config(function($stateProvider) {
      $stateProvider
        .state('main.results', {
          url: '/results?q&selectedFacets',
          templateUrl: 'app/views/results/results.view.html',
          controller  : 'ResultsCtrl',
          controllerAs: 'ResultsCtrl',
          reloadOnSearch: false
        });
    });

}());
