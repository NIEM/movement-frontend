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

  function solrFacetResult($location) {
    return {
      restrict: 'E',
      scope: {
        field:'@',
        key: '@',
        count: '@',
        remove:'@',
      },
      templateUrl: 'app/components/solrFacetResult/solrFacetResult.directive.html',
      require: '^solr',
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link(scope, element, attrs, ctrl) {

      scope.facetString = function(){ 
        return scope.field+':"'+scope.key+'"';
      };

      scope.isSelected = function(){
        var selectedFacets = ctrl.selected_facets;
        var facetString = scope.facetString();
        for (var i in selectedFacets){
          if (selectedFacets[i]==facetString) return true;
        }
        return false;
      };

      scope.addFacet = function (){ 
        if (!scope.isSelected()){
          var selectedFacets = ctrl.selected_facets;
          selectedFacets.push(scope.facetString());
          $location.search('selected_facets', selectedFacets);
          ctrl.search();
        }
      };

      scope.removeFacet = function (){ 
        var selectedFacets = ctrl.selected_facets;
        selectedFacets.pop(scope.facetString());
        $location.search('selected_facets', selectedFacets);
        ctrl.search();
      };

    }

  }

})();