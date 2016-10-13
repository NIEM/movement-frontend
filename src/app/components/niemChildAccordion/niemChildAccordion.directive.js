'use strict';

/**
 * @ngdoc directive
 *
 * @name NiemChildAccordion
 *
 * @description
 * ChildAccordion section for NIEM model
 */
(function() {

  angular
    .module('dhsniem')
    .directive('niemChildAccordion', niemChildAccordion);

  function niemChildAccordion() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemChildAccordion/niemChildAccordion.directive.html',
      scope: {},
      link: link
    };

  }

  /**
   *  Defines variables and functions within niemChildAccordion scope
   *
   */
  function link(scope) {

  }

})();
