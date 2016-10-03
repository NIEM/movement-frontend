'use strict';

/**
 * @ngdoc directive
 *
 * @name solrFacet
 *
 * @description
 * A Solr facet
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrFacet', solrFacet);

  function solrFacet() {
    return {
      restrict: 'E',
      scope: {
        display: '@',
        field: '@',
        results:'&',
      },
      templateUrl: 'app/components/solrFacet/solrFacet.directive.html',
      require: '^solr',
      link: link
    };

    /**
     *  Defines variables and functions within solrFacet scope
     */
    function link(scope, element, attrs, ctrl) {
      
      ctrl.registerFacet(scope);

    }

  }

})();