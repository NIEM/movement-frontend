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

  function ResultsCtrl(solrSearch) {

    /**
     * @name init
     *
     * @description On page load, calls solr search
     */
    function init() {
      solrSearch.search();
    }

    init();

  }


})();
