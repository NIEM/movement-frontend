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

      scope.corePopoverIsOpen =  false;
      scope.namespacePopoverIsOpen =  false;
      scope.elementPopoverIsOpen = false;
      scope.typePopoverIsOpen = false;
      scope.corePopoverTemplateUrl = 'app/components/solrResults/corePopoverTemplate.html'
      scope.namespacePopoverTemplateUrl = 'app/components/solrResults/namespacePopoverTemplate.html';
      scope.elementPopoverTemplateUrl = 'app/components/solrResults/elementPopoverTemplate.html';
      scope.typePopoverTemplateUrl = 'app/components/solrResults/typePopoverTemplate.html';

      scope.closePopover = function(type) {
        if(type === 'namespace') {
          scope.namespacePopoverIsOpen = false;
        } else if (type === 'core') {
          scope.corePopoverIsOpen = false;
        } else if (type === 'type') {
          scope.typePopoverIsOpen = false;
        }
        else if( type === 'element') {
          scope.elementPopoverIsOpen = false;
        }
      };

      scope.tooltipText = {
        'Entities': 'A physical thing, document, abstract concept, number, or string',
        'External Standards': 'Unmodified schema sources on the internet not encompassed by NIEM',
        'Domain': 'Communities of interest (COI) that are formally established, with an executive steward, to officially manage and govern a portion of the NIEM data model'
      };

      scope.isFirstOfNamespace = function(previousNamespace, currentDoc) {
        if (solrSearch.getSort() === 'namespacePriority asc') {
          if (currentDoc.namespace !== previousNamespace) {
            currentDoc.namespaceCount = scope.facetFields[currentDoc.namespaceType][currentDoc.namespace];
            return true;
          }
        }

        return false;
      };

    }

  }

})();
