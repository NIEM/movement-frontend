'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name niemExport
 * @description Export section for NIEM model
 * @example
 *  Usage:
 *  <niem-export></niem-export>
 */
(function () {

  angular
    .module('dhsniem')
    .directive('niemExport', niemExport);

  function niemExport() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemExport/niemExport.directive.html'
    };

  }

})();
