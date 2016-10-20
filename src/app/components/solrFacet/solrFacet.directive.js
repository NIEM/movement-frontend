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

      scope.sortByName = function(result) {
        if (result === 'Core') {
          return -1;
        } else {
          return result;
        }
      };

      /**
       * @name setFacetResults
       *
       * @description
       *
       * @returns
       */
      function setFacetResults() {
        scope.results = solrSearch.getFacet(scope.field);
        scope.keys = function(results) {
          return results ? Object.keys(results) : [];
        };
      }

      setFacetResults();

      $rootScope.$on('newSearch', function() {
        setFacetResults();
      });

      scope.popoverIsOpen =  false;
      scope.popoverTemplateUrl = 'app/components/solrFacet/custom-popover-template.html';

      /**
       * @name closePopover
       *
       * @description Closes the selected tooltip popver in the filter column
       */
      scope.closePopover = function() {
        scope.popoverIsOpen = false;
      };

      scope.tooltipText = {
        'Entities': 'A physical thing, document, abstract concept, number, or string',
        'External Standards': 'Unmodified schema sources on the internet not encompassed by NIEM',
        'Domain': 'Communities of interest (COI) that are formally established, with an executive steward, to officially manage and govern a portion of the NIEM data model'
      };

      /**
       * @name getTooltipText
       * @param display
       * @returns {String} the text that should be displayed in the selected tooltip
       */
      scope.getTooltipText = function(display) {
        return scope.tooltipText[display];
      };
    }
  }
})();
