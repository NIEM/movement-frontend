'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name searchHeader
 * @description Header used on results and details pages
 * @example
 *  Usage:
 *  <search-header></search-header>
 */
(function() {

  angular
    .module('dhsniem')
    .directive('searchHeader', searchHeader);

  function searchHeader() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/searchHeader/searchHeader.directive.html'
    };
  }
})();
