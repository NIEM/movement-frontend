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

      function init() {
        scope.docs = solrSearch.getDocs();
        scope.numFound = solrSearch.getNumFound();
        scope.query = solrSearch.getQuery();
        scope.totalPages = Math.ceil( scope.numFound / 100);
        scope.sort = solrSearch.getSort();
      }

      init();

      $rootScope.$on('newSearch', function() {
        init();
      });

      scope.clearAllFilters = function() {
        solrSearch.clearAllFilters();
      };

      scope.getImagePath = function(entityType) {
        return 'images/icon_' + entityType.substring(0,1).toLowerCase() + '.svg';
      };

      scope.popovers = {
        'core': {
          'popoverIsOpen': false,
          'popoverTemplateUrl': 'app/components/solrResults/corePopoverTemplate.html'
        },
        'namespace': {
          'popoverIsOpen': false,
          'popoverTemplateUrl': 'app/components/solrResults/namespacePopoverTemplate.html'
        },
        'element': {
          'popoverIsOpen': false,
          'popoverTemplateUrl': 'app/components/solrResults/elementPopoverTemplate.html'
        },
        'type': {
          'popoverIsOpen': false,
          'popoverTemplateUrl': 'app/components/solrResults/typePopoverTemplate.html'
        }
      };

      scope.closePopover = function(type) {
        scope.popovers[type].popoverIsOpen = false;
      };

      scope.tooltipText = {
        'Entities': 'A physical thing, document, abstract concept, number, or string',
        'External Standards': 'Unmodified schema sources on the internet not encompassed by NIEM',
        'Domain': 'Communities of interest (COI) that are formally established, with an executive steward, to officially manage and govern a portion of the NIEM data model'
      };

      scope.isFirstOfNamespace = function(previousNamespace, currentDoc) {
        if (scope.sort === 'namespacePriority asc') {
          if (currentDoc.namespace !== previousNamespace) {
            currentDoc.namespaceCount = solrSearch.getFacet(currentDoc.namespaceType)[currentDoc.namespace];
            return true;
          }
        }
        return false;
      };

      scope.isFirstOfAlphabet = function(previousName, currentDoc) {
        if (scope.sort === 'name asc') {
          if (currentDoc.name.substring(0,1).toUpperCase() !== previousName.substring(0,1).toUpperCase()) {
            return true;
          }
        }
        return false;
      };

    }
  }
})();
