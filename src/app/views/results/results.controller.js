'use strict';

/**
 * @ngdoc controller
 * @memberof dhsniem
 * @name ResultsCtrl
 * @param {service} solrSearch A service that handles custom querying for the Solr API
 * @description Controller for the search and results page
 */
(function() {

  angular
    .module('dhsniem')
    .controller('ResultsCtrl', ResultsCtrl);

  function ResultsCtrl(solrSearch) {

    /**
     * @private
     * @description On page load, calls solr search
     */
    function init() {
      solrSearch.search();
    }

    init();
  }


})();
