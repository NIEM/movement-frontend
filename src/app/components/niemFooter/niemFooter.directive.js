'use strict';

/**
 * @ngdoc directive
 *
 * @name niemFooter
 *
 * @description
 * Main footer throughout app
 */
(function() {

  angular
    .module('dhsniem')
    .directive('niemFooter', niemFooter);

  function niemFooter() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemFooter/niemFooter.directive.html'
    };
  }
})();
