'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name solrSort
 * @param {service} $location The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application
 * @param {service} solrSearch A service that handles custom querying for the Solr API
 * @description Sort bar on results page
 * @example
 *  Usage:
 *  <solr-sort></solr-sort>
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
      /**
       * @memberof solrSort
       * @property sortOption
       * @type {String}
       * @description The current sort option
       */
      scope.sortOption = solrSearch.getSort();

      /**
       * @memberof solrSort
       * @property sortCriteria
       * @type {Object}
       * @description The mapping of sort values to display names
       */
      scope.sortCriteria = {
        'namespacePriority asc': 'Domain',
        'name asc': 'Alphabetical',
        'score desc': 'Relevance'
      };

      /**
       * @memberof solrSort
       * @property selected
       * @type {String}
       * @description The selected sort option display
       */
      scope.selected = scope.sortCriteria[scope.sortOption];
      

      /**
       * @memberof solrSort
       * @param {String} key The field to sort by
       * @param {String} value The value to sort by
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
