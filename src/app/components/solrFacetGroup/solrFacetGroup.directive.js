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
      controller: SolrFacetGroupCtrl,
      controllerAs: 'SolrFacetGroupCtrl',
      transclude: true,
      templateUrl: 'app/components/solrFacetGroup/solrFacetGroup.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solrFacetGroup scope
     */
    function link(scope, element, attrs, ctrl) { }

  }

  function SolrFacetGroupCtrl($rootScope, solrSearch) {

    $rootScope.$on('newSearch', function() {
      for (var key in solrSearch.getFacets()){
        solrSearch.setFacetResult(key, solrSearch.getFacetFields()[key]);
      }
    });

  }

})();