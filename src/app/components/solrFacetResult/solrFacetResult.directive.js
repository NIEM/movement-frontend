'use strict';

/**
 * @ngdoc directive
 *
 * @name solrFacetResult
 *
 * @description
 * The specific facet result returned from Solr
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
    function link(scope, element, attrs) {

      /**
       * @name facetString
       *
       * @description Gets string value of result
       *
       * @returns {string}
       */
      scope.facetString = function() {
        return scope.field + ':"' + scope.key + '"';
      };


      /**
       * @name isSelected
       *
       * @description Determines if a given facet field (value) is selected by examining the $location.
       *
       * @returns {boolean}
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
       * @name addRemoveFacet
       *
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
       * @name init
       *
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
