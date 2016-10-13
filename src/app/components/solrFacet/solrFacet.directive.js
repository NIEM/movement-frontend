'use strict';

/**
 * @ngdoc directive
 *
 * @name solrFacet
 *
 * @description
 * A Solr facet
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrFacet', solrFacet);

  function solrFacet(solrSearch, $rootScope) {
    return {
      restrict: 'E',
      scope: {
        display: '@',
        field: '@',
        results:'&',
      },
      templateUrl: 'app/components/solrFacet/solrFacet.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solrFacet scope
     */
    function link(scope, element, attrs) {

      function setResults() {
        // solrSearch.setFacetResult(scope.field, solrSearch.getFacetFields()[scope.field]);
        // scope.results = solrSearch.getFacets()[scope.field].results;
        scope.results = solrSearch.getFacetFields()[scope.field];
      }

      setResults();

      $rootScope.$on('newSearch', function() {
        setResults();
      });

    }

  }

})();
