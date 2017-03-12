'use strict';

/**
 * @ngdoc directive
 *
 * @name solrSort
 *
 * @description
 * Sort bar on results page
 */
(function () {

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
      scope.sortOption = solrSearch.getSort();
      scope.sortCriteria = {
        'namespacePriority asc': 'Domain',
        'name asc': 'Alphabetical',
        'score desc': 'Relevance'
      };
      scope.selected = scope.sortCriteria[scope.sortOption];
      

      /**
       * @name sortBy
       *
       * @description Sets the sortBy parameter on the $location service and calls a new solr search.
       */
      scope.sortBy = function (key, value) {
        scope.selected = value;
        $location.search('sortBy', key);
        solrSearch.search();
      };
    }
  }
})();
