'use strict';

/**
 * @ngdoc directive
 *
 * @name solrResultsPagination
 *
 * @description
 * Pagination widget in sort bar on results page
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

      scope.currentPage = $location.search().page || 1;

      $rootScope.$on('newSearch', function() {
        scope.currentPage = $location.search().page || 1;
      });

      scope.nextPage = function() {
        if (scope.currentPage < scope.totalPages) {
          scope.currentPage++;
          $location.search('page', scope.currentPage);
          solrSearch.search();
        }
      };

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
