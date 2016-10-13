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

  function solrFacetResult($location, solrSearch) {
    return {
      restrict: 'E',
      scope: {
        field:'@',
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

      scope.facetString = function(){
        return scope.field + ':"' + scope.key + '"';
      };

      scope.isSelected = function(){
        var selectedFacets = solrSearch.getSelectedFacets();
        var facetString = scope.facetString();
        for (var i in selectedFacets){
          if (selectedFacets[i] === facetString) {
            return true;
          }
        }
        return false;
      };

      scope.addRemoveFacet = function() {
        var selectedFacets = solrSearch.getSelectedFacets();
        if(!scope.isSelected()) {
          selectedFacets.push(scope.facetString());
        } else {
          selectedFacets.splice(selectedFacets.indexOf(scope.facetString()), 1);
        }
        $location.search('selectedFacets', selectedFacets);
        solrSearch.search();
      };

    }

  }

})();
