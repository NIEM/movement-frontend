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

      scope.search = function(query) {
        // row = rows || '10';
        query = query || '*';
        $location.search('q', query);
        // $location.search('rows', rows);
        ctrl.search(query);
      };

      // scope.roptions = ['3', '10', '20', '30'];
      // scope.rows = '10';

      scope.preload = attrs.preload;
      scope.query = attrs.query;

      if (scope.preload) {
        scope.search(scope.query);
      }
    }

  }

})();
