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

  function niemHeader($rootScope, $location, $anchorScroll, $window) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemHeader/niemHeader.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within niemHeader scope
     */
    function link() {

      /**
       * @name skipToContent
       *
       * @param anchor - String representing the section to navigate to on a page
       *
       * @description Allows a user to skip to the main section of the page
       */
      $rootScope.skipToContent = function skipToContent(anchor) {
        $location.hash(anchor);
        $anchorScroll();
        var el = $window.document.getElementById(anchor);
        if (el) {
          el.focus();
        }
      };
    }
  }
})();
