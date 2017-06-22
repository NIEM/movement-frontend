'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name solrFacetResult
 * @param {service} $location The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application
 * @param {service} $rootScope The root scope of the application
 * @param {service} solrSearch A service that handles custom querying for the Solr API
 * @description The specific facet result returned from Solr
 * @attr field The facet field
 * @attr key A facet field value
 * @attr count Total count for a facet field value
 * @example
 *  Usage:
 *  <solr-facet-result field="field" key="key" count="count"></solr-facet-result>
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrFacetResult', solrFacetResult);

  function solrFacetResult($location, solrSearch, $rootScope) {
    return {
      restrict: 'E',
      scope: {
        field: '@',
        key: '@',
        count: '@',
      },
      templateUrl: 'app/components/solrFacetResult/solrFacetResult.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solrFacetResult scope
     */
    function link(scope) {

      /**
       * @memberof solrFacetResult
       * @returns {String} The key value string of the facet
       * @description Gets string value of result
       */
      scope.facetString = function() {
        return scope.field + ':"' + scope.key + '"';
      };


      /**
       * @memberof solrFacetResult
       * @returns {boolean}
       * @description Determines if a given facet field (value) is selected by examining the $location.
       */
      scope.isSelected = function() {
        var selectedFacets = solrSearch.getSelectedFacets();
        var facetString = scope.facetString();
        for (var i in selectedFacets) {
          if (selectedFacets[i] === facetString) {
            return true;
          }
        }
        return false;
      };


      /**
       * @memberof solrFacetResult
       * @description Adds or removes a facet from the $location service, calls a new search based on updated selected facets, and resets page number to 1.
       */
      scope.addRemoveFacet = function() {
        var selectedFacets = solrSearch.getSelectedFacets();
        if (!scope.isSelected()) {
          selectedFacets.push(scope.facetString());
        } else {
          selectedFacets.splice(selectedFacets.indexOf(scope.facetString()), 1);
        }
        $location.search('selectedFacets', selectedFacets);
        $location.search('page', 1);
        solrSearch.search();
      };


      /**
       * @private
       * @description Initializes the values within the controller
       */
      function init() {
        scope.isSelected();
      }

      init();

      $rootScope.$on('newSearch', function() {
        init();
      });
    }
  }
})();
