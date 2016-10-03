'use strict';

/**
 * @ngdoc directive
 *
 * @name ccpHeader
 *
 * @description
 * Main header throughout app
 */
(function() {

  angular
    .module('dhsniem')
    .directive('ccpHeader', ccpHeader);

  function ccpHeader() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/ccpHeader/ccpHeader.directive.html',
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
