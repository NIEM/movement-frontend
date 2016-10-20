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

      /**
       * @name clearAllFilters
       *
       * @description Unselects all filters and adjusts displayed results accordingly
       */
      scope.clearAllFilters = function() {
        solrSearch.clearAllFilters();
      };

      /**
       * @name getImagePath
       *
       * @param entityType
       *
       * @returns {string} - location of image to display corresponding to entityType
       */
      scope.getImagePath = function(entityType) {
        return 'images/icon_' + entityType.substring(0,1).toLowerCase() + '.svg';
      };

      scope.popovers = {
        'core': {
          'popoverIsOpen': false,
          'popoverTemplateUrl': 'app/components/solrResults/corePopoverTemplate.html'
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

      /**
       * @name closePopover
       *
       * @param type
       *
       * @description Closes the popover related to the specified type
       */
      scope.closePopover = function(type) {
        scope.popovers[type].popoverIsOpen = false;
      };

      /**
       * @name closeOtherPopovers
       *
       * @description Opens the specifed popover tooltip and closes any other open tooltip
       *
       * @param type
       */
      scope.closeOtherPopovers = function(type) {
        angular.forEach(scope.popovers, function(value, key) {
          if(key !== type) {
            scope.popovers[key].popoverIsOpen = false;
          }
        });
      };

      /**
       * @name isFirstOfNamespace
       *
       * @param previousNamespace
       *
       * @param currentDoc
       *
       * @description
       *
       * @returns {boolean}
       */
      scope.isFirstOfNamespace = function(previousNamespace, currentDoc) {
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
       * @description
       *
       * @param previousName
       *
       * @param currentDoc
       *
       * @returns {boolean}
       */
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
