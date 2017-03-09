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
      templateUrl: 'app/components/niemFooter/niemFooter.directive.html',
      scope: {
        isAbsolutePositioning: '='
      },
      link: link
    };


  /**
   *  Defines variables and functions within footer scope
   *
   */
  function link() {}

  }
})();
