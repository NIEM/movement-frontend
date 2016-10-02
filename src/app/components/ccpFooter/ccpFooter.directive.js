'use strict';

/**
 * @ngdoc directive
 *
 * @name ccp
 *
 * @description
 * Main footer throughout app
 */
(function() {

  angular
    .module('dhsniem')
    .directive('ccpFooter', ccpFooter);

  function ccpFooter() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/ccpFooter/ccpFooter.directive.html',
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
