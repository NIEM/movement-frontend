'use strict';

/**
 * @ngdoc directive
 *
 * @name solrFacetSelected
 *
 * @description
 * The specific facet result returned from Solr
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrFacetSelected', solrFacetSelected);

  function solrFacetSelected() {
    return {
      restrict: 'E',
      scope: {},
      controller: function($scope) {
        $scope.selected = {
          field: 'mods_type_of_resource',
          value: 'notated music'
        };
      },
      transclude: true,
      templateUrl: 'app/components/solrFacetSelected/solrFacetSelected.directive.html',
      require: '^solr',
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link(scope, element, attrs, ctrl) {

      scope.selected = function(){
        return ctrl.selectedFacetsObj;
      };

    }

  }

})();