'use strict';

/**
 * @ngdoc controller
 *
 * @name ResultsCtrl
 *
 * @description
 * Controller for dhsniem
 */
(function() {

  angular
    .module('dhsniem')
    .controller('ResultsCtrl', ResultsCtrl);

  function ResultsCtrl($scope, solrSearch) {

    var vm = this;

    function init() {
      solrSearch.setFacetFields();
      solrSearch.search();
    }

    $scope.$on('$viewContentLoaded', function(){
      init();
      //Here your view content is fully loaded !!
    });

  }


})();
