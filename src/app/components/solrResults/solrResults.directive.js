'use strict';

/**
 * @ngdoc directive
 *
 * @name solrResults
 *
 * @description
 * Solr results
 */
(function () {

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
    function link(scope) {

      /**
       * @name init
       *
       * @description Initializes the view to set scope variables on page load and whenever a new search is triggered.
       */
      function init() {
        scope.docs = solrSearch.getDocs();
        scope.numFound = solrSearch.getNumFound();
        scope.query = solrSearch.getQuery();
        scope.totalPages = Math.ceil(scope.numFound / 100);
        scope.sort = solrSearch.getSort();
        scope.namespaceTypes = {
          'domain': 'Domain',
          'externalStandard': 'External Standard',
          'otherNamespace': 'Other Namespace'
        };
        scope.popovers = {
          'core': {
            'popoverIsOpen': false,
            'popoverTemplateUrl': 'app/components/solrResults/corePopoverTemplate.html'
          }
        };
      }

      init();

      $rootScope.$on('newSearch', function () {
        init();
      });

      /**
       * @name clearAllFilters
       *
       * @description Unselects all filters and adjusts displayed results accordingly
       */
      scope.clearAllFilters = function () {
        solrSearch.clearAllFilters();
      };


      /**
       * @name closePopover
       *
       * @param type
       *
       * @description Closes the popover related to the specified type
       */
      scope.closePopover = function (type) {
        scope.popovers[type].popoverIsOpen = false;
      };


      /**
       * @name isFirstOfNamespace
       *
       * @param previousNamespace - the previous row's (doucment's) namespace
       *
       * @param currentDoc - the current row (document)
       *
       * @description Determines if a listed row (document) is the first instance of its namespace in order. Used for grouping when the results are sorted by namespace.
       *
       * @returns {boolean}
       */
      scope.isFirstOfNamespace = function (previousNamespace, currentDoc) {
        if (scope.sort === 'namespacePriority asc') {
          if (currentDoc.namespace !== previousNamespace) {
            currentDoc.namespaceCount = solrSearch.getFacet(currentDoc.namespaceType)[currentDoc.namespace];
            return true;
          }
        }
        return false;
      };


      /**
       * @name isFirstOfAlphabet
       *
       * @description Determines if a listed row (document) is the first instance of its starting letter. Used for grouping when the results are sorted by name (alphabetically).
       *
       * @param previousName - the previous row's (doucment's) name
       *
       * @param currentName - the current row's (document's) name
       *
       * @param index - the current row's (document's) index
       *
       * @returns {boolean}
       */
      scope.isFirstOfAlphabet = function (previousName, currentName, index) {
        return scope.sort === 'name asc' && (index < 1 || currentName.substring(0, 1).toUpperCase() !== previousName.substring(0, 1).toUpperCase());
      };

    }
  }
})();
