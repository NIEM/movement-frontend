'use strict';

/**
 * @ngdoc directive
 *
 * @name detailsPagination
 *
 * @description
 * Pagination widget in sort bar on results page
 */
(function() {

  angular
    .module('dhsniem')
    .directive('detailsPagination', detailsPagination);

  function detailsPagination(solrSearch, $location) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/detailsPagination/detailsPagination.directive.html',
      scope: {
        data: '=',
        numPerPage: '=',
        showAction: '=',
        currentPage: '='
      },
      link: link
    };

    /**
     *  Defines variables and functions within detailsPagination scope
     */
    function link(scope) {
      var init = function() {
        scope.numItems = 0;

        for (var i = 0; i < scope.data.length; i++) {
          scope.numItems += scope.data[i].data.facetValue.length;
        }

        scope.totalPages = Math.ceil(scope.numItems / scope.numPerPage);
        scope.showAction(getPageInfo());
      };

      var getPageInfo = function() {
        return {
          currentPageNum: scope.currentPage,
          maxPageNum: scope.totalPages,
          numItems: scope.numItems,
          numPerPage: scope.numPerPage
        };

      };

      scope.nextPage = function() {
        if (scope.currentPage < scope.totalPages) {
          scope.currentPage += 1;
          scope.showAction(getPageInfo());
        }
      };

      scope.prevPage = function() {
        if (scope.currentPage > 1) {
          scope.currentPage -= 1;
          scope.showAction(getPageInfo());
        }
      };

      init();

    }

  }

})();
