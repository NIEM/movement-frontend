'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name niemHeader
 * @param {service} $location The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application
 * @param {service} $window A reference to the browser's window object
 * @param {service} $anchorScroll When called, it scrolls to the element related to the specified hash or (if omitted) to the current value of $location.hash(), according to the rules specified in the HTML5 spec
 * @description Main header throughout app
  * @example
 *  Usage:
 *  <niem-header></niem-header>
 */
(function () {

  angular
    .module('dhsniem')
    .directive('niemHeader', niemHeader);

  function niemHeader($location, $anchorScroll, $window) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemHeader/niemHeader.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within niemHeader scope
     */
    function link(scope) {

      /**
       * @memberof niemHeader
       * @param {String} anchor String representing the section to navigate to on a page
       * @description Allows a user to skip to the main section of the page
       */
      scope.skipToContent = function skipToContent(anchor) {
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
