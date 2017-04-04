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

      scope.tooltipText = {
        'External Standards': 'Unmodified schema sources on the internet not encompassed by NIEM',
        'Domain': 'Communities of interest (COI) that are formally established, with an executive steward, to officially manage and govern a portion of the NIEM data model'
      };


      /**
       * @name getTooltipText
       *
       * @description Maps the popover text for a given facet
       *
       * @param display - The display name of the facet
       *
       * @returns {string} Text to be displayed in the selected tooltip
       */
      scope.getTooltipText = function(display) {
        return scope.tooltipText[display];
      };
    }
  }
})();
