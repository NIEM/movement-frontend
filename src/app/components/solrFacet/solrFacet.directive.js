'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name solrFacet
 * @param {service} $rootScope The root scope of the application
 * @param {service} solrSearch A service that handles custom querying for the Solr API
 * @description A Solr facet
 * @attr display The display value
 * @attr field The facet field
 * @attr results The facet field values (results)
 * @example
 *  Usage:
 *  <solr-facet display="Domain" field="domain"></solr-facet>
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
       * @memberof solrFacet
       * @param {String} result Name of the facet
       * @returns {(String|Number)} If Core, returns -1, else returns the name
       * @description Sorting function used to boost the NIEM Core facet to the top of the filter list
       */
      scope.sortByName = function(result) {
        if (result === 'Core') {
          return -1;
        } else {
          return result;
        }
      };


      /**
       * @private
       * @returns {String[]} An array of the facet results
       * @description Sets the scope results from the the solr request, including the facet fields and their counts. Then, converts that object to an array of the keys to be used for the view.
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
        'External Standards': 'External Standards are sources not encompassed by NIEM that provide consistent definitions for data reusability.',
        'Domain': 'Domains are Communities of interest (COI) that are formally established, with an executive steward, to officially manage and govern a portion of the NIEM model. The NIEM model includes community-specific elements, as well as core elements that are commonly agreed to by the communities who use NIEM.'
      };


      /**
       * @memberof solrFacet
       * @param {String} display The display name of the facet
       * @returns {String} Text to be displayed in the selected tooltip
       * @description Maps the popover text for a given facet
       */
      scope.getTooltipText = function(display) {
        return scope.tooltipText[display];
      };
    }
  }
})();
