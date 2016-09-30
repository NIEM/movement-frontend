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
     *  Defines variables and functions within solr scope
     */
    function link(scope, element, attrs, ctrl) {

      ctrl.setFacetGroup(scope);
      console.log('DIRECTIVE', scope);

      scope.$watch(
        function(){ return ctrl.facet_fields;},
        function ( newVal, oldVal){
          if ( newVal !== oldVal ) {
            for (var k in ctrl.getFacets()){
              ctrl.setFacetResult(k, ctrl.facet_fields[k]);
            }
          }
        }
      );


    }

  }

})();