'use strict';

/**
 * @ngdoc directive
 *
 * @name solrResults
 *
 * @description
 * Solr results
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrResults', solrResults);

  function solrResults() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrResults/solrResults.directive.html',
      controller: SolrResultsCtrl,
      controllerAs: 'SolrResultsCtrl',
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link(scope, element, attrs, ctrl) { }

  }

  function SolrResultsCtrl(solrSearch, $rootScope) {
    var vm = this;

    $rootScope.$on('newSearch', function() {
      vm.docs = solrSearch.getDocs();
      vm.numFound = solrSearch.getNumFound();
      vm.query = solrSearch.getQuery();
    });

    vm.getImagePath = function(entityType) {
      return 'images/icon_' + entityType.substring(0,1) + '.svg';
    };


  }

})();