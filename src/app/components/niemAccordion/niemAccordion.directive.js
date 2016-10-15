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

  function niemAccordion($compile) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemAccordion/niemAccordion.directive.html',
      scope: {
        data: '=',
        title: '=',
        clickHandler: '=',
        getContainingTypes: '='
      },
      link: function(scope, element) {
        scope.isOpen = false;
        scope.dataFound = false;

        scope.toggleAccordion = function() {
          scope.isOpen = !scope.isOpen;

          if (scope.isOpen && scope.dataFound === false) {
            scope.dataFound = true;
            scope.clickHandler(scope.data);
          }

        };
      }
    };

  }

  /**
   *  Defines variables and functions within niemAccordion scope
   *
   */
  /*function link(scope, element) {
    scope.isOpen = false;

    scope.toggleAccordion = function() {
      scope.isOpen = !scope.isOpen;

      //if (scope.isOpen) {

      //  console.log(scope.data);
      scope.clickHandler(scope.data);

      //element.append('<div ng-include="app/components/niemAccordion/niemAccordionList.html"></div>');

      element.append('<div ng-include="' + 'app/components/niemAccordion/niemAccordionList.html' + '"></div>');
      $compile(element.contents())(scope);
      console.log(scope.data);
      //}

    };
  }*/

})();
