'use strict';

/**
 * @ngdoc directive
 *
 * @name niemHeader
 *
 * @description
 * Main header throughout app
 */
(function () {

  angular
    .module('dhsniem')
    .directive('niemHeader', niemHeader);

  function niemHeader() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemHeader/niemHeader.directive.html'
    };
  }
})();
