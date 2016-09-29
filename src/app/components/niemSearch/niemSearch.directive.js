'use strict';

/**
 * @ngdoc directive
 *
 * @name NiemSearch
 *
 * @description
 * Search input for NIEM model
 */
(function() {

  angular
    .module('dhsniem')
    .directive('niemSearch', niemSearch);

  function niemSearch($location) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemSearch/niemSearch.directive.html',
      scope: {},
      require: '^solr',
      link: link
    };

    /**
     *  Defines variables and functions within niemSearch scope
     */
    function link(scope, element, attrs, ctrl) {


      /**
       * @name search
       *
       * @memberof dhsniem.directive:NiemSearch
       *
       * @description
       * Sets the query param and $location and then calls the ResultsCtrl search function.
       *
       * @param query
       */
      scope.search = function search(query) {
        query = query || '*';
        $location.search('q', query);
        ctrl.search();
      };

      if ( attrs.preload ) {
        scope.search(attrs.query);
      }
    }

  }

})();
