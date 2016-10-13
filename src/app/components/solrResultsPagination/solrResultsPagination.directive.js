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

  function solrResultsPagination() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrResultsPagination/solrResultsPagination.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solrResultsPagination scope
     */
    function link(scope) {

    }

  }

})();
