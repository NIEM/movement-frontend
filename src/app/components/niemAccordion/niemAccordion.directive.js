'use strict';

/**
 * @ngdoc directive
 *
 * @name NiemAccordion
 *
 * @description
 * Accordion section for NIEM model
 */
(function() {

  angular
    .module('dhsniem')
    .directive('niemAccordion', niemAccordion);

  function niemAccordion() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemAccordion/niemAccordion.directive.html',
      scope: {},
      link: link
    };

  }

  /**
   *  Defines variables and functions within niemAccordion scope
   *
   */
  function link(scope) {
    scope.isOpen = false;


  }

})();
