'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name solrResultsPagination
 * @param {service} $location The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application
 * @param {service} $rootScope The root scope of the application
 * @param {service} solrSearch A service that handles custom querying for the Solr API
 * @description Pagination widget in sort bar on results page
 * @example
 *  Usage:
 *  <solr-results-pagination></solr-results-pagination>
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrResultsPagination', solrResultsPagination);

  function solrResultsPagination(solrSearch, $location, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrResultsPagination/solrResultsPagination.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solrResultsPagination scope
     */
    function link(scope) {

      /**
       * @memberof solrResultsPagination
       * @property currentPage
       * @type {Number}
       * @description The current page
       */      
      scope.currentPage = $location.search().page || 1;

      $rootScope.$on('newSearch', function() {
        scope.currentPage = $location.search().page || 1;
      });

      /**
       * @memberof solrResultsPagination
       * @description Loads the next page of results if there is one
       */
      scope.nextPage = function() {
        if (scope.currentPage < scope.totalPages) {
          scope.currentPage++;
          $location.search('page', scope.currentPage);
          solrSearch.search();
        }
      };

      /**
       * @memberof solrResultsPagination
       * @description Loads the previous page of results if there is one
       */
      scope.prevPage = function() {
        if (scope.currentPage > 1) {
          scope.currentPage--;
          $location.search('page', scope.currentPage);
          solrSearch.search();
        }
      };
    }
  }
})();
