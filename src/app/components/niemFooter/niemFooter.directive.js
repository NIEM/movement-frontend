'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name niemFooter
 * @description Main footer throughout app
 * @example
 *  Usage:
 *  <niem-footer></niem-footer>
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
