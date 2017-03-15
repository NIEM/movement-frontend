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
    function link(scope) {

      /**
       * @name sortByName
       *
       * @description Sorting function used to boost the NIEM Core facet to the top of the filter list
       *
       * @returns {(string|number)}
       */
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
       * @description Sets the scope results from the the solr request, including the facet fields and their counts. Then, converts that object to an array of the keys to be used for the view.
       *
       * @returns {string[]}
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
       * @returns {string} the text that should be displayed in the selected tooltip
       */
      scope.getTooltipText = function(display) {
        return scope.tooltipText[display];
      };
    }
  }
})();
