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
     *  Defines variables and functions within solr scope
     */
    function link(scope, element, attrs, ctrl) {
      
      ctrl.registerFacet(scope);
      console.log('****registered***');

      // var es5getprops = Object.getOwnPropertyNames;
      // scope.isEmpty = function() {
      //   return (es5getprops(scope.results).length === 0);
      // };

    }

  }

})();