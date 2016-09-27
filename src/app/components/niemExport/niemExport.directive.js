'use strict';

/**
 * @ngdoc directive
 *
 * @name NiemExport
 *
 * @description
 * Export section for NIEM model
 */
(function() {

  angular
    .module('dhsniem')
    .directive('niemExport', niemExport);

  function niemExport() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemExport/niemExport.directive.html',
      scope: {},
      link: link
    };

  }

  /**
   *  Defines variables and functions within niemExport scope
   *
   */
  function link(scope) {

  }

})();
