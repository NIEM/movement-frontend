'use strict';

/**
 * @ngdoc directive
 *
 * @name searchHeader
 *
 * @description
 * Header used on results and details pages
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
