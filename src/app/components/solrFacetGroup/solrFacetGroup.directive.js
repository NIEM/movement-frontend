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
      controller: 'ResultsCtrl',
      controllerAs: 'ResultsCtrl',
      transclude: true,
      templateUrl: 'app/components/solrFacetGroup/solrFacetGroup.directive.html',
      require: '^solr',
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link(scope, element, attrs, ctrl) {

      var solrCtrl=ctrls[0];
      var facetGroupCtrl= ctrls[1];

      solrCtrl.setFacetGroup(scope);
      scope.$watch(
        function(){ return solrCtrl.facet_fields;},
        function ( newVal, oldVal){
          if ( newVal !== oldVal ) {
            for (var k in facetGroupCtrl.getFacets()){
              facetGroupCtrl.setFacetResult(k, solrCtrl.facet_fields[k]);
            }
          }
        }
      );


      
    }

  }

})();