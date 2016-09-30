'use strict';

/**
 * @ngdoc directive
 *
 * @name solrFacetGroup
 *
 * @description
 * A facet group for solr results facets
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrFacetGroup', solrFacetGroup);

  function solrFacetGroup() {
    return {
      restrict: 'E',
      scope: {},
      transclude: true,
      templateUrl: 'app/components/solrFacetGroup/solrFacetGroup.directive.html',
      require: '^solr',
      link: link
    };

    /**
     *  Defines variables and functions within solrFacetGroup scope
     */
    function link(scope, element, attrs, ctrl) {

      ctrl.setFacetGroup(scope);

      scope.$watch(
        function(){ return ctrl.facetFields;},
        function (newVal, oldVal){
          if ( newVal !== oldVal ) {
            for (var k in ctrl.getFacets()){
              ctrl.setFacetResult(k, ctrl.facetFields[k]);
            }
          }
        }
      );

    }

  }

})();