'use strict';

/**
 * @ngdoc directive
 *
 * @name solrSort
 *
 * @description
 * Sort bar on results page
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrSort', solrSort);

  function solrSort(solrSearch, $location) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrSort/solrSort.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solrSort scope
     */
    function link(scope) {
      scope.sortOption = $location.search().sortBy || 'namespace asc';

      scope.sortBy = function() {
        $location.search('sortBy', scope.sortOption);
        solrSearch.search();
      };

    }

  }

})();
