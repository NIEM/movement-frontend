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

  function solrResults(solrSearch, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrResults/solrResults.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link(scope, element, attrs, ctrl) {

      $rootScope.$on('newSearch', function() {
        for (var key in solrSearch.getFacets()){
          solrSearch.setFacetResult(key, solrSearch.getFacetFields()[key]);
        }
        scope.docs = solrSearch.getDocs();
        scope.numFound = solrSearch.getNumFound();
        scope.query = solrSearch.getQuery();
        scope.facetFields = solrSearch.getFacetFields();
      });

      scope.clearAllFilters = function() {
        solrSearch.clearAllFilters();
      };

      scope.getImagePath = function(entityType) {
        return 'images/icon_' + entityType.substring(0,1) + '.svg';
      };

      scope.isFirstOfNamespace = function(previousNamespace, currentDoc) {
        if (solrSearch.getSort() === 'namespace asc') {
          if (currentDoc.namespace !== previousNamespace) {
            scope.NamespaceCount = scope.facetFields[currentDoc.namespaceType][currentDoc.namespace];
            console.log(scope.NamespaceCount);
            return true;
          }
        }
        
        return false;
      };

    }

  }

})();